import { ActionButtons } from '@/components/groups/ActionButtons';
import { DetailHeader } from '@/components/groups/DetailHeader';
import { ExpenseList } from '@/components/groups/ExpenseList';
import { GroupTabs } from '@/components/groups/GroupTabs';
import { SummaryGrid } from '@/components/groups/SummaryGrid';
import { GROUPS_LIST } from '@/constants/data';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function GroupDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const group = GROUPS_LIST.find(g => g.id.toString() === id) || GROUPS_LIST[0];

    const scrollY = useSharedValue(0);
    const [activeTab, setActiveTab] = useState('Expenses');

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    return (
        <View style={styles.container}>
            {/* Background Blobs */}
            <View style={styles.blobBlue} />
            <View style={styles.blobPink} />

            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0, 3]} // Header (0) and Tabs (3) are sticky
            >
                {/* Header - Sticky */}
                <DetailHeader scrollY={scrollY} group={group} />

                {/* Summary Grid */}
                <SummaryGrid scrollY={scrollY} group={group} />

                {/* Action Buttons */}
                <ActionButtons />

                {/* Sticky Tabs */}
                {/* Wrapped in View to ensure it can stick as a block */}
                <View style={styles.stickyTabsContainer}>
                    <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </View>

                {/* Content based on Tab */}
                {activeTab === 'Expenses' ? (
                    <ExpenseList />
                ) : (
                    <View style={styles.placeholderTab}>
                        <Text style={styles.placeholderText}>No {activeTab.toLowerCase()} yet.</Text>
                    </View>
                )}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f9', // background-light
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    stickyTabsContainer: {
        marginTop: 8,
        backgroundColor: '#f4f7f9', // Ensuring opaque background when sticky
        zIndex: 5,
        paddingBottom: 4,
    },
    // Blobs
    blobBlue: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: 'rgba(208, 232, 255, 0.4)', // accent-blue/40
    },
    blobPink: {
        position: 'absolute',
        top: 50,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(244, 215, 245, 0.4)', // accent-pink/40
    },
    placeholderTab: {
        padding: 40,
        alignItems: 'center',
    },
    placeholderText: {
        color: '#6b7280',
    },
});
