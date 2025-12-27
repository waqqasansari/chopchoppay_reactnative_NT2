import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const data = [
    { label: 'Jul', value: 42537.72 },
    { label: 'Aug', value: 16054.24 },
    { label: 'Sep', value: 65.98 },
    { label: 'Oct', value: 1115.98 },
    { label: 'Nov', value: 0.0 },
    { label: 'Dec', value: 249.98 }
];

export default function ActivityChart() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const isDark = colorScheme === 'dark';

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ width, height });
    };

    const hasDimensions = dimensions.width > 0 && dimensions.height > 0;

    // Chart Logic
    const paddingVertical = 20;
    const paddingHorizontal = 10;
    const chartHeight = dimensions.height - paddingVertical * 2;
    const chartWidth = dimensions.width - paddingHorizontal * 2;

    const maxValue = Math.max(...data.map(d => d.value)) * 1.1; // Add 10% headroom

    const getX = (index: number) => {
        return paddingHorizontal + (index * (chartWidth / (data.length - 1)));
    };

    const getY = (value: number) => {
        return dimensions.height - paddingVertical - ((value / maxValue) * chartHeight);
    };

    const pathD = hasDimensions ?
        `M ${data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' L ')}`
        : '';

    const fillD = hasDimensions ?
        `${pathD} L ${getX(data.length - 1)},${dimensions.height - paddingVertical} L ${paddingHorizontal},${dimensions.height - paddingVertical} Z`
        : '';

    return (
        <View style={[styles.card, { backgroundColor: isDark ? theme.card : '#FFFFFF' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Monthly Activity</Text>
                <View style={[styles.yearBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
                    <Text style={styles.yearText}>2025</Text>
                </View>
            </View>

            <View style={styles.chartContainer} onLayout={onLayout}>
                {hasDimensions && (
                    <Svg width={dimensions.width} height={dimensions.height}>
                        <Defs>
                            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#7f13ec" stopOpacity="0.2" />
                                <Stop offset="1" stopColor="#7f13ec" stopOpacity="0" />
                            </LinearGradient>
                        </Defs>

                        {/* Horizontal Grid Lines */}
                        <Path
                            d={`M ${paddingHorizontal},${getY(0)} L ${dimensions.width - paddingHorizontal},${getY(0)}`}
                            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                            strokeWidth="1"
                        />
                        <Path
                            d={`M ${paddingHorizontal},${getY(maxValue / 2)} L ${dimensions.width - paddingHorizontal},${getY(maxValue / 2)}`}
                            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                            strokeWidth="1"
                        />

                        {/* Area Fill */}
                        <Path d={fillD} fill="url(#grad)" />

                        {/* Line */}
                        <Path d={pathD} stroke="#7f13ec" strokeWidth="3" fill="none" />

                        {/* Dots */}
                        {data.map((d, i) => (
                            <Circle
                                key={i}
                                cx={getX(i)}
                                cy={getY(d.value)}
                                r="4"
                                fill="#FFFFFF"
                                stroke="#7f13ec"
                                strokeWidth="2"
                            />
                        ))}
                    </Svg>
                )}
            </View>

            {/* X Axis Labels */}
            <View style={styles.labelsContainer}>
                {data.map((d, i) => (
                    <Text key={i} style={styles.label}>{d.label}</Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 24,
        marginBottom: 24,
        padding: 24,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0,0.03)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    yearBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    yearText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
    },
    chartContainer: {
        height: 200,
        width: '100%',
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 10,
        color: '#9ca3af',
    },
});
