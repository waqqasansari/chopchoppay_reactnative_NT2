/**
 * Landing Page Constants
 * All text content, images, and configuration for the landing page
 */

export const LandingContent = {
    hero: {
        title: 'Welcome to ChopChopPay',
        subtitle: 'Split bills and manage group expenses effortlessly',
        description: 'The easiest way to track shared expenses and settle up with friends',
    },
    features: [
        {
            id: '1',
            icon: 'people-outline',
            title: 'Group Expenses',
            description: 'Create groups and track shared expenses with friends and family',
        },
        {
            id: '2',
            icon: 'calculator-outline',
            title: 'Smart Splitting',
            description: 'Automatically calculate who owes what with intelligent split options',
        },
        {
            id: '3',
            icon: 'wallet-outline',
            title: 'Easy Settlement',
            description: 'Settle up quickly with integrated payment options',
        },
        {
            id: '4',
            icon: 'analytics-outline',
            title: 'Expense Tracking',
            description: 'Keep track of all your expenses with detailed insights',
        },
    ],
    cta: {
        primary: 'Get Started',
        secondary: 'Learn More',
    },
};

export const LandingConfig = {
    // Animation settings
    animation: {
        heroFadeIn: 800,
        featureStagger: 150,
        ctaDelay: 1000,
    },
    // Layout settings
    layout: {
        maxWidth: 600,
        horizontalPadding: 24,
        verticalPadding: 40,
    },
};
