import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBlob } from '../ui/GradientBlob';
import { FeatureCard } from './FeatureCard';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'Smart OCR Scanning',
        description: 'Snap a photo of your receipt and let AI extract items and prices instantly.',
        iconName: 'scan-outline' as const,
        badgeIconName: 'camera' as const,
        accentColor: '#7f13ec',
    },
    {
        id: '2',
        title: 'Real-Time Conversion',
        description: 'Traveling? Convert receipt currencies to your local currency instantly.',
        iconName: 'globe-outline' as const,
        badgeIconName: 'swap-horizontal' as const,
        accentColor: '#2CDDC7',
    },
    {
        id: '3',
        title: 'Visual Settlements',
        description: 'Visualize who owes what and settle debts with integrated payments.',
        iconName: 'pie-chart-outline' as const,
        badgeIconName: 'analytics' as const,
        accentColor: '#FF6B6B',
    },
    {
        id: '4',
        title: 'Group Management',
        description: 'Create groups for trips, dinners, or house expenses and keep everyone in sync.',
        iconName: 'people-outline' as const,
        badgeIconName: 'people' as const,
        accentColor: '#F59E0B',
    },
];

export const OnboardingScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const isDark = colorScheme === 'dark';
    const colors = Colors[colorScheme ?? 'light'];

    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleContinue = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            completeOnboarding();
        }
    };

    const completeOnboarding = () => {
        router.replace('/(tabs)');
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Background Blobs */}
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                <GradientBlob
                    id="blob1"
                    color="rgba(127, 19, 236, 0.2)"
                    style={styles.blobTop}
                />
                <GradientBlob
                    id="blob2"
                    color="rgba(44, 221, 199, 0.15)"
                    style={styles.blobBottom}
                />
            </View>

            {/* Skip Button */}
            <TouchableOpacity
                style={[styles.skipButton, { top: insets.top + 16 }]}
                onPress={completeOnboarding}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
            </TouchableOpacity>

            {/* Carousel */}
            <View style={styles.carouselContainer}>
                <FlatList
                    ref={flatListRef}
                    data={ONBOARDING_DATA}
                    style={{ flexGrow: 0 }}
                    renderItem={({ item }) => (
                        <FeatureCard
                            title={item.title}
                            description={item.description}
                            iconName={item.iconName}
                            badgeIconName={item.badgeIconName}
                            accentColor={item.accentColor}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    extraData={currentIndex}
                />
            </View>

            {/* Bottom Section */}
            <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
                {/* Dots Indicator */}
                <View style={styles.paginator}>
                    {ONBOARDING_DATA.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 24, 8],
                            extrapolate: 'clamp',
                        });

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={i.toString()}
                                style={[
                                    styles.dot,
                                    {
                                        width: dotWidth,
                                        opacity,
                                        backgroundColor: '#7f13ec',
                                    }
                                ]}
                            />
                        );
                    })}
                </View>

                {/* Main Action Button */}
                <TouchableOpacity
                    onPress={handleContinue}
                    activeOpacity={0.8}
                    style={styles.buttonShadow}
                >
                    <LinearGradient
                        colors={['#7f13ec', '#a64aff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    blobTop: {
        position: 'absolute',
        top: -100,
        right: -50,
        width: 400,
        height: 400,
        transform: [{ scale: 1.2 }],
    },
    blobBottom: {
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 400,
        height: 400,
        transform: [{ scale: 1.2 }],
    },
    skipButton: {
        position: 'absolute',
        right: 24,
        zIndex: 20,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.05)', // Subtle background for better touch target visibility if needed
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    skipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomContainer: {
        paddingHorizontal: 32,
        // Height handled by paddingBottom and flex layout usually, but here fixed height works too if content fits
        minHeight: 160,
        justifyContent: 'flex-end',
    },
    paginator: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    buttonShadow: {
        width: '100%',
        shadowColor: '#7f13ec',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 9999,
        marginBottom: 8,
    },
    button: {
        width: '100%',
        height: 56,
        borderRadius: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
