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

const DEFAULT_GROUP: GroupData = {
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

export const GROUPS_LIST: GroupData[] = [
    DEFAULT_GROUP,
    {
        ...DEFAULT_GROUP,
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
        ...DEFAULT_GROUP,
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
        ...DEFAULT_GROUP,
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
        ...DEFAULT_GROUP,
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
        ...DEFAULT_GROUP,
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
        ...DEFAULT_GROUP,
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
        ...DEFAULT_GROUP,
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
