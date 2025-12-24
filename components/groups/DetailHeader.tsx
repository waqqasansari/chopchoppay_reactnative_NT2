import { GroupData } from '@/constants/data';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DetailHeaderProps {
    scrollY: SharedValue<number>;
    group: GroupData;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ scrollY, group }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const titleStyle = useAnimatedStyle(() => {
        const translateY = interpolate(scrollY.value, [0, 60], [0, -5], Extrapolation.CLAMP);
        return {
            transform: [{ translateY }],
        };
    });

    const initialSubtitleStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 40], [1, 0], Extrapolation.CLAMP);
        const translateY = interpolate(scrollY.value, [0, 40], [0, -10], Extrapolation.CLAMP);
        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    const scrolledSubtitleStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [40, 80], [0, 1], Extrapolation.CLAMP);
        const translateY = interpolate(scrollY.value, [40, 80], [10, 0], Extrapolation.CLAMP);
        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        const borderOpacity = interpolate(scrollY.value, [0, 50], [0, 0.1], Extrapolation.CLAMP);
        return {
            borderBottomColor: `rgba(0,0,0,${borderOpacity})`,
            borderBottomWidth: 1,
        };
    });

    return (
        <Animated.View style={[styles.container, containerStyle, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.back()}
            >
                <MaterialIcons name="arrow-back" size={24} color="#1f2937" />
            </TouchableOpacity>

            <View style={styles.centerContent}>
                <Animated.Text style={[styles.title, titleStyle]} numberOfLines={1}>
                    {group.name}
                </Animated.Text>

                <View style={styles.subtitleContainer}>
                    <Animated.Text style={[styles.subtitle, styles.subtitleInitial, initialSubtitleStyle]}>
                        {group.total_members} members
                    </Animated.Text>
                    <Animated.Text style={[styles.subtitle, styles.subtitleScrolled, scrolledSubtitleStyle]}>
                        You owe {group.currency_symbol}{Math.abs(group.net_balance).toFixed(2)}
                    </Animated.Text>
                </View>
            </View>

            <View style={styles.rightButtons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="settings-outline" size={24} color="#1f2937" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="add" size={24} color="#1f2937" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#f9fafb', // Match bg
        zIndex: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
    },
    subtitleContainer: {
        height: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '500',
        position: 'absolute',
    },
    subtitleInitial: {
        color: '#6b7280',
    },
    subtitleScrolled: {
        color: '#ef4444', // Red for owed amount in header
        fontWeight: '700',
    },
    rightButtons: {
        flexDirection: 'row',
        gap: 8,
    },
});
