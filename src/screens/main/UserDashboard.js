import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import MainView from '../../components/MainView';
import { fetchUserProfile } from '../../redux/slices/authSlice';
import { fetchMyPurchases } from '../../redux/slices/packageSlice';
import { fetchFundHistory } from '../../redux/slices/walletSlice';

export const UserDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.wallet?.balance ?? 0);
  const couponBalance = useSelector((state) => state.coupons?.couponBalance ?? 0);
  const activePackages = useSelector((state) => state.packages?.activePackages ?? []);
  const user = useSelector((state) => state.auth?.user ?? null);
  const totalEarnings = useSelector((state) => state.income?.totalEarnings ?? 0);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.allSettled([
      dispatch(fetchUserProfile()),
      dispatch(fetchMyPurchases()),
      dispatch(fetchFundHistory()),
    ]);
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Dashboard"
        showBackButton={false}
        showBadges={true}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome greeting card */}
        <View style={styles.greetingCard}>
          <Text style={styles.greetingTitle}>
            Hello, {user?.name || user?.username || 'Member'}! 👋
          </Text>
          <Text style={styles.greetingSubtitle}>
            Welcome to your service ecosystem. Access packages and coupons below.
          </Text>
        </View>

        {/* Metric Cards Grid */}
        <View style={styles.metricsGrid}>
          {/* Wallet Balance */}
          <View style={[styles.metricCard, styles.walletBorder]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="wallet-outline" size={24} color={COLORS.secondary} />
            </View>
            <Text style={styles.metricLabel}>Wallet Balance</Text>
            <Text style={styles.metricValue}>₹{Number(walletBalance).toLocaleString()}</Text>
            <TouchableOpacity
              style={styles.cardAction}
              onPress={() => navigation?.navigate?.('AddFunds')}
            >
              <Text style={styles.cardActionText}>+ Add Funds</Text>
            </TouchableOpacity>
          </View>

          {/* Service Coupons */}
          <View style={[styles.metricCard, styles.couponBorder]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="ticket-outline" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.metricLabel}>Total Coupons</Text>
            <Text style={styles.metricValue}>{couponBalance}</Text>
            <TouchableOpacity
              style={styles.cardAction}
              onPress={() => navigation?.navigate?.('Services')}
            >
              <Text style={styles.cardActionText}>Use Service</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          {/* Active Packages */}
          <View style={[styles.metricCard, styles.packageBorder]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="cube-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.metricLabel}>Active Packages</Text>
            <Text style={styles.metricValue}>{activePackages?.length || 0}</Text>
            <TouchableOpacity
              style={styles.cardAction}
              onPress={() => navigation?.navigate?.('Packages')}
            >
              <Text style={styles.cardActionText}>Buy More</Text>
            </TouchableOpacity>
          </View>

          {/* Earnings / Network */}
          <View style={[styles.metricCard, styles.incomeBorder]}>
            <View style={styles.metricIconWrap}>
              <Ionicons name="trending-up-outline" size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.metricLabel}>Total Income</Text>
            <Text style={styles.metricValue}>₹{Number(totalEarnings).toLocaleString()}</Text>
            <TouchableOpacity
              style={styles.cardAction}
              onPress={() => navigation?.navigate?.('BinaryNetwork')}
            >
              <Text style={styles.cardActionText}>View Network</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Action Shortcuts */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsList}>
            <CustomButton
              title="Spend 1 Coupon (Explore Services)"
              type="primary"
              icon="grid-outline"
              iconPosition="left"
              onPress={() => navigation?.navigate?.('Services')}
              style={styles.actionBtn}
            />
            <CustomButton
              title="Purchase Package (Get Coupons)"
              type="secondary"
              icon="cube-outline"
              iconPosition="left"
              onPress={() => navigation?.navigate?.('Packages')}
              style={styles.actionBtn}
            />
            <CustomButton
              title="Add Funds via QR Code"
              type="outline"
              icon="qr-code-outline"
              iconPosition="left"
              onPress={() => navigation?.navigate?.('AddFunds')}
              style={styles.actionBtn}
            />
          </View>
        </View>
      </ScrollView>
    </MainView>
  );
};

export const Dashboard = UserDashboard;
export default UserDashboard;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  greetingCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  greetingTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h2,
    color: COLORS.textPrimary,
  },
  greetingSubtitle: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    marginTop: SIZES.w1,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.w3,
    marginBottom: SIZES.w3,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.w4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  walletBorder: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  couponBorder: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  packageBorder: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  incomeBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  metricIconWrap: {
    marginBottom: SIZES.w2,
  },
  metricLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
  metricValue: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    marginVertical: SIZES.w1,
  },
  cardAction: {
    marginTop: SIZES.w1,
  },
  cardActionText: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body2,
    color: COLORS.primary,
  },
  sectionBlock: {
    marginTop: SIZES.h3,
  },
  sectionTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.w3,
  },
  actionsList: {
    gap: SIZES.w3,
  },
  actionBtn: {
    marginBottom: SIZES.w2,
  },
});
