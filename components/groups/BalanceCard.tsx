import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const BalanceCard = () => {
    return (
        <LinearGradient
            colors={['#8b5cf6', '#a78bfa']} // Violet-500 to Violet-400
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <View style={styles.content}>
                <Text style={styles.label}>Total Balance</Text>
                <View style={styles.balanceRow}>
                    <Text style={styles.amount}>$31,857.06</Text>
                    <Text style={styles.subtext}>owed to you</Text>
                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.9}>
                    <Ionicons name="add-circle" size={20} color="#8b5cf6" style={{ marginRight: 6 }} />
                    <Text style={styles.buttonText}>New Expense</Text>
                </TouchableOpacity>
            </View>

            {/* Decorative shapes */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 32,
        padding: 24,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
        height: 200,
        justifyContent: 'center',
    },
    content: {
        zIndex: 10,
    },
    label: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        marginBottom: 8,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 24,
    },
    amount: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: '800',
        marginRight: 8,
    },
    subtext: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#8b5cf6',
        fontWeight: '700',
        fontSize: 16,
    },
    // Decorative circles
    circle1: {
        position: 'absolute',
        right: -40,
        bottom: -40,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    circle2: {
        position: 'absolute',
        right: 40,
        top: 20,
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        transform: [{ rotate: '-15deg' }],
    },
});
