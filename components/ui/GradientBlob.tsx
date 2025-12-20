import React from 'react';
import { Animated } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

interface GradientBlobProps {
    color: string;
    style: any;
    id: string;
}

export const GradientBlob: React.FC<GradientBlobProps> = ({ color, style, id }) => {
    return (
        <Animated.View style={style}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Defs>
                    <RadialGradient
                        id={`grad-${id}`}
                        cx="50%"
                        cy="50%"
                        rx="50%"
                        ry="50%"
                        fx="50%"
                        fy="50%"
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop offset="0%" stopColor={color} stopOpacity="1" />
                        <Stop offset="100%" stopColor={color} stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100" height="100" fill={`url(#grad-${id})`} />
            </Svg>
        </Animated.View>
    );
};
