import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

const data = [
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: -26483.49 },
    { label: 'Sep', value: -15988.26 },
    { label: 'Oct', value: 1050.0 },
    { label: 'Nov', value: -1115.98 },
    { label: 'Dec', value: 249.98 }
];

export default function NetChangeChart() {
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

    // Find max absolute value to center the zero line or scale appropriately
    const maxVal = Math.max(...data.map(d => Math.abs(d.value))) || 1;
    const scale = (chartHeight / 2) / maxVal;

    const zeroY = dimensions.height / 2;

    const barWidth = 20;
    const gap = (chartWidth - (data.length * barWidth)) / (data.length - 1);

    const getX = (index: number) => {
        return paddingHorizontal + (index * (barWidth + gap));
    };

    return (
        <View style={[styles.card, { backgroundColor: isDark ? theme.card : '#FFFFFF' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Net Change</Text>
            </View>

            <View style={styles.chartContainer} onLayout={onLayout}>
                {hasDimensions && (
                    <Svg width={dimensions.width} height={dimensions.height}>
                        {/* Zero Line */}
                        <Line
                            x1={paddingHorizontal}
                            y1={zeroY}
                            x2={dimensions.width - paddingHorizontal}
                            y2={zeroY}
                            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />

                        {/* Bars */}
                        {data.map((d, i) => {
                            const barHeight = Math.abs(d.value * scale);
                            const isPositive = d.value >= 0;
                            const y = isPositive ? zeroY - barHeight : zeroY;
                            const color = isPositive ? theme.success : theme.error;

                            if (barHeight === 0) return null;

                            return (
                                <Rect
                                    key={i}
                                    x={getX(i)}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={color}
                                    rx={4}
                                    ry={4}
                                />
                            );
                        })}
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
    chartContainer: {
        height: 200, // Matching the other chart
        width: '100%',
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // This might need manual spacing to match bars perfectly if gap is dynamic
        // But since bars are spread evenly, space-between on text usually aligns well enough for simple display
        marginTop: 8,
        paddingHorizontal: 0, // Adjust based on bar center
    },
    label: {
        fontSize: 10,
        color: '#9ca3af',
        width: 30, // approximates bar width + gap share
        textAlign: 'center',
    },
});
