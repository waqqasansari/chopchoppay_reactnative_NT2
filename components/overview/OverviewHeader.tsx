import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OverviewHeader() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const isDark = colorScheme === 'dark';

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.title, { color: theme.text }]}>Overview</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Financial Summary</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.iconButton, { backgroundColor: isDark ? theme.cardSecondary : theme.background }]}
                >
                    <Ionicons name="notifications-outline" size={24} color={theme.icon} />
                </TouchableOpacity>

                <View style={styles.avatarContainer}>
                    <LinearGradient
                        colors={['#818cf8', '#a855f7']} // indigo-400 to purple-500
                        style={styles.avatarGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.avatarText}>AJ</Text>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60, // approximate pt-14
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'PlusJakartaSans-Bold', // Assuming font is linked, otherwise fallback
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)', // approximate border
    },
    avatarGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
