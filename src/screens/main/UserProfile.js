import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import MainView from '../../components/MainView';
import { logoutUser } from '../../redux/slices/authSlice';

export const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user || {});
  const walletBalance = useSelector((state) => state.wallet?.balance ?? 0);
  const couponBalance = useSelector((state) => state.coupons?.couponBalance ?? 0);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <MainView bottomSafe={true}>
      <CustomHeader title="My Profile" showBackButton={false} showBadges={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.userName}>{user?.name || user?.username || 'Member User'}</Text>
          <Text style={styles.userSub}>{user?.email || user?.phone || 'member@atsapp.com'}</Text>
          {user?.referralCode ? (
            <View style={styles.referralBadge}>
              <Text style={styles.referralText}>Referral ID: {user.referralCode}</Text>
            </View>
          ) : null}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Coupons</Text>
            <Text style={styles.statValue}>{couponBalance}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Wallet</Text>
            <Text style={styles.statValue}>₹{Number(walletBalance).toLocaleString()}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation?.navigate?.('BinaryNetwork')}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons name="git-network-outline" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuText}>Binary Network & Team</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation?.navigate?.('AddFunds')}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons name="wallet-outline" size={20} color={COLORS.secondary} />
            </View>
            <Text style={styles.menuText}>Wallet & Fund Requests</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation?.navigate?.('Packages')}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons name="cube-outline" size={20} color={COLORS.success} />
            </View>
            <Text style={styles.menuText}>My Packages & Subscriptions</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation?.navigate?.('PrivacyPolicy')}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation?.navigate?.('TermsCondition')}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons name="document-text-outline" size={20} color={COLORS.textSecondary} />
            </View>
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutWrapper}>
          <CustomButton
            title="Log Out"
            type="danger"
            icon="log-out-outline"
            iconPosition="left"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

export const Profile = UserProfile;
export default UserProfile;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.h3,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.w3,
  },
  userName: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h2,
    color: COLORS.textPrimary,
  },
  userSub: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    marginTop: SIZES.w1,
  },
  referralBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: SIZES.w4,
    paddingVertical: SIZES.w1,
    borderRadius: 20,
    marginTop: SIZES.w3,
  },
  referralText: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body2,
    color: '#92400E',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.w4,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.h3,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    marginTop: SIZES.w1,
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: SIZES.h2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.w4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.w3,
  },
  menuText: {
    flex: 1,
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
  },
  logoutWrapper: {
    marginTop: SIZES.h3,
  },
});
