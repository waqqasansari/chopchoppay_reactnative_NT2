
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ActivityChart from '@/components/overview/ActivityChart';
import FinancialSummary from '@/components/overview/FinancialSummary';
import NetChangeChart from '@/components/overview/NetChangeChart';
import OverviewHeader from '@/components/overview/OverviewHeader';
import QuickActions from '@/components/overview/QuickActions';
import StatsGrid from '@/components/overview/StatsGrid';

export default function OverviewScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const isDark = colorScheme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: isDark ? theme.background : '#f4f7f9' }]}>
            {/* Background Blobs with Blur */}
            <View style={StyleSheet.absoluteFill}>
                <View style={[styles.blob, styles.blob1]} />
                <View style={[styles.blob, styles.blob2]} />
                <BlurView
                    style={StyleSheet.absoluteFill}
                    intensity={80}
                    tint={isDark ? 'dark' : 'light'}
                    experimentalBlurMethod="dimezisBlurView"
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <OverviewHeader />
                <FinancialSummary />
                <StatsGrid />
                <ActivityChart />
                <NetChangeChart />
                <QuickActions />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    blob: {
        position: 'absolute',
        borderRadius: 9999,
    },
    blob1: {
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        backgroundColor: 'rgba(208, 232, 255, 0.4)', // accent-blue
    },
    blob2: {
        top: 50,
        right: -100,
        width: 300,
        height: 300,
        backgroundColor: 'rgba(244, 215, 245, 0.4)', // accent-pink
    }
});
