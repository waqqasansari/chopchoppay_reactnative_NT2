/**
 * Landing CTA Component
 * Call-to-action buttons for the landing page
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface LandingCTAProps {
    onGetStarted: () => void;
}

export const LandingCTA: React.FC<LandingCTAProps> = ({ onGetStarted }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const isDark = colorScheme === 'dark';

    return (
        <View style={styles.container}>
            {/* Get Started Button with Gradient */}
            <Pressable
                style={({ pressed }) => [
                    styles.primaryButton,
                    { opacity: pressed ? 0.95 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
                onPress={onGetStarted}
            >
                <LinearGradient
                    colors={['#7f13ec', '#a64aff']} // primary-gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                >
                    <Text style={styles.primaryButtonText}>Get Started</Text>
                    <Text style={styles.arrowIcon}>→</Text>
                </LinearGradient>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, { backgroundColor: '#e5e7eb' }]} />
                <View style={styles.dividerTextContainer}>
                    <Text style={styles.dividerText}>
                        OR CONTINUE WITH
                    </Text>
                </View>
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
                {/* Apple / Favorite */}
                <Pressable
                    style={({ pressed }) => [
                        styles.socialButton,
                        {
                            backgroundColor: '#FFFFFF',
                            borderColor: '#e5e7eb', // gray-200
                            opacity: pressed ? 0.8 : 1,
                            transform: [{ scale: pressed ? 0.95 : 1 }],
                        },
                    ]}
                >
                    <Text style={styles.socialIcon}>🍎</Text>
                </Pressable>

                {/* Google */}
                <Pressable
                    style={({ pressed }) => [
                        styles.socialButton,
                        {
                            backgroundColor: '#FFFFFF',
                            borderColor: '#e5e7eb',
                            opacity: pressed ? 0.8 : 1,
                            transform: [{ scale: pressed ? 0.95 : 1 }],
                        },
                    ]}
                >
                    <View style={styles.googleIcon} />
                </Pressable>

                {/* FaceID */}
                <Pressable
                    style={({ pressed }) => [
                        styles.socialButton,
                        {
                            backgroundColor: '#FFFFFF',
                            borderColor: '#e5e7eb',
                            opacity: pressed ? 0.8 : 1,
                            transform: [{ scale: pressed ? 0.95 : 1 }],
                        },
                    ]}
                >
                    <Text style={styles.socialIcon}>☺</Text>
                </Pressable>
            </View>

            {/* Terms and Privacy */}
            <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms</Text> &{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
        marginTop: 'auto',
    },
    primaryButton: {
        width: '100%',
        height: 56, // h-14
        borderRadius: 9999,
        overflow: 'hidden',
        shadowColor: '#7f13ec', // primary
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    gradientButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.01,
    },
    arrowIcon: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    dividerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    dividerLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerTextContainer: {
        backgroundColor: '#f7f6f8', // background-light
        paddingHorizontal: 12,
    },
    dividerText: {
        fontSize: 12, // text-xs
        fontWeight: '600', // font-semibold
        letterSpacing: 1.5, // tracking-widest
        color: '#9ca3af', // text-gray-400
        textTransform: 'uppercase',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        paddingBottom: 8,
    },
    socialButton: {
        width: 56, // w-14
        height: 56, // h-14
        borderRadius: 9999,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    socialIcon: {
        fontSize: 24,
    },
    googleIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4285F4', // Placeholder for Google Logo
    },
    termsText: {
        textAlign: 'center',
        fontSize: 12, // text-xs
        fontWeight: '500', // font-medium
        color: '#9ca3af', // text-gray-400
        marginTop: 8,
    },
    termsLink: {
        textDecorationLine: 'underline',
        color: '#9ca3af', // text-gray-400 (hover:text-primary not applicable on mobile default state)
    },
});
