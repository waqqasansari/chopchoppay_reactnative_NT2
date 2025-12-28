import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FinancialSummary() {
    const colorScheme = useColorScheme();
    const theme = Colors['light'];
    const isDark = false;

    return (
        <View style={styles.container}>
            {/* You Owe Card */}
            <View style={[styles.card, { backgroundColor: isDark ? theme.card : '#FFFFFF' }]}>
                <View style={styles.headerRow}>
                    <View style={[styles.iconContainer, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2' }]}>
                        <Ionicons name="arrow-forward" size={18} color={theme.error} style={{ transform: [{ rotate: '-45deg' }] }} />
                    </View>
                    <Text style={styles.cardLabel}>YOU OWE</Text>
                </View>
                <View>
                    <Text style={[styles.amount, { color: theme.text }]}>$116,306.52</Text>
                    <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEF2F2' }]}>
                        <Ionicons name="trending-up" size={14} color={theme.error} />
                        <Text style={[styles.badgeText, { color: theme.error }]}>25%</Text>
                    </View>
                </View>

                {/* Glow effect */}
                <View style={[styles.glow, { backgroundColor: '#FEE2E2', opacity: isDark ? 0.1 : 0.6 }]} />
            </View>

            {/* Owed to You Card */}
            <View style={[styles.card, { backgroundColor: isDark ? theme.card : '#FFFFFF' }]}>
                <View style={styles.headerRow}>
                    <View style={[styles.iconContainer, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5' }]}>
                        <Ionicons name="arrow-down" size={18} color={theme.success} style={{ transform: [{ rotate: '45deg' }] }} />
                    </View>
                    <Text style={styles.cardLabel}>OWED TO YOU</Text>
                </View>
                <View>
                    <Text style={[styles.amount, { color: theme.text }]}>$701,603.29</Text>
                    <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5' }]}>
                        <Ionicons name="trending-up" size={14} color={theme.success} />
                        <Text style={[styles.badgeText, { color: theme.success }]}>25%</Text>
                    </View>
                </View>
                {/* Glow effect */}
                <View style={[styles.glow, { backgroundColor: '#DCFCE7', opacity: isDark ? 0.1 : 0.6 }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    card: {
        flex: 1,
        padding: 20,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0,0.03)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        justifyContent: 'space-between',
        minHeight: 140,
        overflow: 'hidden',
        position: 'relative',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6b7280', // text-sub
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    amount: {
        fontSize: 18, // slightly smaller than xl to fit
        fontWeight: 'bold',
        marginBottom: 4,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        alignSelf: 'flex-start',
        gap: 2,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    glow: {
        position: 'absolute',
        top: -24,
        right: -24,
        width: 64,
        height: 64,
        borderRadius: 32,
    }
});
