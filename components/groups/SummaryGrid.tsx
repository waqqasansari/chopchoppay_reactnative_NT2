import { GroupData } from '@/constants/data';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface SummaryGridProps {
    scrollY: SharedValue<number>;
    group: GroupData;
}

export const SummaryGrid: React.FC<SummaryGridProps> = ({ scrollY, group }) => {
    const gridStyle = useAnimatedStyle(() => {
        const scale = interpolate(scrollY.value, [0, 120], [1, 0.95], Extrapolation.CLAMP);
        const opacity = interpolate(scrollY.value, [0, 80], [1, 0], Extrapolation.CLAMP);
        const translateY = interpolate(scrollY.value, [0, 120], [0, 10], Extrapolation.CLAMP); // Parallax-ish

        // We can set display/height to 0 when opacity is 0 to let content scroll up, 
        // but typically just opacity/scale is enough for the effect "fade out".
        // The HTML implementation keeps the space but fades it out. 
        // If we want it to collapse properly to let list take over, we might need to adjust height or margin.
        // For now, mirroring HTML behavior: Opacity + Scale.

        return {
            opacity,
            transform: [
                { scale },
                { translateY }
            ],
        };
    });

    return (
        <Animated.View style={[styles.gridContainer, gridStyle]}>
            <View style={styles.topRow}>
                <View style={styles.smallCard}>
                    <Text style={styles.smallLabel}>EXPENSES</Text>
                    <Text style={styles.smallValue}>{group.total_expenses}</Text>
                </View>
                <View style={styles.smallCard}>
                    <Text style={styles.smallLabel}>TOTAL AMOUNT</Text>
                    <Text style={styles.smallValue}>
                        {group.currency_symbol}{group.total_amount.toLocaleString()}
                    </Text>
                </View>
            </View>

            <View style={styles.bottomRow}>
                {/* You Owe Card */}
                <View style={[styles.largeCard, styles.oweCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconCircle, styles.oweIconBg]}>
                            <MaterialIcons name="arrow-outward" size={20} color="#ef4444" />
                        </View>
                        <View style={[styles.glow, styles.oweGlow]} />
                    </View>
                    <View>
                        <Text style={[styles.cardLabel, styles.oweLabel]}>YOU OWE</Text>
                        <Text style={[styles.cardValue, styles.oweValue]}>
                            {group.currency_symbol}{Math.abs(group.net_balance < 0 ? group.net_balance : 0).toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Owed to You Card */}
                <View style={[styles.largeCard, styles.owedCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconCircle, styles.owedIconBg]}>
                            <MaterialIcons name="call-received" size={20} color="#10b981" />
                        </View>
                        <View style={[styles.glow, styles.owedGlow]} />
                    </View>
                    <View>
                        <Text style={[styles.cardLabel, styles.owedLabel]}>OWED TO YOU</Text>
                        <Text style={[styles.cardValue, styles.owedValue]}>
                            {group.currency_symbol}{Math.abs(group.net_balance > 0 ? group.net_balance : 0).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 24,
        gap: 12,
    },
    topRow: {
        flexDirection: 'row',
        gap: 12,
    },
    bottomRow: {
        flexDirection: 'row',
        gap: 12,
    },
    smallCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 20,
        elevation: 2,
    },
    smallLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    smallValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginTop: 2,
    },
    largeCard: {
        flex: 1,
        height: 144,
        borderRadius: 16,
        padding: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 20,
        elevation: 2,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    glow: {
        position: 'absolute',
        width: 64,
        height: 64,
        borderRadius: 32,
        top: -10,
        right: -10, // positioned right top like in HTML
        opacity: 0.6,
        filter: 'blur(20px)', // React Native doesn't support filter blur easily without Skia or image. 
        // We can use a View with translucent bg, but blur is hard.
        // For now, simpler opacity circle.
    },
    cardLabel: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    // Owe Styles
    oweCard: {
        backgroundColor: '#fef2f2', // red-50
        borderColor: '#fee2e2',
        borderWidth: 1,
    },
    oweIconBg: {
        backgroundColor: '#ffffff',
    },
    oweGlow: {
        backgroundColor: '#fee2e2',
    },
    oweLabel: {
        color: 'rgba(220, 38, 38, 0.7)', // red-600/70
    },
    oweValue: {
        color: '#ef4444',
    },
    // Owed Styles
    owedCard: {
        backgroundColor: '#f0fdf4', // green-50
        borderColor: '#dcfce7',
        borderWidth: 1,
    },
    owedIconBg: {
        backgroundColor: '#ffffff',
    },
    owedGlow: {
        backgroundColor: '#dcfce7',
    },
    owedLabel: {
        color: 'rgba(22, 163, 74, 0.7)', // green-600/70
    },
    owedValue: {
        color: '#10b981',
    },
});
