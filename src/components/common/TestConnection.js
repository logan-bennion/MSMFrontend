// src/components/common/TestConnection.js
import React, { useState, useEffect } from 'react';
import { testBackendConnection } from '../../services/api';

const TestConnection = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await testBackendConnection();
                setMessage(response.message);
                setLoading(false);
            } catch (err) {
                setError(
                    `Connection failed: ${err.message}. Check if Django server is running and CORS is configured.`
                );
                setLoading(false);
            }
        };

        testConnection();
    }, []);

    if (loading) return <div>Testing connection...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    return <div style={{ color: 'green' }}>{message}</div>;
};

export default TestConnection;