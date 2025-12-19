/**
 * Theme Configuration
 * Comprehensive design system with colors, typography, spacing, and more
 */

import { Platform } from 'react-native';

// Color Palette
const palette = {
  // Primary Colors
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  // Secondary Colors
  secondary: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
  },
  // Accent Colors
  accent: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800',
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },
  // Neutral Colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Semantic Colors
  success: {
    light: '#81C784',
    main: '#4CAF50',
    dark: '#388E3C',
  },
  warning: {
    light: '#FFB74D',
    main: '#FF9800',
    dark: '#F57C00',
  },
  error: {
    light: '#E57373',
    main: '#F44336',
    dark: '#D32F2F',
  },
  info: {
    light: '#64B5F6',
    main: '#2196F3',
    dark: '#1976D2',
  },
};

// Theme Colors
export const Colors = {
  light: {
    // Base
    text: '#11181C',
    textSecondary: '#687076',
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    
    // Brand
    primary: palette.primary[600],
    primaryLight: palette.primary[400],
    primaryDark: palette.primary[800],
    
    secondary: palette.secondary[600],
    secondaryLight: palette.secondary[400],
    secondaryDark: palette.secondary[800],
    
    accent: palette.accent[600],
    accentLight: palette.accent[400],
    accentDark: palette.accent[800],
    
    // UI Elements
    border: palette.neutral[300],
    borderLight: palette.neutral[200],
    card: '#FFFFFF',
    cardSecondary: '#F8F9FA',
    
    // Interactive
    tint: palette.primary[600],
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: palette.primary[600],
    
    // Semantic
    success: palette.success.main,
    successLight: palette.success.light,
    warning: palette.warning.main,
    warningLight: palette.warning.light,
    error: palette.error.main,
    errorLight: palette.error.light,
    info: palette.info.main,
    infoLight: palette.info.light,
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    // Base
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#0A0A0A',
    backgroundSecondary: '#151718',
    
    // Brand
    primary: palette.primary[400],
    primaryLight: palette.primary[300],
    primaryDark: palette.primary[600],
    
    secondary: palette.secondary[400],
    secondaryLight: palette.secondary[300],
    secondaryDark: palette.secondary[600],
    
    accent: palette.accent[400],
    accentLight: palette.accent[300],
    accentDark: palette.accent[600],
    
    // UI Elements
    border: palette.neutral[700],
    borderLight: palette.neutral[800],
    card: '#1A1A1A',
    cardSecondary: '#151718',
    
    // Interactive
    tint: palette.primary[400],
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: palette.primary[400],
    
    // Semantic
    success: palette.success.light,
    successLight: palette.success.main,
    warning: palette.warning.light,
    warningLight: palette.warning.main,
    error: palette.error.light,
    errorLight: palette.error.main,
    info: palette.info.light,
    infoLight: palette.info.main,
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

// Typography
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Font Sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

// Font Weights
export const FontWeights = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// Spacing Scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
};

// Border Radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Animation Durations
export const Durations = {
  fast: 150,
  normal: 300,
  slow: 500,
};
