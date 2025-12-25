import { ActionButtons } from '@/components/groups/ActionButtons';
import { ActivityList } from '@/components/groups/ActivityList';
import { DetailHeader } from '@/components/groups/DetailHeader';
import { ExpenseList } from '@/components/groups/ExpenseList';
import { GroupTabs } from '@/components/groups/GroupTabs';
import { MembersList } from '@/components/groups/MembersList';
import { SummaryGrid } from '@/components/groups/SummaryGrid';
import { GROUPS_LIST } from '@/constants/data';
import { BlurView } from 'expo-blur';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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
            <Stack.Screen options={{ headerShown: false }} />

            {/* Background Blobs with Blur */}
            <View style={StyleSheet.absoluteFill}>
                <View style={styles.blobBlue} />
                <View style={styles.blobPink} />
                <BlurView
                    style={StyleSheet.absoluteFill}
                    intensity={80} // High intensity to diffuse the blobs
                    tint="light" // Matches the light theme
                    experimentalBlurMethod="dimezisBlurView" // Better performance/visuals on Android if available in recent Expo
                />
            </View>

            {/* Header - Fixed at Top */}
            <DetailHeader scrollY={scrollY} group={group} />

            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[2]} // Tabs are now index 2 (Summary=0, Actions=1, Tabs=2)
            >
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
                {activeTab === 'Expenses' && <ExpenseList />}
                {activeTab === 'Members' && <MembersList group={group} />}
                {activeTab === 'Activity' && <ActivityList group={group} />}
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
        paddingTop: 8,
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
