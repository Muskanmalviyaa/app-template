import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS, Fonts } from '../constants';

export const CustomHeader = ({
  title,
  showBackButton,
  showBack,
  onBackPress,
  rightIcon,
  showBadges = true,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const walletBalance = useSelector((state) => state.wallet?.balance ?? 0);
  const couponBalance = useSelector((state) => state.coupons?.couponBalance ?? 0);

  // Extend behind status bar to the top edge of the display with Android status bar fallback
  const topSafeArea = insets.top > 0 ? insets.top : (StatusBar.currentHeight || 0);
  const topPadding = topSafeArea + (SIZES.height * 0.012);

  const shouldShowBack =
    showBack !== undefined
      ? !!showBack
      : showBackButton !== undefined
      ? !!showBackButton
      : false;

  const handleBack = onBackPress || (() => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  });

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.transparent}
        translucent={true}
      />

      {/* Decorative Wave Background (matching Sarthi brand theme) */}
      <View style={styles.waveBackground} pointerEvents="none">
        <View style={styles.waveShape1} />
        <View style={styles.waveShape2} />
        <View style={styles.waveShape3} />
      </View>

      <View style={styles.contentRow}>
        <View style={styles.leftSection}>
          {shouldShowBack ? (
            <TouchableOpacity
              onPress={handleBack}
              hitSlop={{
                top: SIZES.w2,
                bottom: SIZES.w2,
                left: SIZES.w2,
                right: SIZES.w2,
              }}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-back"
                size={SIZES.w12}
                color={COLORS.white}
              />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {showBadges && (
            <View style={styles.badgesRow}>
              {/* Wallet Badge */}
              <View style={styles.badge}>
                <Ionicons
                  name="wallet-outline"
                  size={SIZES.w5}
                  color={COLORS.white}
                  style={styles.badgeIcon}
                />
                <Text style={styles.badgeText}>₹{walletBalance}</Text>
              </View>

              {/* Coupons Badge */}
              <View style={[styles.badge, styles.couponBadge]}>
                <Ionicons
                  name="ticket-outline"
                  size={SIZES.w5}
                  color={COLORS.amberBorder}
                  style={styles.badgeIcon}
                />
                <Text style={[styles.badgeText, styles.couponBadgeText]}>
                  {couponBalance}
                </Text>
              </View>
            </View>
          )}

          {rightIcon && <View style={styles.customRightIcon}>{rightIcon}</View>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDarkest,
    paddingBottom: SIZES.h0,
    paddingHorizontal: SIZES.width * 0.044,
    borderBottomLeftRadius: SIZES.width * 0.065,
    borderBottomRightRadius: SIZES.width * 0.065,
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  waveBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  waveShape1: {
    position: 'absolute',
    width: SIZES.width * 0.85,
    height: SIZES.height * 0.28,
    borderRadius: SIZES.width * 0.42,
    backgroundColor: COLORS.primaryBlue,
    opacity: 0.7,
    top: -SIZES.height * 0.07,
    right: -SIZES.width * 0.2,
    transform: [{ rotate: '-15deg' }],
  },
  waveShape2: {
    position: 'absolute',
    width: SIZES.width * 0.68,
    height: SIZES.height * 0.25,
    borderRadius: SIZES.width * 0.34,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.45,
    top: SIZES.height * 0.02,
    left: -SIZES.width * 0.2,
    transform: [{ rotate: '20deg' }],
  },
  waveShape3: {
    position: 'absolute',
    width: SIZES.width * 0.48,
    height: SIZES.width * 0.48,
    borderRadius: SIZES.width * 0.24,
    backgroundColor: COLORS.blueLight,
    opacity: 0.2,
    bottom: -SIZES.height * 0.035,
    right: SIZES.width * 0.05,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SIZES.w2,
  },
  backButton: {
    marginRight: SIZES.w2,
    width: SIZES.w18,
    height: SIZES.w18,
    borderRadius: SIZES.w18 / 2,
    backgroundColor: COLORS.whiteTransparent20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: SIZES.border,
    borderColor: COLORS.whiteTransparent30,
  },
  title: {
    flex: 1,
    flexShrink: 1,
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.width * 0.05,
    color: COLORS.white,
    letterSpacing: SIZES.w0 * 0.02,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.w0,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: SIZES.w2,
    paddingVertical: SIZES.height * 0.008,
    borderRadius: SIZES.w12,
    borderWidth: SIZES.border,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  couponBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.24)',
    borderColor: 'rgba(253, 230, 138, 0.35)',
  },
  badgeIcon: {
    marginRight: SIZES.width * 0.01,
  },
  badgeText: {
    fontFamily: Fonts.inter.bold,
    color: COLORS.white,
    fontSize: SIZES.w4,
  },
  couponBadgeText: {
    color: COLORS.amberBorder,
  },
  customRightIcon: {
    marginLeft: SIZES.w1,
  },
});

export default CustomHeader;
