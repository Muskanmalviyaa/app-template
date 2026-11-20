import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import ConfirmModal from '../../components/ConfirmModal';
import MainView from '../../components/MainView';
import { deductCoupon } from '../../redux/slices/couponSlice';

const SERVICES = [
  { id: 'srv_1', name: 'Utility Bill Clearance', desc: 'Instant utility payment gateway access', icon: 'flash-outline' },
  { id: 'srv_2', name: 'Premium Legal Consultation', desc: '1-on-1 advisor consultation session', icon: 'briefcase-outline' },
  { id: 'srv_3', name: 'Digital Identity Verification', desc: 'Secure high-speed KYC verification', icon: 'shield-checkmark-outline' },
  { id: 'srv_4', name: 'Financial Assessment Report', desc: 'Comprehensive portfolio analytics', icon: 'analytics-outline' },
];

export const ServicesExplorer = ({ navigation }) => {
  const dispatch = useDispatch();
  const couponBalance = useSelector((state) => state.coupons?.couponBalance ?? 0);

  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleConfirmUnlock = async () => {
    if (!selectedService) return;

    if (couponBalance <= 0) {
      setModalVisible(false);
      Alert.alert(
        'No Coupons Available',
        'You have exhausted all your service coupons. Please purchase a package to get more coupons!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Buy Package', onPress: () => navigation?.navigate?.('Packages') },
        ]
      );
      return;
    }

    try {
      setUnlocking(true);
      dispatch(deductCoupon(1));
      setModalVisible(false);
      Alert.alert(
        'Service Unlocked! 🎉',
        `1 Coupon was deducted. You now have access to ${selectedService.name}. Remaining coupons: ${couponBalance - 1}`
      );
    } catch (e) {
      Alert.alert('Error', e?.message || 'Failed to unlock service');
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Services Explorer"
        showBackButton={false}
        showBadges={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Coupon Header Info */}
        <View style={styles.couponNotice}>
          <Ionicons name="ticket" size={24} color={COLORS.success} />
          <View style={styles.couponNoticeContent}>
            <Text style={styles.couponNoticeTitle}>
              Available Coupons: {couponBalance}
            </Text>
            <Text style={styles.couponNoticeSub}>
              Each service unlocks by consuming 1 coupon from your balance.
            </Text>
          </View>
        </View>

        {/* Services List */}
        {SERVICES.map((srv) => (
          <View key={srv.id} style={styles.serviceCard}>
            <View style={styles.serviceIconWrap}>
              <Ionicons name={srv.icon} size={28} color={COLORS.primary} />
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceName}>{srv.name}</Text>
              <Text style={styles.serviceDesc}>{srv.desc}</Text>
            </View>
            <CustomButton
              title="Unlock (1 Coupon)"
              type="primary"
              onPress={() => handleServiceClick(srv)}
              style={styles.unlockBtn}
            />
          </View>
        ))}
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        title="Spend 1 Coupon to Unlock?"
        description={
          selectedService
            ? `Do you want to spend 1 coupon to unlock ${selectedService.name}?`
            : ''
        }
        confirmText="Unlock Service"
        onConfirm={handleConfirmUnlock}
        onCancel={() => setModalVisible(false)}
        isLoading={unlocking}
        type="primary"
      />
    </MainView>
  );
};

export default ServicesExplorer;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  couponNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEF7EC',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: '#BCF0DA',
  },
  couponNoticeContent: {
    marginLeft: SIZES.w3,
    flex: 1,
  },
  couponNoticeTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.body1,
    color: '#03543F',
  },
  couponNoticeSub: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: '#046C4E',
    marginTop: 2,
  },
  serviceCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.h3,
  },
  serviceIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.w2,
  },
  serviceDetails: {
    marginBottom: SIZES.w3,
  },
  serviceName: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
  },
  serviceDesc: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    marginTop: SIZES.w1,
  },
  unlockBtn: {
    marginTop: SIZES.w1,
  },
});
