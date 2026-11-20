import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../constants';

export const CustomButton = ({
  title,
  onPress,
  type = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  isLoading = false,
  disabled = false,
  gradientColors,
  style,
  textStyle,
  icon,
  iconPosition = 'right',
  iconSize = 18,
}) => {
  const getButtonStyle = () => {
    if (disabled) return styles.disabledBg;
    if (type === 'outline') return styles.outlineBg;
    if (type === 'secondary') return styles.secondaryBg;
    if (type === 'danger') return styles.dangerBg;
    return styles.primaryBg;
  };

  const getShadowStyle = () => {
    if (disabled || type === 'outline') return null;
    if (type === 'secondary') return [styles.solidShadow, styles.secondaryShadow];
    if (type === 'danger') return [styles.solidShadow, styles.dangerShadow];
    return [styles.solidShadow, styles.primaryShadow];
  };

  const getTextColor = () => {
    if (disabled) return COLORS.muted;
    if (type === 'outline') return '#8C6514';
    if (type === 'danger') return COLORS.white;
    return '#1A140E';
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <Ionicons name={icon} size={iconSize} color={getTextColor()} />;
    }
    return icon;
  };

  const isOutline = type === 'outline';
  const customOverrideStyle = gradientColors && gradientColors[0]
    ? { backgroundColor: gradientColors[0], borderColor: gradientColors[0] }
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.touchable,
        getShadowStyle(),
        style,
      ]}
    >
      <View
        style={[
          styles.buttonInner,
          getButtonStyle(),
          customOverrideStyle,
          disabled && styles.disabledButton,
        ]}
      >
        {/* Top subtle gloss highlight for modern 3D depth */}
        {!isOutline && !disabled && (
          <View style={styles.topGloss} pointerEvents="none" />
        )}

        {/* Soft radial corner glow for gradient ambiance */}
        {!isOutline && !disabled && (
          <View style={styles.radialGlow} pointerEvents="none" />
        )}

        {isLoading ? (
          <ActivityIndicator size="small" color={getTextColor()} />
        ) : (
          <View style={styles.contentRow}>
            {iconPosition === 'left' && renderIcon()}
            <Text
              style={[
                styles.text,
                isOutline
                  ? styles.outlineText
                  : type === 'danger'
                  ? styles.dangerText
                  : styles.solidText,
                textStyle,
              ]}
            >
              {title}
            </Text>
            {iconPosition === 'right' && renderIcon()}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: SIZES.w6,
    backgroundColor: COLORS.transparent,
  },
  buttonInner: {
    paddingVertical: SIZES.height * 0.018,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.w6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.w0,
  },
  primaryBg: {
    backgroundColor: COLORS.primaryBlue,
    borderColor: COLORS.primaryDark,
    borderWidth: SIZES.border,
  },
  secondaryBg: {
    backgroundColor: COLORS.amberDark,
    borderColor: COLORS.amberDeep,
    borderWidth: SIZES.border,
  },
  dangerBg: {
    backgroundColor: COLORS.dangerRed,
    borderColor: COLORS.dangerDark,
    borderWidth: SIZES.border,
  },
  outlineBg: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.primaryBlue,
    borderWidth: SIZES.border * 1.5,
  },
  disabledBg: {
    backgroundColor: COLORS.blueSoft,
    borderColor: COLORS.blueSoft,
    borderWidth: SIZES.border,
  },
  solidShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: SIZES.w0,
    elevation: 4,
  },
  primaryShadow: {
    shadowColor: COLORS.primaryBlue,
  },
  secondaryShadow: {
    shadowColor: COLORS.amberDark,
  },
  dangerShadow: {
    shadowColor: COLORS.dangerRed,
  },
  topGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SIZES.border * 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  radialGlow: {
    position: 'absolute',
    top: -SIZES.height * 0.035,
    right: -SIZES.width * 0.05,
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderRadius: (SIZES.width * 0.3) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  disabledButton: {
    opacity: 0.8,
  },
  text: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body1,
    letterSpacing: SIZES.w0 * 0.04,
  },
  solidText: {
    color: '#1A140E',
  },
  dangerText: {
    color: COLORS.white,
  },
  outlineText: {
    color: '#8C6514',
  },
});

export default CustomButton;
