/**
 * Landing Page Component
 * Main landing page that users see when they first open the app
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { LandingCTA } from './LandingCTA';
import { LandingHero } from './LandingHero';

interface LandingPageProps {
    onGetStarted: () => void;
    onLearnMore?: () => void;
}

const { width, height } = Dimensions.get('window');

const Blob = ({ color, style, id }: { color: string; style: any; id: string }) => {
    return (
        <Animated.View style={style}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Defs>
                    <RadialGradient
                        id={`grad-${id}`}
                        cx="50%"
                        cy="50%"
                        rx="50%"
                        ry="50%"
                        fx="50%"
                        fy="50%"
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop offset="0%" stopColor={color} stopOpacity="1" />
                        <Stop offset="100%" stopColor={color} stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100" height="100" fill={`url(#grad-${id})`} />
            </Svg>
        </Animated.View>
    );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const isDark = colorScheme === 'dark';

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Float animation for logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -15,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* Background Gradients using SVG for diffusion */}
            <Blob
                id="top"
                color="rgba(127, 19, 236, 0.4)" // Slightly stronger center for fade out
                style={styles.gradientTop}
            />
            <Blob
                id="blue"
                color="rgba(96, 165, 250, 0.4)"
                style={styles.gradientBlue}
            />
            <Blob
                id="purple"
                color="rgba(168, 85, 247, 0.4)"
                style={styles.gradientPurple}
            />

            {/* Content Container */}
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <LandingHero floatAnim={floatAnim} />
                <LandingCTA onGetStarted={onGetStarted} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f7f6f8', // background-light
        overflow: 'hidden',
    },
    // Matches the .bg-subtle-glow top blob
    gradientTop: {
        position: 'absolute',
        top: '-15%',
        left: '-25%',
        width: '150%',
        height: '70%',
        transform: [{ scale: 1 }],
        opacity: 0.8,
    },
    // Matches top right blue blob
    gradientBlue: {
        position: 'absolute',
        top: '5%',
        right: '-15%',
        width: 288,
        height: 288,
        opacity: 0.8,
    },
    // Matches bottom left purple blob
    gradientPurple: {
        position: 'absolute',
        bottom: '20%',
        left: '-15%',
        width: 320,
        height: 320,
        opacity: 0.8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 32,
        zIndex: 10,
        justifyContent: 'space-between',
    },
});
