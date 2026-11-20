import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthError } from '../../redux/slices/authSlice';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import MainView from '../../components/MainView';
import CustomHeader from '../../components/CustomHeader';

export const Login = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth || {});

  const handleIdentifierChange = (text) => {
    setIdentifier(text);
    if (errors.identifier) {
      setErrors((prev) => ({ ...prev, identifier: '' }));
    }
    if (error) dispatch(clearAuthError());
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (error) dispatch(clearAuthError());
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmed = identifier.trim();
    if (!trimmed) {
      newErrors.identifier = 'Username, email or mobile is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    dispatch(clearAuthError());
    if (!validateForm()) return;
    dispatch(loginUser({ emailOrPhone: identifier.trim(), email: identifier.trim(), password }));
  };

  return (
    <MainView bottomSafe={true}>
      <CustomHeader title="Sign In" showBackButton={false} showBadges={false} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerBlock}>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>Sign in to access your wallet, packages & services</Text>
          </View>

          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.formContainer}>
            <CustomInput
              label="User ID / Mobile / Email"
              placeholder="Enter User ID or Email"
              value={identifier}
              onChangeText={handleIdentifierChange}
              icon="person-outline"
              error={errors.identifier}
              autoCapitalize="none"
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              icon="lock-closed-outline"
              error={errors.password}
            />

            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Sign In"
                onPress={handleLogin}
                type="primary"
                isLoading={isLoading}
              />
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate?.('Register')}>
                <Text style={styles.footerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainView>
  );
};

export const LoginScreen = Login;
export default Login;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  headerBlock: {
    marginTop: SIZES.h2,
    marginBottom: SIZES.h2,
  },
  welcomeTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h1,
    color: COLORS.textPrimary,
  },
  welcomeSubtitle: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    marginTop: SIZES.w1,
  },
  formContainer: {
    marginTop: SIZES.w2,
  },
  buttonWrapper: {
    marginTop: SIZES.h3,
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    padding: SIZES.w3,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.w3,
    borderWidth: 1,
    borderColor: '#F87171',
  },
  errorBannerText: {
    fontFamily: Fonts.inter.medium,
    color: '#B91C1C',
    fontSize: SIZES.body2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.h2,
  },
  footerText: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
  footerLink: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body2,
    color: COLORS.primary,
  },
});
