import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatsGrid() {
    const colorScheme = useColorScheme();
    const theme = Colors['light'];
    const isDark = false;

    return (
        <View style={styles.container}>
            {/* Total Groups Card */}
            <LinearGradient
                colors={['#6366f1', '#9333ea']} // indigo-500 to purple-600
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.bgIcon}>
                    <Ionicons name="people" size={80} color="rgba(255,255,255,0.1)" />
                </View>
                <Text style={styles.groupLabel}>TOTAL GROUPS</Text>
                <Text style={styles.groupValue}>19</Text>
                <View style={styles.groupBadge}>
                    <Ionicons name="add" size={14} color="#e0e7ff" />
                    <Text style={styles.groupBadgeText}>0 this month</Text>
                </View>
            </LinearGradient>

            {/* Active Expenses Card */}
            <View style={[styles.card, styles.expensesCard, { backgroundColor: isDark ? theme.card : '#FFFFFF' }]}>
                <View style={styles.expensesHeader}>
                    <View style={styles.receiptIcon}>
                        <Ionicons name="receipt-outline" size={24} color="#f97316" />
                    </View>
                    <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>+1 new</Text>
                    </View>
                </View>
                <View>
                    <Text style={[styles.expensesValue, { color: theme.text }]}>76</Text>
                    <Text style={styles.expensesLabel}>Active Expenses</Text>
                </View>
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
        minHeight: 160,
        justifyContent: 'center', // Align content vertically? HTML has them spaced
        // HTML uses flex-col h-full justify-between for the Active Expenses card.
        // For the gradient card, it seems fairly stacked.
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#7f13ec',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 30, // shadow-soft
        elevation: 4,
    },
    bgIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
        transform: [{ rotate: '-15deg' }],
    },
    groupLabel: {
        color: '#e0e7ff', // indigo-100
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    groupValue: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    groupBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    groupBadgeText: {
        color: '#e0e7ff',
        fontSize: 12,
        marginLeft: 2,
    },

    expensesCard: {
        shadowColor: 'rgba(0,0,0,0.03)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 20,
        justifyContent: 'space-between',
        elevation: 2,
    },
    expensesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    receiptIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#ffedd5', // orange-100
        justifyContent: 'center',
        alignItems: 'center',
    },
    newBadge: {
        backgroundColor: '#fff7ed', // orange-50
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    newBadgeText: {
        color: '#f97316', // orange-500
        fontSize: 10,
        fontWeight: 'bold',
    },
    expensesValue: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    expensesLabel: {
        color: '#6b7280',
        fontSize: 12,
        fontWeight: '500',
    },
});
