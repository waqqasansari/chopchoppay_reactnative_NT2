import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExpenseItemProps {
    title: string;
    paidBy: string;
    category: string;
    amount: number;
    dateLabel: string; // "4:30 PM", "Yesterday", "Tue"
    icon: keyof typeof MaterialIcons.glyphMap;
    colorClass: string; // "orange", "blue", etc. we'll map to colors
    isPositive: boolean;
    status?: string; // "Pending", "Settled"
}

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    orange: { bg: '#ffedd5', text: '#ea580c', icon: '#ea580c' },
    blue: { bg: '#dbeafe', text: '#2563eb', icon: '#2563eb' },
    purple: { bg: '#f3e8ff', text: '#9333ea', icon: '#9333ea' },
    green: { bg: '#dcfce7', text: '#16a34a', icon: '#16a34a' },
    red: { bg: '#fee2e2', text: '#dc2626', icon: '#dc2626' },
    yellow: { bg: '#fef9c3', text: '#ca8a04', icon: '#ca8a04' },
    indigo: { bg: '#e0e7ff', text: '#4f46e5', icon: '#4f46e5' },
    gray: { bg: '#f3f4f6', text: '#4b5563', icon: '#4b5563' },
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({
    title, paidBy, category, amount, dateLabel, icon, colorClass, isPositive, status
}) => {
    const colors = colorMap[colorClass] || colorMap.gray;

    return (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: colors.bg }]}>
                <MaterialIcons name={icon} size={24} color={colors.text} />
            </View>

            <View style={styles.centerContent}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtext} numberOfLines={1}>
                    Paid by <Text style={styles.boldText}>{paidBy}</Text> • {category}
                </Text>
            </View>

            <View style={styles.rightContent}>
                <Text style={[styles.amount, isPositive ? styles.positiveAmount : styles.negativeAmount]}>
                    {isPositive ? '+' : '-'}${Math.abs(amount).toFixed(2)}
                </Text>

                {status === 'Pending' && (
                    <View style={styles.statusBadgePending}>
                        <View style={styles.statusDotPending} />
                        <Text style={styles.statusTextPending}>PENDING</Text>
                    </View>
                )}
                {status === 'Settled' && (
                    <View style={styles.statusRow}>
                        <MaterialIcons name="check-circle" size={12} color="#22c55e" />
                        <Text style={styles.statusTextSettled}>Settled</Text>
                    </View>
                )}
                {!status && (
                    <Text style={styles.dateText}>{dateLabel}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export const ExpenseList: React.FC = () => {
    return (
        <View style={styles.listContainer}>
            <Text style={styles.sectionHeader}>TODAY</Text>
            <ExpenseItem
                title="Costco Run"
                paidBy="You"
                category="Groceries"
                amount={156.40}
                dateLabel=""
                icon="shopping-cart"
                colorClass="orange"
                isPositive={true}
                status="Pending"
            />
            <ExpenseItem
                title="Friday Drinks"
                paidBy="John D."
                category="Fun"
                amount={42.00}
                dateLabel="4:30 PM"
                icon="local-bar"
                colorClass="blue"
                isPositive={false}
            />

            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>YESTERDAY</Text>
            <ExpenseItem
                title="Uber to Beach"
                paidBy="Sarah M."
                category="Transport"
                amount={18.50}
                dateLabel="Yesterday"
                icon="directions-car"
                colorClass="purple"
                isPositive={false}
            />
            <ExpenseItem
                title="BBQ Meat"
                paidBy="You"
                category="Food"
                amount={230.00}
                dateLabel=""
                icon="restaurant"
                colorClass="green"
                isPositive={true}
                status="Settled"
            />

            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>LAST WEEK</Text>
            <ExpenseItem
                title="Cinema Tickets"
                paidBy="Mike R."
                category="Entertainment"
                amount={35.00}
                dateLabel="Tue"
                icon="movie"
                colorClass="red"
                isPositive={false}
            />
            <ExpenseItem
                title="Gas for Trip"
                paidBy="Sarah M."
                category="Transport"
                amount={60.50}
                dateLabel="Mon"
                icon="local-gas-station"
                colorClass="yellow"
                isPositive={false}
            />
            <ExpenseItem
                title="Airbnb Deposit"
                paidBy="You"
                category="Accommodation"
                amount={450.00}
                dateLabel="Sun"
                icon="bed"
                colorClass="indigo"
                isPositive={true}
            />
            <ExpenseItem
                title="Snacks & Drinks"
                paidBy="John D."
                category="Groceries"
                amount={28.90}
                dateLabel="Sun"
                icon="shopping-bag"
                colorClass="gray"
                isPositive={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 16,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6b7280',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
    },
    subtext: {
        fontSize: 12,
        color: '#6b7280',
    },
    boldText: {
        color: '#1f2937',
        fontWeight: '600',
    },
    rightContent: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 4,
    },
    amount: {
        fontSize: 14,
        fontWeight: '800',
    },
    positiveAmount: {
        color: '#10b981',
    },
    negativeAmount: {
        color: '#ef4444',
    },
    dateText: {
        fontSize: 10,
        color: '#6b7280',
        fontWeight: '500',
    },
    statusBadgePending: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffedd5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        gap: 4,
    },
    statusDotPending: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#f97316',
    },
    statusTextPending: {
        fontSize: 9,
        fontWeight: '700',
        color: '#c2410c',
        textTransform: 'uppercase',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusTextSettled: {
        fontSize: 10,
        fontWeight: '500',
        color: '#6b7280',
    },
});
