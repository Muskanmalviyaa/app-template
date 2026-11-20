import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import MainView from '../../components/MainView';

export const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Privacy Policy"
        showBackButton={true}
        onBackPress={() => navigation?.goBack?.()}
        showBadges={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.lastUpdated}>Last Updated: November 2026</Text>

          <Text style={styles.sectionHeading}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect personal information that you provide when registering on our platform, such as your full name, mobile number, email address, and referral/sponsor codes.
          </Text>

          <Text style={styles.sectionHeading}>2. Wallet & Transaction Information</Text>
          <Text style={styles.paragraph}>
            When you request funds via UPI or QR code scan, we record transaction reference IDs (UTR numbers), deposit amounts, and verification timestamps to maintain accurate ledger records.
          </Text>

          <Text style={styles.sectionHeading}>3. Usage of Information</Text>
          <Text style={styles.paragraph}>
            Your data is used to allocate service coupons upon package purchases, manage binary network commissions, track passive income, and deliver requested platform services.
          </Text>

          <Text style={styles.sectionHeading}>4. Data Security & Encryption</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard encryption protocols and secure storage mechanisms to protect your sensitive credentials, authentication tokens, and account information.
          </Text>

          <Text style={styles.sectionHeading}>5. Third-Party Disclosures</Text>
          <Text style={styles.paragraph}>
            We do not sell or trade your personal data. Information is only shared with authorized payment service providers solely to verify fund transfers.
          </Text>

          <Text style={styles.sectionHeading}>6. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions or concerns regarding our privacy practices, please contact our support team through the app.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};

export const PrivacyPolicy = PrivacyPolicyScreen;
export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lastUpdated: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.h3,
  },
  sectionHeading: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    marginTop: SIZES.w3,
    marginBottom: SIZES.w1,
  },
  paragraph: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SIZES.w2,
  },
});
