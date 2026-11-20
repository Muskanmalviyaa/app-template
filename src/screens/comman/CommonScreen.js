import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES, Fonts, Icons, SHADOWS } from '../../constants';

export const CommonScreen = ({ navigation, onFinish, duration = 3000 }) => {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 1000,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    if (onFinish) {
      const timer = setTimeout(() => {
        onFinish();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onFinish, logoScale, logoOpacity, contentFade]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} translucent={true} />

      <View style={styles.centerBox}>
        <Animated.View
          style={[
            styles.logoWrap,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          {Icons?.logo ? (
            <Image source={Icons.logo} style={styles.logoImage} resizeMode="contain" />
          ) : (
            <View style={styles.placeholderLogo}>
              <Text style={styles.logoText}>ATS</Text>
            </View>
          )}
        </Animated.View>

        <Animated.View style={[styles.contentWrap, { opacity: contentFade }]}>
          <Text style={styles.appTitle}>ATS Platform</Text>
          <Text style={styles.appTagline}>Services • Packages • Coupons • Network</Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.bottomWrap, { opacity: contentFade }]}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Animated.View>
    </View>
  );
};

export const CommanScreen = CommonScreen;
export const SplashScreen = CommonScreen;
export default CommonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.h3,
    ...SHADOWS.large,
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  placeholderLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h1,
    color: COLORS.primary,
  },
  contentWrap: {
    alignItems: 'center',
  },
  appTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h1,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  appTagline: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: '#E0E7FF',
    marginTop: SIZES.w1,
  },
  bottomWrap: {
    position: 'absolute',
    bottom: SIZES.h2,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.caption,
    color: '#C7D2FE',
  },
});
