/**
 * App Index Route
 * Landing page that shows when users first open the app
 */

import { LandingPage } from '@/components/landing';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
    const router = useRouter();

    const handleGetStarted = () => {
        // Navigate to the authentication screen
        router.push('/login');
    };

    const handleLearnMore = () => {
        // You can navigate to an about page or show more info
        console.log('Learn more about ChopChopPay');
    };

    return (
        <View style={styles.container}>
            <LandingPage onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
