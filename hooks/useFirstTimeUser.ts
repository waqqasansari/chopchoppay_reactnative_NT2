/**
 * useFirstTimeUser Hook
 * Detects if this is the user's first time opening the app
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const FIRST_TIME_KEY = '@chopchoppay:first_time_user';

export const useFirstTimeUser = () => {
    const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkFirstTimeUser();
    }, []);

    const checkFirstTimeUser = async () => {
        try {
            const hasVisited = await AsyncStorage.getItem(FIRST_TIME_KEY);
            setIsFirstTime(hasVisited === null);
        } catch (error) {
            console.error('Error checking first time user:', error);
            setIsFirstTime(true); // Default to showing landing page on error
        } finally {
            setIsLoading(false);
        }
    };

    const markAsReturningUser = async () => {
        try {
            await AsyncStorage.setItem(FIRST_TIME_KEY, 'false');
            setIsFirstTime(false);
        } catch (error) {
            console.error('Error marking as returning user:', error);
        }
    };

    const resetFirstTimeUser = async () => {
        try {
            await AsyncStorage.removeItem(FIRST_TIME_KEY);
            setIsFirstTime(true);
        } catch (error) {
            console.error('Error resetting first time user:', error);
        }
    };

    return {
        isFirstTime,
        isLoading,
        markAsReturningUser,
        resetFirstTimeUser,
    };
};
