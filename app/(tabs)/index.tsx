import { GROUPS_LIST } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BalanceCard } from '../../components/groups/BalanceCard';
import { GroupCard } from '../../components/groups/GroupCard';
import { HomeHeader } from '../../components/groups/HomeHeader';



export default function GroupsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const router = useRouter(); // Initialize router
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
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() => router.push(`/group/${item.id}`)}
          />
        )}
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
