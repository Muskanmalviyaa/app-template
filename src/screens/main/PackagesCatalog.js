import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import ConfirmModal from '../../components/ConfirmModal';
import MainView from '../../components/MainView';
import { fetchPackages, buyPackageApi } from '../../redux/slices/packageSlice';

const DEFAULT_PACKAGES = [
  { id: 'pkg_1', title: 'Starter Package', price: 1000, coupons: 10, description: 'Get 10 Service Coupons + 100 BV' },
  { id: 'pkg_2', title: 'Bronze Package', price: 2500, coupons: 25, description: 'Get 25 Service Coupons + 250 BV' },
  { id: 'pkg_3', title: 'Silver Package', price: 5000, coupons: 50, description: 'Get 50 Service Coupons + 500 BV' },
  { id: 'pkg_4', title: 'Gold Package', price: 10000, coupons: 100, description: 'Get 100 Service Coupons + 1000 BV' },
];

export const PackagesCatalog = ({ navigation }) => {
  const dispatch = useDispatch();
  const remotePackages = useSelector((state) => state.packages?.packages || []);
  const walletBalance = useSelector((state) => state.wallet?.balance ?? 0);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const packageList = remotePackages.length > 0 ? remotePackages : DEFAULT_PACKAGES;

  const handleBuyClick = (pkg) => {
    setSelectedPackage(pkg);
    setModalVisible(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPackage) return;
    if (walletBalance < selectedPackage.price) {
      setModalVisible(false);
      Alert.alert(
        'Insufficient Wallet Balance',
        `Your wallet balance (₹${walletBalance}) is lower than the package price (₹${selectedPackage.price}). Please add funds first.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Funds', onPress: () => navigation?.navigate?.('AddFunds') },
        ]
      );
      return;
    }

    try {
      setBuying(true);
      await dispatch(buyPackageApi({ packageId: selectedPackage.id, price: selectedPackage.price }));
      setModalVisible(false);
      Alert.alert(
        'Package Purchased!',
        `Successfully bought ${selectedPackage.title}! ${selectedPackage.coupons} Coupons have been credited to your account.`
      );
    } catch (e) {
      Alert.alert('Purchase Failed', e?.message || 'Could not complete package purchase');
    } finally {
      setBuying(false);
    }
  };

  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Packages Catalog"
        showBackButton={false}
        showBadges={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerNotice}>
          <Text style={styles.bannerNoticeTitle}>Package → Coupons → Service</Text>
          <Text style={styles.bannerNoticeText}>
            Every package purchase yields coupons that let you unlock platform services!
          </Text>
        </View>

        {packageList.map((pkg) => (
          <View key={pkg.id || pkg._id} style={styles.packageCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.pkgTitle}>{pkg.title || pkg.name}</Text>
              <View style={styles.couponBadge}>
                <Text style={styles.couponBadgeText}>{pkg.coupons || 10} Coupons</Text>
              </View>
            </View>

            <Text style={styles.pkgPrice}>₹{Number(pkg.price).toLocaleString()}</Text>
            <Text style={styles.pkgDesc}>{pkg.description || `Buy for ₹${pkg.price} -> Get 10 Coupons`}</Text>

            <CustomButton
              title={`Buy for ₹${pkg.price}`}
              type="primary"
              onPress={() => handleBuyClick(pkg)}
              style={styles.buyBtn}
            />
          </View>
        ))}
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        title="Confirm Purchase"
        description={
          selectedPackage
            ? `Spend ₹${selectedPackage.price} from your wallet to purchase ${selectedPackage.title} and receive ${selectedPackage.coupons} coupons?`
            : ''
        }
        confirmText="Confirm & Buy"
        onConfirm={handleConfirmPurchase}
        onCancel={() => setModalVisible(false)}
        isLoading={buying}
        type="primary"
      />
    </MainView>
  );
};

export default PackagesCatalog;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  bannerNotice: {
    backgroundColor: '#FEF3C7',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  bannerNoticeTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.body1,
    color: '#92400E',
  },
  bannerNoticeText: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: '#78350F',
    marginTop: SIZES.w1,
  },
  packageCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.h3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.w1,
  },
  pkgTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
  },
  couponBadge: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: SIZES.w3,
    paddingVertical: SIZES.w1,
    borderRadius: 20,
  },
  couponBadgeText: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.caption,
    color: '#03543F',
  },
  pkgPrice: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h1,
    color: COLORS.primary,
    marginVertical: SIZES.w1,
  },
  pkgDesc: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    marginBottom: SIZES.w3,
  },
  buyBtn: {
    marginTop: SIZES.w1,
  },
});
