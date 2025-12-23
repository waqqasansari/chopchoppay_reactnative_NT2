import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ActionButtons: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Add Expense Button */}
            <TouchableOpacity style={[styles.button, styles.primaryButton]} activeOpacity={0.9}>
                <View style={styles.iconBgPrimary}>
                    <MaterialIcons name="receipt-long" size={24} color="#ffffff" />
                </View>
                <Text style={styles.primaryLabel}>Add Expense</Text>
            </TouchableOpacity>

            {/* Recurring Button */}
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} activeOpacity={0.9}>
                <View style={styles.iconBgSecondary}>
                    <MaterialIcons name="update" size={24} color="#7f13ec" />
                </View>
                <Text style={styles.secondaryLabel}>Recurring</Text>
            </TouchableOpacity>

            {/* Balances Button */}
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} activeOpacity={0.9}>
                <View style={styles.iconBgSecondary}>
                    <MaterialIcons name="account-balance-wallet" size={24} color="#7f13ec" />
                </View>
                <Text style={styles.secondaryLabel}>Balances</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    primaryButton: {
        backgroundColor: '#141118', // text-main-light
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
    },
    iconBgPrimary: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 20,
    },
    iconBgSecondary: {
        backgroundColor: 'rgba(127, 19, 236, 0.1)', // primary/10
        padding: 8,
        borderRadius: 20,
    },
    primaryLabel: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
    },
    secondaryLabel: {
        color: '#141118',
        fontSize: 11,
        fontWeight: '700',
    },
});
