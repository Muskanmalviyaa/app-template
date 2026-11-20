import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import MainView from '../../components/MainView';
import { fundRequestCreateApi } from '../../redux/actions/walletAction';

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];

export const AddFunds = ({ navigation }) => {
  const [amount, setAmount] = useState('1000');
  const [utr, setUtr] = useState('');
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.wallet?.balance ?? 0);

  const handleSubmit = async () => {
    const num = Number(amount);
    if (!num || num <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid deposit amount');
      return;
    }
    if (!utr.trim()) {
      Alert.alert('Transaction Reference', 'Please enter the transaction reference / UTR number');
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(
        fundRequestCreateApi({
          amount: num,
          transactionId: utr.trim(),
          remarks: remarks.trim(),
        })
      );
      Alert.alert('Success', 'Fund request submitted successfully! Funds will reflect after verification.', [
        { text: 'OK', onPress: () => navigation?.goBack?.() },
      ]);
    } catch (e) {
      Alert.alert('Error', e?.message || 'Failed to submit fund request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Add Funds"
        showBackButton={true}
        onBackPress={() => navigation?.goBack?.()}
        showBadges={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Wallet Balance</Text>
          <Text style={styles.balanceValue}>₹{Number(walletBalance).toLocaleString()}</Text>
        </View>

        {/* QR Code Instructions Card */}
        <View style={styles.qrCard}>
          <View style={styles.qrHeader}>
            <Ionicons name="qr-code-outline" size={32} color={COLORS.primary} />
            <Text style={styles.qrTitle}>Scan & Pay via UPI</Text>
          </View>
          <Text style={styles.qrDesc}>
            Scan company UPI QR code using any UPI app (GPay, PhonePe, Paytm). After payment, enter the amount and 12-digit UTR/Ref number below.
          </Text>
        </View>

        {/* Amount Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Select or Enter Amount (₹)</Text>
          <View style={styles.quickGrid}>
            {QUICK_AMOUNTS.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.quickChip,
                  amount === String(amt) && styles.quickChipActive,
                ]}
                onPress={() => setAmount(String(amt))}
              >
                <Text
                  style={[
                    styles.quickChipText,
                    amount === String(amt) && styles.quickChipTextActive,
                  ]}
                >
                  ₹{amt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomInput
            label="Deposit Amount"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            icon="cash-outline"
          />

          <CustomInput
            label="UTR / Transaction Reference No."
            placeholder="12-digit UPI reference number"
            value={utr}
            onChangeText={setUtr}
            icon="receipt-outline"
          />

          <CustomInput
            label="Notes / Remarks (Optional)"
            placeholder="Optional reference remark"
            value={remarks}
            onChangeText={setRemarks}
            icon="document-text-outline"
          />

          <View style={styles.btnWrapper}>
            <CustomButton
              title="Submit Fund Request"
              type="primary"
              onPress={handleSubmit}
              isLoading={submitting}
            />
          </View>
        </View>
      </ScrollView>
    </MainView>
  );
};

export default AddFunds;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  balanceCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: SIZES.h3,
  },
  balanceLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
  balanceValue: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h1,
    color: COLORS.textPrimary,
    marginTop: SIZES.w1,
  },
  qrCard: {
    backgroundColor: '#EEF2FF',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.w3,
    marginBottom: SIZES.w2,
  },
  qrTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.primary,
  },
  qrDesc: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  formSection: {
    marginTop: SIZES.w1,
  },
  sectionLabel: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    marginBottom: SIZES.w2,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: SIZES.w2,
    marginBottom: SIZES.h3,
  },
  quickChip: {
    flex: 1,
    paddingVertical: SIZES.w2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  quickChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  quickChipText: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
  },
  quickChipTextActive: {
    color: '#FFFFFF',
  },
  btnWrapper: {
    marginTop: SIZES.h3,
  },
});
