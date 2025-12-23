import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GroupTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const GroupTabs: React.FC<GroupTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = ['Expenses', 'Members', 'Activity'];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onTabChange(tab)}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        backgroundColor: '#f4f7f9', // background-light
        paddingTop: 8,
        paddingHorizontal: 20,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#7f13ec', // primary
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    activeTabText: {
        color: '#7f13ec', // primary
        fontWeight: '700',
    },
});
