import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import MainView from '../../components/MainView';

export const TermsConditionScreen = ({ navigation }) => {
  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Terms & Conditions"
        showBackButton={true}
        onBackPress={() => navigation?.goBack?.()}
        showBadges={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.lastUpdated}>Effective Date: November 2026</Text>

          <Text style={styles.sectionHeading}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing or using this mobile application, you agree to be bound by these terms. If you do not agree, please do not use the application.
          </Text>

          <Text style={styles.sectionHeading}>2. Account & Eligibility</Text>
          <Text style={styles.paragraph}>
            Users must provide accurate, current, and complete registration information. You are solely responsible for safeguarding your login credentials and for any activity under your account.
          </Text>

          <Text style={styles.sectionHeading}>3. Wallet, Deposits & Package Purchases</Text>
          <Text style={styles.paragraph}>
            Funds deposited via QR scan are subject to verification. Users may use wallet balances to purchase service packages. Package purchases allocate service coupons according to package tier rules.
          </Text>

          <Text style={styles.sectionHeading}>4. Service Coupon Consumption</Text>
          <Text style={styles.paragraph}>
            Each service access requires consuming 1 coupon from your active balance. If coupons are exhausted, service access is restricted until an additional package is purchased.
          </Text>

          <Text style={styles.sectionHeading}>5. Network, Affiliate & Income Rules</Text>
          <Text style={styles.paragraph}>
            Binary network leads and referral incomes are computed based on active volume and system policies. Any fraudulent referral activity will result in account suspension.
          </Text>

          <Text style={styles.sectionHeading}>6. Modifications to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time. Continued usage of the app following any changes constitutes acceptance of the new terms.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};

export const TermsCondition = TermsConditionScreen;
export const TermsAndConditions = TermsConditionScreen;
export default TermsConditionScreen;

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
