import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { GradientBlob } from '../ui/GradientBlob';

const { width, height } = Dimensions.get('window');

type AuthMode = 'login' | 'signup';

export const AuthScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // HTML colors mapping
    const themeColors = {
        background: isDark ? '#191022' : '#f7f6f8',
        text: isDark ? '#FFFFFF' : '#141118',
        surface: isDark ? '#2d1f3f' : '#ffffff',
        border: isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
        primary: '#7f13ec',
        textSecondary: isDark ? '#9ca3af' : '#6b7280',
        inputBg: isDark ? 'rgba(45, 31, 63, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        inputBorder: isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
    };

    const [mode, setMode] = useState<AuthMode>('login');
    const [name, setName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Toggle mode handler
    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    const handleSubmit = async () => {
        if (!identifier || !password || (mode === 'signup' && !name)) {
            Alert.alert('Missing Information', 'Please fill in all required fields.');
            return;
        }

        setIsLoading(true);

        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            // Navigate to onboarding
            router.replace('/onboarding');
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            {/* Background Blobs - Positioning matches HTML roughly */}
            <GradientBlob
                id="top-left"
                color="rgba(127, 19, 236, 0.4)"
                style={styles.blobTopLeft}
            />
            <GradientBlob
                id="top-right"
                color="rgba(96, 165, 250, 0.2)" // Blue-ish
                style={styles.blobTopRight}
            />
            <GradientBlob
                id="bottom-left"
                color="rgba(168, 85, 247, 0.2)" // Purple-ish
                style={styles.blobBottomLeft}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.contentContainer}>

                        {/* Header Section */}
                        <View style={styles.header}>
                            {/* Logo Container */}
                            <View style={styles.logoWrapper}>
                                <View style={styles.logoBgGlow} />
                                <View style={[styles.logoContainer, { backgroundColor: isDark ? '#2d1f3f' : 'white', borderColor: themeColors.border }]}>
                                    <Image
                                        source={require('@/assets/ccp_app/logo1-topaz-lighting-upscale-4x.png')}
                                        style={styles.logoImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <Text style={[styles.title, { color: themeColors.text }]}>
                                {mode === 'login' ? 'ChopChopPay' : 'Join ChopChopPay'}
                            </Text>
                            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
                                {mode === 'login'
                                    ? 'Welcome back! Please enter your details.'
                                    : 'Create an account to start splitting bills.'}
                            </Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.formSection}>

                            {/* Name Input (Signup Only) */}
                            {mode === 'signup' && (
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: themeColors.textSecondary }]}>FULL NAME</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputIconContainer}>
                                            <MaterialIcons name="person-outline" size={20} color="#9ca3af" />
                                        </View>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                {
                                                    backgroundColor: themeColors.inputBg,
                                                    borderColor: themeColors.inputBorder,
                                                    color: themeColors.text
                                                }
                                            ]}
                                            placeholder="John Doe"
                                            placeholderTextColor="#9ca3af"
                                            value={name}
                                            onChangeText={setName}
                                            autoCapitalize="words"
                                        />
                                    </View>
                                </View>
                            )}

                            {/* Email/Phone Input */}
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: themeColors.textSecondary }]}>EMAIL OR PHONE</Text>
                                <View style={styles.inputWrapper}>
                                    <View style={styles.inputIconContainer}>
                                        <MaterialIcons name="email" size={20} color="#9ca3af" />
                                    </View>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: themeColors.inputBg,
                                                borderColor: themeColors.inputBorder,
                                                color: themeColors.text
                                            }
                                        ]}
                                        placeholder="user@example.com"
                                        placeholderTextColor="#9ca3af"
                                        value={identifier}
                                        onChangeText={setIdentifier}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: themeColors.textSecondary }]}>PASSWORD</Text>
                                <View style={styles.inputWrapper}>
                                    <View style={styles.inputIconContainer}>
                                        <MaterialIcons name="lock" size={20} color="#9ca3af" />
                                    </View>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: themeColors.inputBg,
                                                borderColor: themeColors.inputBorder,
                                                color: themeColors.text,
                                                paddingRight: 48 // Extra padding for eye icon
                                            }
                                        ]}
                                        placeholder="••••••••"
                                        placeholderTextColor="#9ca3af"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <MaterialIcons
                                            name={showPassword ? "visibility" : "visibility-off"}
                                            size={20}
                                            color="#9ca3af"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {mode === 'login' && (
                                    <TouchableOpacity style={styles.forgotPassword}>
                                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                        </View>

                        {/* Actions Section */}
                        <View style={styles.actionsSection}>
                            {/* Main Action Button */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={isLoading}
                                activeOpacity={0.9}
                                style={[styles.buttonShadow]}
                            >
                                <LinearGradient
                                    colors={['#7f13ec', '#a64aff']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.primaryButton}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <View style={styles.buttonContent}>
                                            <Text style={styles.primaryButtonText}>
                                                {mode === 'login' ? 'Log In' : 'Create Account'}
                                            </Text>
                                            <MaterialIcons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
                                        </View>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Switch Mode Footer */}
                        <View style={styles.switchModeContainer}>
                            <Text style={[styles.footerText, { fontSize: 14 }]}>
                                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            </Text>
                            <TouchableOpacity onPress={toggleMode}>
                                <Text style={[styles.footerLink, { color: themeColors.primary }]}>
                                    {mode === 'login' ? 'Sign Up' : 'Log In'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Divider */}
                        <View style={styles.dividerSection}>
                            <View style={[styles.dividerLine, { backgroundColor: themeColors.border }]} />
                            <Text style={[styles.dividerText, { backgroundColor: themeColors.background, color: themeColors.textSecondary }]}>
                                OR CONTINUE WITH
                            </Text>
                        </View>

                        {/* Social Buttons */}
                        <View style={styles.socialSection}>
                            <TouchableOpacity style={[styles.socialButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                                <Ionicons name="logo-apple" size={24} color={isDark ? "white" : "black"} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.socialButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                                <Ionicons name="logo-google" size={24} color={themeColors.text} />
                                {/* Note: Google logo is usually colored, but sticking to mono/text color for simplicity unless SVG needed */}
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.socialButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                                <MaterialIcons name="face" size={24} color={isDark ? "#d1d5db" : "#374151"} />
                            </TouchableOpacity>
                        </View>

                        {/* Footer Terms */}
                        <Text style={styles.footerText}>
                            By continuing, you agree to our <Text style={styles.linkText}>Terms</Text> & <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 480, // max-w-md
        width: '100%',
        alignSelf: 'center',
    },
    // Blobs
    blobTopLeft: {
        position: 'absolute',
        top: '-15%',
        left: '-25%',
        width: '150%',
        height: '70%',
        opacity: 1, // mix-blend-multiply not easily supported in RN
        transform: [{ scale: 1 }],
    },
    blobTopRight: {
        position: 'absolute',
        top: '5%',
        right: '-15%',
        width: 288, // w-72
        height: 288,
        opacity: 0.5,
    },
    blobBottomLeft: {
        position: 'absolute',
        bottom: '20%',
        left: '-15%',
        width: 320, // w-80
        height: 320,
        opacity: 0.5,
    },

    // Header
    header: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%',
    },
    logoWrapper: {
        position: 'relative',
        marginBottom: 24,
    },
    logoBgGlow: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(127, 19, 236, 0.2)',
        borderRadius: 9999,
        transform: [{ scale: 1.1 }],
    },
    logoContainer: {
        width: 80, // w-20
        height: 80,
        borderRadius: 32, // rounded-[2rem]
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        overflow: 'hidden',
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 28, // text-[28px]
        fontWeight: '800', // font-extrabold
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        maxWidth: 280,
    },

    // Form
    formSection: {
        width: '100%',
        marginBottom: 32,
        gap: 20, // gap-5
    },
    inputGroup: {
        width: '100%',
        gap: 6,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5, // tracking-wider
        marginLeft: 4,
    },
    inputWrapper: {
        position: 'relative',
        height: 56, // h-14
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: '100%',
        borderRadius: 16, // rounded-2xl
        borderWidth: 1,
        paddingLeft: 48, // pl-12
        paddingRight: 16,
        fontSize: 16,
        fontWeight: '500',
    },
    inputIconContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    forgotPasswordText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#7f13ec', // text-primary
    },

    // Actions
    actionsSection: {
        width: '100%',
        gap: 12, // gap-3
        marginBottom: 24,
    },
    buttonShadow: {
        shadowColor: '#7f13ec',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 9999,
    },
    primaryButton: {
        height: 56, // h-14
        borderRadius: 9999, // rounded-full
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 8,
    },
    buttonIcon: {
        marginLeft: 4,
    },
    secondaryButton: {
        height: 56,
        borderRadius: 9999,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Divider
    dividerSection: {
        position: 'relative',
        width: '100%',
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
    },
    dividerText: {
        paddingHorizontal: 12,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Socials
    socialSection: {
        flexDirection: 'row',
        gap: 20, // gap-5
        justifyContent: 'center',
        marginBottom: 24,
    },
    socialButton: {
        width: 56, // w-14
        height: 56,
        borderRadius: 9999,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    // Switch Mode
    switchModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    footerLink: {
        fontWeight: 'bold',
        marginLeft: 4,
    },

    // Footer
    footerText: {
        fontSize: 12,
        color: '#9ca3af', // text-gray-400
        textAlign: 'center',
        fontWeight: '500',
    },
    linkText: {
        textDecorationLine: 'underline',
    },
});
