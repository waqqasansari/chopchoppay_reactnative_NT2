import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface FeatureCardProps {
    title: string;
    description: string;
    iconName: keyof typeof Ionicons.glyphMap;
    badgeIconName?: keyof typeof Ionicons.glyphMap;
    accentColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, iconName, badgeIconName = 'star', accentColor }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={styles.container}>
            <View style={[
                styles.card,
                {
                    backgroundColor: isDark ? '#2d1f3d' : '#ffffff',
                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)'
                }
            ]}>
                {/* Image Area */}
                <View style={styles.imageArea}>
                    <LinearGradient
                        colors={[isDark ? 'rgba(127, 19, 236, 0.1)' : 'rgba(127, 19, 236, 0.05)', 'transparent']}
                        style={styles.gradientOverlay}
                    />

                    {/* Illustration Placeholder */}
                    <View style={[
                        styles.iconContainer,
                        {
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                            transform: [{ rotate: '-3deg' }]
                        }
                    ]}>
                        <Ionicons name={iconName} size={84} color={accentColor} />

                        <View style={[
                            styles.floatingBadge,
                            {
                                backgroundColor:
                                    badgeIconName === 'camera' ? '#7f13ec' :
                                        badgeIconName === 'swap-horizontal' ? '#2CDDC7' :
                                            badgeIconName === 'analytics' ? '#FF6B6B' :
                                                badgeIconName === 'people' ? '#F59E0B' :
                                                    badgeIconName === 'wallet' ? '#4ade80' :
                                                        accentColor
                            }
                        ]}>
                            <Ionicons name={badgeIconName} size={24} color="white" />
                        </View>
                    </View>
                </View>

                {/* Content Area */}
                <View style={[styles.contentArea, { backgroundColor: isDark ? '#2d1f3d' : '#ffffff' }]}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.description, { color: isDark ? '#a89bb5' : '#756189' }]}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    card: {
        width: '100%',
        aspectRatio: 0.8, // 4/5
        borderRadius: 24, // rounded-3xl
        overflow: 'hidden',
        borderWidth: 1,
        // shadow-soft
        shadowColor: '#7f13ec',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 40,
        elevation: 10,
    },
    imageArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    // Illustration Placeholder
    iconContainer: {
        width: 192, // w-48
        height: 192,
        borderRadius: 16, // rounded-2xl when square or rounded-full
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
        position: 'relative',
    },
    floatingBadge: {
        position: 'absolute',
        bottom: -16,
        right: -16,
        width: 48,
        height: 48,
        borderRadius: 12, // rounded-xl
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        transform: [{ rotate: '12deg' }],
    },
    contentArea: {
        width: '100%',
        paddingHorizontal: 32,
        paddingBottom: 40,
        paddingTop: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
});
