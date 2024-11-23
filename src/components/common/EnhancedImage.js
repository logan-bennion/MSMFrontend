// src/components/common/EnhancedImage.js
import React, { useState, useRef } from 'react';
import {
  Image,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import Shimmer from './Shimmer';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const EnhancedImage = ({ 
  source, 
  style, 
  fallbackIcon = "image-outline",
  enableZoom = true,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cachedSource, setCachedSource] = useState(null);

  // Zoom and pan states
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Cache image
  React.useEffect(() => {
    const cacheImage = async () => {
      if (typeof source === 'string' && source.startsWith('http')) {
        try {
          const filename = source.split('/').pop();
          const cacheFolder = `${FileSystem.cacheDirectory}images/`;
          const cacheFilePath = `${cacheFolder}${filename}`;

          // Create cache directory if it doesn't exist
          await FileSystem.makeDirectoryAsync(cacheFolder, { intermediates: true }).catch(() => {});

          // Check if file exists in cache
          const fileInfo = await FileSystem.getInfoAsync(cacheFilePath);
          if (fileInfo.exists) {
            setCachedSource({ uri: cacheFilePath });
            return;
          }

          // Download and cache the image
          await FileSystem.downloadAsync(source, cacheFilePath);
          setCachedSource({ uri: cacheFilePath });
        } catch (e) {
          console.warn('Image caching error:', e);
          setCachedSource({ uri: source });
        }
      }
    };

    cacheImage();
  }, [source]);

  // Pan responder for zoom functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (evt.nativeEvent.changedTouches.length === 2) {
          const touch1 = evt.nativeEvent.changedTouches[0];
          const touch2 = evt.nativeEvent.changedTouches[1];
          
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );

          const newScale = Math.max(1, Math.min(distance / 200, 3));
          scale.setValue(newScale);
        } else {
          translateX.setValue(gestureState.dx);
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: () => {
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  const imageSource = cachedSource || (typeof source === 'string' ? { uri: source } : source);

  if (error) {
    return (
      <View style={[style, styles.fallbackContainer]}>
        <Ionicons name={fallbackIcon} size={40} color="#666" />
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={enableZoom ? 0.8 : 1}
        onPress={() => enableZoom && setModalVisible(true)}
      >
        <View style={style}>
          {loading && <Shimmer width={style.width} height={style.height} style={style} />}
          <Image
            source={imageSource}
            style={[style, loading ? styles.hiddenImage : null]}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          
          <Animated.View
            style={[
              styles.modalImageContainer,
              {
                transform: [
                  { scale },
                  { translateX },
                  { translateY },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Image
              source={imageSource}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  hiddenImage: {
    position: 'absolute',
    opacity: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});

export default EnhancedImage;