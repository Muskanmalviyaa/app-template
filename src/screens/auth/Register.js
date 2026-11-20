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
import { registerUser, clearAuthError } from '../../redux/slices/authSlice';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import MainView from '../../components/MainView';
import CustomHeader from '../../components/CustomHeader';

export const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth || {});

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (mobileNumber.trim().length !== 10) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    dispatch(clearAuthError());
    if (!validateForm()) return;
    dispatch(
      registerUser({
        name: fullName.trim(),
        phone: mobileNumber.trim(),
        email: email.trim(),
        password,
        referralCode: referralCode.trim(),
      })
    );
  };

  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Create Account"
        showBackButton={true}
        onBackPress={() => navigation?.goBack?.()}
        showBadges={false}
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerBlock}>
            <Text style={styles.welcomeTitle}>Join ATS</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign up to buy packages, earn coupons & enjoy member services
            </Text>
          </View>

          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.formContainer}>
            <CustomInput
              label="Full Name"
              placeholder="Enter your name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              icon="person-outline"
              error={errors.fullName}
            />

            <CustomInput
              label="Mobile Number"
              placeholder="10-digit mobile"
              value={mobileNumber}
              onChangeText={(text) => {
                setMobileNumber(text.replace(/[^0-9]/g, ''));
                if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: '' }));
              }}
              keyboardType="phone-pad"
              icon="call-outline"
              error={errors.mobileNumber}
            />

            <CustomInput
              label="Email (Optional)"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <CustomInput
              label="Password"
              placeholder="Create password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              secureTextEntry={true}
              icon="lock-closed-outline"
              error={errors.password}
            />

            <CustomInput
              label="Referral Code (Optional)"
              placeholder="Enter sponsor referral code"
              value={referralCode}
              onChangeText={setReferralCode}
              autoCapitalize="characters"
              icon="people-outline"
            />

            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Register"
                onPress={handleRegister}
                type="primary"
                isLoading={isLoading}
              />
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate?.('Login')}>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainView>
  );
};

export const RegisterScreen = Register;
export default Register;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  headerBlock: {
    marginTop: SIZES.h3,
    marginBottom: SIZES.h3,
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
