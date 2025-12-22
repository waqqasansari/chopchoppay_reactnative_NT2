import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface HomeHeaderProps {
    scrollY: SharedValue<number>;
}

export const HomeHeader = ({ scrollY }: HomeHeaderProps) => {

    const initialStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 80], [1, 0], Extrapolation.CLAMP);
        const translateY = interpolate(scrollY.value, [0, 80], [0, -10], Extrapolation.CLAMP);

        return {
            opacity,
            transform: [{ translateY }],
            pointerEvents: opacity < 0.1 ? 'none' : 'auto',
        };
    });

    const scrolledStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [60, 100], [0, 1], Extrapolation.CLAMP);
        const translateY = interpolate(scrollY.value, [60, 100], [10, 0], Extrapolation.CLAMP);

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {/* Initial State */}
                <Animated.View style={[styles.headerState, initialStyle]}>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.name}>Alex Johnson</Text>
                </Animated.View>

                {/* Scrolled State */}
                <Animated.View style={[styles.headerState, styles.absoluteHeader, scrolledStyle]}>
                    <Text style={[styles.greeting, { fontSize: 12 }]}>Total Balance</Text>
                    <Text style={[styles.name, { fontSize: 18 }]}>$31,857.06</Text>
                </Animated.View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="search" size={24} color="#1f2937" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.avatarButton}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>AJ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20, // Match typical screen padding
        paddingVertical: 12,
        backgroundColor: '#f9fafb', // Match screen background
        zIndex: 10,
    },
    textContainer: {
        flex: 1,
        height: 50, // Fixed height to accommodate transitions
        justifyContent: 'center',
    },
    headerState: {
        justifyContent: 'center',
    },
    absoluteHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 2,
        fontWeight: '500',
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1f2937',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    avatarButton: {
        marginLeft: 4,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#8b5cf6', // Violet
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
