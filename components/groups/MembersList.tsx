import { GroupData } from '@/constants/data';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MembersListProps {
    group: GroupData;
}

export const MembersList: React.FC<MembersListProps> = ({ group }) => {
    return (
        <View style={styles.container}>
            {/* Header with Add Button */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{group.members.length} Members</Text>
                <TouchableOpacity style={styles.addButton}>
                    <MaterialIcons name="add" size={14} color="#1f2937" />
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* Members List */}
            {group.members.map((member) => (
                <View key={member.id} style={styles.memberCard}>
                    {/* Avatar */}
                    {member.avatar.startsWith('http') ? (
                        <Image source={{ uri: member.avatar }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Text style={styles.avatarText}>
                                {member.name.charAt(0)}
                            </Text>
                        </View>
                    )}

                    {/* Info */}
                    <View style={styles.info}>
                        <Text style={styles.name}>{member.name}</Text>
                        <View style={styles.detailsRow}>
                            {member.role && (
                                <View style={styles.roleBadge}>
                                    <Text style={styles.roleText}>{member.role}</Text>
                                </View>
                            )}
                            <Text style={member.balance >= 0 ? styles.balancePositive : styles.balanceNegative}>
                                {member.balance < 0 ? '-' : ''}${Math.abs(member.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </Text>
                        </View>
                    </View>

                    {/* Actions Button */}
                    <TouchableOpacity style={styles.moreButton}>
                        <MaterialIcons name="more-vert" size={24} color="#9ca3af" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        gap: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    memberCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarPlaceholder: {
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 2,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    roleBadge: {
        backgroundColor: '#dbeafe', // blue-100
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    roleText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1d4ed8', // blue-700
        textTransform: 'uppercase',
    },
    balancePositive: {
        fontSize: 12,
        fontWeight: '500',
        color: '#10b981', // green
    },
    balanceNegative: {
        fontSize: 12,
        fontWeight: '500',
        color: '#ef4444', // red
    },
    moreButton: {
        padding: 4,
    },
});
