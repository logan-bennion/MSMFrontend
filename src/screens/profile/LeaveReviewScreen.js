// src/screens/profile/LeaveReviewScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RatingStars = ({ rating, setRating }) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          style={styles.starButton}
        >
          <Ionicons
            name={rating >= star ? 'star' : 'star-outline'}
            size={32}
            color={rating >= star ? '#FFD700' : '#C7C7CC'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const LeaveReviewScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRatingText = () => {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return 'Tap to rate';
    }
  };

  const handleAddPhotos = () => {
    // Implement photo picker logic
    Alert.alert('Add Photos', 'Photo upload functionality will be implemented');
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please add a rating');
      return;
    }

    if (!review.trim()) {
      Alert.alert('Error', 'Please write a review');
      return;
    }

    setIsSubmitting(true);
    try {
      // Implement your review submission logic here
      // await submitReview({ orderId: order.id, rating, review, images });
      
      Alert.alert(
        'Success',
        'Thank you for your review!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProductInfo = () => (
    <View style={styles.productContainer}>
      <View style={styles.productImage}>
        <Ionicons name="cube-outline" size={30} color="#666" />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{order.items[0].name}</Text>
        <Text style={styles.orderInfo}>Order #{order.id}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView}>
          {/* Product Information */}
          {renderProductInfo()}

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Rate this product</Text>
            <RatingStars rating={rating} setRating={setRating} />
            <Text style={styles.ratingText}>{getRatingText()}</Text>
          </View>

          {/* Review Section */}
          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>Write your review</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Share your experience with this product..."
              multiline
              textAlignVertical="top"
              numberOfLines={6}
              value={review}
              onChangeText={setReview}
            />
          </View>

          {/* Photo Upload Section */}
          <View style={styles.photoSection}>
            <Text style={styles.sectionTitle}>Add Photos (Optional)</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.photoScrollView}
            >
              <TouchableOpacity 
                style={styles.addPhotoButton}
                onPress={handleAddPhotos}
              >
                <Ionicons name="camera-outline" size={24} color="#007AFF" />
                <Text style={styles.addPhotoText}>Add Photos</Text>
              </TouchableOpacity>
              {images.map((image, index) => (
                <View key={index} style={styles.photoPreview}>
                  <Image source={{ uri: image }} style={styles.photoThumbnail} />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => {
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      setImages(newImages);
                    }}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (isSubmitting || rating === 0) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmitReview}
            disabled={isSubmitting || rating === 0}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderInfo: {
    fontSize: 14,
    color: '#666',
  },
  ratingSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  starButton: {
    padding: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  reviewSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  reviewInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    height: 120,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  photoSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  photoScrollView: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addPhotoText: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 5,
  },
  photoPreview: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  photoThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    margin: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#A8A8A8',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LeaveReviewScreen;