import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BalanceCard } from '../../components/groups/BalanceCard';
import { GroupCard, GroupData } from '../../components/groups/GroupCard';
import { HomeHeader } from '../../components/groups/HomeHeader';

// Mock Data
const GROUP_DATA: GroupData = {
  id: 1,
  name: "BBQ party lko s s",
  avatar_url: "👥",
  total_members: 5,
  total_expenses: 51,
  last_activity: "2025-12-12T15:30:00.159598",
  net_balance: 31857.06,
  activity_trend: 4,
  balance_trend: 60.0,
  currency: "USD",
  currency_symbol: "$",
  description: "Lucknow",
  members: [
    {
      id: 2,
      name: "Shobhit Sundriyal",
      avatar: "https://example.com/avatar1.jpg",
      balance: -31139.27
    },
    {
      id: 4,
      name: "Kamran",
      avatar: "https://example.com/avatar3.jpg",
      balance: -2076.91
    },
    {
      id: 7,
      name: "Michael Lee",
      avatar: "https://example.com/avatar8.jpg",
      balance: 263.73
    },
    {
      id: 1,
      name: "You",
      avatar: "https://example.com/",
      balance: 31857.06
    },
    {
      id: 6,
      name: "Emily Smith",
      avatar: "https://example.com/avatar5.jpg",
      balance: -1478.1
    }
  ],
  total_amount: 37870.96999999998,
  last_activity_relative: "9 days ago",
  total_owed: 0.0,
  total_owed_to_you: 31857.06
};

// Creating a list for the FlatList
const GROUPS_LIST = [
  GROUP_DATA,
  {
    ...GROUP_DATA,
    id: 2,
    name: "Summer Trip 2024",
    avatar_url: "✈️",
    total_members: 8,
    net_balance: -340.20,
    currency_symbol: "$",
    total_amount: 2850.00,
    last_activity_relative: "2 hours ago",
  },
  {
    ...GROUP_DATA,
    id: 3,
    name: "Apartment 4B",
    avatar_url: "🏠",
    total_members: 3,
    net_balance: 0, // Settled
    currency_symbol: "$",
    total_amount: 1200.00,
    last_activity_relative: "1 day ago",
  },
  {
    ...GROUP_DATA,
    id: 4,
    name: "Weekend Getaway",
    avatar_url: "🚗",
    total_members: 4,
    net_balance: 150.50,
    currency_symbol: "$",
    total_amount: 800.00,
    last_activity_relative: "3 days ago",
  },
  {
    ...GROUP_DATA,
    id: 5,
    name: "Office Lunch",
    avatar_url: "🍔",
    total_members: 12,
    net_balance: -45.00,
    currency_symbol: "$",
    total_amount: 350.00,
    last_activity_relative: "Yesterday",
  },
  {
    ...GROUP_DATA,
    id: 6,
    name: "Mom's Birthday Gift",
    avatar_url: "🎁",
    total_members: 3,
    net_balance: 50.00,
    currency_symbol: "$",
    total_amount: 150.00,
    last_activity_relative: "5 days ago",
  },
  {
    ...GROUP_DATA,
    id: 7,
    name: "Spotify Family Plan",
    avatar_url: "🎵",
    total_members: 6,
    net_balance: -12.00,
    currency_symbol: "$",
    total_amount: 17.99,
    last_activity_relative: "1 week ago",
  },
  {
    ...GROUP_DATA,
    id: 8,
    name: "Football Team",
    avatar_url: "⚽",
    total_members: 22,
    net_balance: 0,
    currency_symbol: "$",
    total_amount: 500.00,
    last_activity_relative: "2 weeks ago",
  }
];

export default function GroupsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'Groups' | 'Friends' | 'Activity'>('Groups');

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const balanceCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, 150], [1, 0.9], Extrapolation.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 150], [1, 0], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const renderListHeader = () => (
    <View>
      <Animated.View style={balanceCardStyle}>
        <BalanceCard />
      </Animated.View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {(['Groups', 'Friends', 'Activity'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Groups</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HomeHeader scrollY={scrollY} />
      <Animated.FlatList
        data={GROUPS_LIST}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GroupCard group={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderListHeader}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // Gray-50
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for bottom tab bar
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  activeTab: {
    backgroundColor: '#111827', // Gray-900
    borderColor: '#111827',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6', // Violet
  },
});
