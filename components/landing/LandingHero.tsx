/**
 * Landing Hero Component
 * The hero section of the landing page with logo, title, and AI badge
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

interface LandingHeroProps {
    floatAnim: Animated.Value;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ floatAnim }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const isDark = colorScheme === 'dark';

    return (
        <View style={styles.container}>
            {/* Logo with float animation */}
            <Animated.View style={[styles.logoContainer, { transform: [{ translateY: floatAnim }] }]}>
                {/* Violet-to-Cool-Blue Radial Glow */}
                <View style={styles.logoGlowContainer}>
                    <Svg height="100%" width="100%" viewBox="0 0 100 100">
                        <Defs>
                            <RadialGradient
                                id="logoGlowGrad"
                                cx="50%"
                                cy="50%"
                                rx="50%"
                                ry="50%"
                                fx="50%"
                                fy="50%"
                                gradientUnits="userSpaceOnUse"
                            >
                                <Stop offset="0%" stopColor="#7f13ec" stopOpacity="0.4" />
                                <Stop offset="60%" stopColor="#60a5fa" stopOpacity="0.2" />
                                <Stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                            </RadialGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100" height="100" fill="url(#logoGlowGrad)" />
                    </Svg>
                </View>

                <Image
                    source={require('@/assets/ccp_app/logo1-topaz-lighting-upscale-4x.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Colorful Title */}
            <Text style={styles.title}>
                <Text style={styles.titleChop}>Chop</Text>
                <Text style={styles.titleChop2}>Chop</Text>
                <Text style={styles.titlePay}>Pay!</Text>
            </Text>

            {/* Tagline */}
            <View style={styles.taglineContainer}>
                <Text style={styles.tagline}>
                    Split bills,
                </Text>
                <Text style={styles.taglineHighlight}>
                    not friendships.
                </Text>
            </View>

            {/* AI Badge */}
            <View style={styles.aiBadgeContainer}>
                {/* Smoky, blurred layer - Simulating conic-gradient with LinearGradient */}
                <LinearGradient
                    colors={[
                        'rgba(239, 68, 68, 0.7)',   // Red
                        'rgba(245, 158, 11, 0.7)',  // Orange
                        'rgba(52, 211, 153, 0.7)',  // Green
                        'rgba(96, 165, 250, 0.7)',  // Blue
                        'rgba(124, 58, 237, 0.7)',  // Purple
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.aiBadgeGlow}
                />

                <View style={styles.aiBadge}>
                    <Text style={styles.aiBadgeIcon}>🧠</Text>
                    <Text style={styles.aiBadgeText}>
                        AI-Powered Expense Splitting
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoGlowContainer: {
        position: 'absolute',
        width: 340,
        height: 340,
        top: -50, // Center relative to logo (240h): (340 - 240)/2 = 50 -> -50
        left: -50, // Center relative to logo (240w)
        zIndex: 0,
        transform: [{ scale: 1.2 }],
    },
    logo: {
        width: 240,
        height: 240,
        zIndex: 10,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: -1,
        marginBottom: 12, // mb-3
        textAlign: 'center',
        lineHeight: 46,
    },
    titleChop: {
        color: '#8B5CF6',
    },
    titleChop2: {
        color: '#2563EB',
    },
    titlePay: {
        color: '#F97316',
    },
    taglineContainer: {
        alignItems: 'center',
        marginBottom: 24, // mb-6
    },
    tagline: {
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 36, // leading-[1.1] approx
        letterSpacing: -0.5,
        color: '#111827', // text-gray-900
        textAlign: 'center',
    },
    taglineHighlight: {
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 36,
        letterSpacing: -0.5,
        color: '#7f13ec', // text-primary
        textAlign: 'center',
    },
    aiBadgeContainer: {
        marginTop: 16, // mt-8
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    aiBadgeGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 9999,
        opacity: 0.8,
        // Approximate blur-2xl
    },
    aiBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 16, // px-4
        paddingVertical: 8, // py-2
        borderRadius: 9999, // rounded-full
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // shadow-lg approx
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 10,
    },
    aiBadgeIcon: {
        fontSize: 20,
        marginRight: 8,
        color: '#7f13ec', // text-purple-600
    },
    aiBadgeText: {
        fontSize: 14,
        fontWeight: '500', // font-medium
        color: '#1f2937', // text-gray-800
    },
});
