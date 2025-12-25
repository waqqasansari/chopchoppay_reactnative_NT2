import { GroupData } from '@/constants/data';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ActivityListProps {
    group: GroupData;
}

export const ActivityList: React.FC<ActivityListProps> = ({ group }) => {
    return (
        <View style={styles.container}>
            {group.activities?.map((activity) => (
                <View key={activity.id} style={styles.activityCard}>
                    {/* Icon Box */}
                    <View style={[
                        styles.iconBox,
                        activity.type === 'system' ? styles.iconBoxSystem : styles.iconBoxExpense
                    ]}>
                        <MaterialIcons
                            name={activity.type === 'system' ? 'info' : 'local-offer'}
                            size={20}
                            color={activity.type === 'system' ? '#2563eb' : '#FF69B4'}
                        />
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        {/* Header Row: Name + Time Ago */}
                        <View style={styles.headerRow}>
                            <Text style={styles.userName}>{activity.userName}</Text>
                            <View style={styles.timeTag}>
                                <Text style={styles.timeTagText}>{activity.timeAgo}</Text>
                            </View>
                        </View>

                        {/* Description / Action */}
                        <Text style={styles.actionText}>
                            {activity.action}
                            {activity.amount && <Text style={styles.amountText}> {activity.amount}</Text>}
                        </Text>

                        {/* Timestamp Footer */}
                        <View style={styles.footerRow}>
                            <MaterialIcons name="calendar-today" size={12} color="#9ca3af" style={{ marginRight: 4 }} />
                            <Text style={styles.timestamp}>{activity.timestamp}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 12, // Reduced gap between cards
    },
    activityCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    iconBoxSystem: {
        backgroundColor: '#dbeafe', // light blue
    },
    iconBoxExpense: {
        backgroundColor: '#fce7f3', // light pink
    },
    content: {
        flex: 1,
        gap: 4,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    timeTag: {
        backgroundColor: '#e0e7ff', // very light blue/purple
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
    },
    timeTagText: {
        fontSize: 10,
        color: '#4338ca', // indigo-700
        fontWeight: '500',
    },
    actionText: {
        fontSize: 13,
        color: '#4b5563', // gray-600
        lineHeight: 18,
    },
    amountText: {
        fontWeight: '500',
        color: '#374151',
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    timestamp: {
        fontSize: 11,
        color: '#9ca3af', // gray-400
    },
});
