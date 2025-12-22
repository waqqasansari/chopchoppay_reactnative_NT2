import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface GroupMember {
    id: number;
    name: string;
    avatar: string;
    balance: number;
}

export interface GroupData {
    id: number;
    name: string;
    avatar_url: string;
    total_members: number;
    total_expenses: number;
    last_activity: string;
    net_balance: number;
    activity_trend: number;
    balance_trend: number;
    currency: string;
    currency_symbol: string;
    description: string;
    members: GroupMember[];
    total_amount: number;
    last_activity_relative: string;
    total_owed: number;
    total_owed_to_you: number;
}

interface GroupCardProps {
    group: GroupData;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    // Determine if user is owed money or owes money
    // The JSON has total_owed_to_you as positive. If net_balance is positive, you are owed?
    // Let's assume net_balance > 0 means you are owed.
    const isOwed = group.net_balance > 0;
    const isDebt = group.net_balance < 0;
    const isSettled = group.net_balance === 0;

    const statusColor = isOwed ? '#10b981' : isDebt ? '#ef4444' : '#6b7280'; // Green, Red, Gray
    const statusText = isOwed ? 'YOU ARE OWED' : isDebt ? 'YOU OWE' : 'SETTLED';
    const amountText = isSettled ? 'Settled' : `${group.currency_symbol}${Math.abs(group.net_balance).toFixed(2)}`;

    // Get first 3 members for avatars
    const displayMembers = group.members.slice(0, 3);
    const extraMembersCalls = group.total_members - 3;

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                {/* Group Icon */}
                <View style={styles.iconContainer}>
                    {/* If avatar_url is an emoji, render text, else image */}
                    {group.avatar_url && group.avatar_url.length < 5 ? (
                        <Text style={{ fontSize: 24 }}>{group.avatar_url}</Text>
                    ) : (
                        <Ionicons name="people" size={24} color="#f97316" />
                    )}
                </View>

                {/* Group Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.groupName} numberOfLines={1}>{group.name}</Text>
                    <Text style={styles.groupMeta}>
                        {group.total_members} members • Updated {group.last_activity_relative}
                    </Text>
                </View>

                {/* Status Amount */}
                <View style={styles.statusContainer}>
                    <Text style={[styles.amountText, { color: statusColor }]}>
                        {isOwed ? '+' : isDebt ? '-' : ''}{amountText}
                    </Text>
                    <Text style={styles.statusLabel}>{statusText}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footerRow}>
                {/* Member Avatars */}
                <View style={styles.avatarsContainer}>
                    {displayMembers.map((member, index) => (
                        <View key={member.id} style={[styles.avatarWrapper, { left: index * 20, zIndex: 10 - index }]}>
                            {/* Placeholder for member avatar since URLs are example.com */}
                            <View style={[styles.avatarPlaceholder, { backgroundColor: getAvatarColor(member.name) }]}>
                                <Text style={styles.avatarInitials}>{getInitials(member.name)}</Text>
                            </View>
                        </View>
                    ))}
                    {extraMembersCalls > 0 && (
                        <View style={[styles.avatarWrapper, { left: 3 * 20, zIndex: 0 }]}>
                            <View style={[styles.avatarPlaceholder, { backgroundColor: '#e5e7eb' }]}>
                                <Text style={[styles.avatarInitials, { color: '#374151', fontSize: 10 }]}>+{extraMembersCalls}</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Total Expense */}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>
                        {group.currency_symbol}{group.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                </View>
            </View>
        </View>
    );
};

// Helpers
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

const getAvatarColor = (name: string) => {
    const colors = ['#bfdbfe', '#bbf7d0', '#fecaca', '#fde047', '#e9d5ff', '#fed7aa'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff7ed', // orange-50
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    groupName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 2,
    },
    groupMeta: {
        fontSize: 12,
        color: '#9ca3af',
    },
    statusContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    amountText: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginBottom: 12,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 32,
    },
    avatarsContainer: {
        flexDirection: 'row',
        flex: 1,
        position: 'relative',
        height: 32,
    },
    avatarWrapper: {
        position: 'absolute',
        top: 0,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitials: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 12,
        color: '#9ca3af',
        marginRight: 4,
    },
    totalAmount: {
        fontSize: 14,
        fontWeight: '700',
        color: '#374151',
    },
});
