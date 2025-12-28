import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuickActions() {
    const colorScheme = useColorScheme();
    const theme = Colors['light'];
    const isDark = false;

    const actions = [
        { label: 'Add Expense', icon: 'card-outline', color: theme.primary, bg: isDark ? 'rgba(127, 19, 236, 0.1)' : 'rgba(127, 19, 236, 0.1)' },
        { label: 'New Group', icon: 'people-outline', color: theme.success, bg: isDark ? 'rgba(16, 185, 129, 0.1)' : '#DCFCE7' }, // green-100
        { label: 'History', icon: 'time-outline', color: '#2563eb', bg: isDark ? 'rgba(37, 99, 235, 0.1)' : '#DBEAFE' }, // blue-100
    ];

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {actions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, { backgroundColor: isDark ? theme.card : '#FFFFFF' }]}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: action.bg }]}>
                            <Ionicons name={action.icon as any} size={24} color={action.color} />
                        </View>
                        <Text style={[styles.label, { color: theme.text }]}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
                {/* Fake padding right for scroll */}
                <View style={{ width: 10 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100, // Extra space at bottom for tab bar padding
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 24,
        marginBottom: 16,
    },
    scrollContent: {
        paddingHorizontal: 24,
        gap: 16,
    },
    button: {
        width: 100,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0,0.03)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        gap: 8,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
    },
});
