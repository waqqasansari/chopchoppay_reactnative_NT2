/**
 * Landing Features Component
 * Displays the key features of the app in a grid layout
 */

import { LandingContent } from '@/constants/landing';
import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface LandingFeaturesProps {
    fadeAnim: Animated.Value;
}

interface FeatureCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    index: number;
    fadeAnim: Animated.Value;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index, fadeAnim }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const translateY = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    return (
        <Animated.View
            style={[
                styles.featureCard,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: fadeAnim,
                    transform: [{ translateY }],
                },
                Shadows.md,
            ]}
        >
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight + '20' }]}>
                <Ionicons name={icon} size={32} color={colors.primary} />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                {description}
            </Text>
        </Animated.View>
    );
};

export const LandingFeatures: React.FC<LandingFeaturesProps> = ({ fadeAnim }) => {
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {LandingContent.features.map((feature, index) => (
                    <FeatureCard
                        key={feature.id}
                        icon={feature.icon as keyof typeof Ionicons.glyphMap}
                        title={feature.title}
                        description={feature.description}
                        index={index}
                        fadeAnim={fadeAnim}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    featureCard: {
        width: '48%',
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        alignItems: 'center',
        minHeight: 200,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    featureTitle: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semibold,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    featureDescription: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.normal,
        textAlign: 'center',
        lineHeight: 20,
    },
});
