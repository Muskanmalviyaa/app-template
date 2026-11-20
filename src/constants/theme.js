import { Dimensions } from 'react-native';
export { Fonts, Fontsa, Icons } from './constant';

const { width, height } = Dimensions.get('window');

export const SIZES = {
  // Full dimensions
  width, // e.g. 360
  height, // e.g. 800

  // Font sizes (8 - 24 px)
  w0: width * 0.0222,  // 8px
  w1: width * 0.025,   // 9px
  w2: width * 0.0278,  // 10px
  w3: width * 0.0306,  // 11px
  w4: width * 0.0333,  // 12px
  w5: width * 0.0361,  // 13px
  w6: width * 0.0389,  // 14px
  w7: width * 0.0417,  // 15px
  w8: width * 0.0444,  // 16px
  w9: width * 0.0472,  // 17px
  w10: width * 0.05,   // 18px
  w11: width * 0.0528, // 19px
  w12: width * 0.0556, // 20px
  w13: width * 0.0583, // 21px
  w14: width * 0.0611, // 22px
  w15: width * 0.0639, // 23px
  w16: width * 0.0667, // 24px

  // Larger sizes
  w17: width * 0.072,  // 26px
  w18: width * 0.089,  // 32px

  lgHeight: height * 0.03, // ≈24px
  h0: height * 0.0276, // ≈22px
  h1: height * 0.025, // ≈20px
  h2: height * 0.0225, // ≈18px
  h3: height * 0.02, // ≈16px
  h4: height * 0.0176, // ≈14px
  h5: height * 0.015, // ≈12px
  h6: height * 0.0125, // ≈10px
  // Radius and borders
  radius: 18,
  border: 1,

  // Spacing
  separator: height * 0.01, // ≈8px spacing
  padding: width * 0.0444, // ≈16px responsive padding

  // Typography helpers mapped to responsive width
  caption: width * 0.0333, // ≈12px (w4)
  body2: width * 0.0389,   // ≈14px (w6)
  body1: width * 0.0444,   // ≈16px (w8)
  base: width * 0.0222,    // ≈8px (w0)
  font: width * 0.0389,    // ≈14px (w6)
};

export const COLORS = {
  // 🔹 Luxury Royal Gold & Warm Metallic Brand Palette (Replacing legacy blue)
  primary: '#B8860B',          // Main Brand Burnished Gold (High-contrast on light & dark)
  primaryDark: '#8C6514',      // Deep Antique Bronze Gold
  primaryDarkest: '#12110E',   // Luxury Noir Black Header Background
  primaryBlue: '#C69214',      // Deep Action Gold (High contrast for text & badges)
  primaryLight: '#E5C158',     // Radiant Light Gold
  blueLight: '#E5C158',        // Soft Light Gold / Champagne
  blueSoft: '#E8D5A3',         // Pale Cream Gold
  primaryBorder: '#D4AF37',    // Golden Card / Input Border
  blueIce: '#FBF5E6',          // Pale Champagne Tint
  primaryTint: '#FAF3E0',      // Warm Cream Surface Background

  // 🔹 Dedicated Golden Palette (From Royal Gold Theme)
  gold: '#D4AF37',             // Royal Gold
  goldLight: '#E5C158',        // Bright Light Gold
  goldLighter: '#F3DE9A',      // Pale Champagne Gold
  goldPale: '#FDF7E7',         // Very Soft Gold Tint
  goldDark: '#B8860B',         // Deep Antique Gold
  goldDeep: '#8C6514',         // Burnished Bronze Gold
  goldBorder: '#CCA038',       // Gold Accent Border
  goldSurface: '#242019',      // Dark Golden Surface
  goldGradientStart: '#E5C158',// Gradient Gold Top
  goldGradientEnd: '#B8860B',  // Gradient Gold Bottom

  // 🔹 Dedicated Cream ("Cleme") & Ivory Palette
  cream: '#FDFBF7',            // Clean Royal Cream
  creamLight: '#FFFDF9',       // Pure Light Cream
  creamDark: '#F5EFE0',        // Warm Sand Cream
  creamBg: '#FAF5EA',          // Soft Cream Card Background
  creamBorder: '#EFE5CE',      // Warm Cream Border
  creamSurface: '#FBF7EE',     // Cream Tile Surface
  creamMuted: '#E5DCB8',       // Muted Antique Cream

  // 🔹 Luxury Dark & Noir Palette (Matches header & card backgrounds in design)
  darkBg: '#0E0D0B',           // Deep Noir App Background
  darkHeader: '#12110E',       // Dark Royal Header Background
  darkCard: '#1C1914',         // Dark Charcoal Card Background
  darkSurface: '#24201A',      // Dark Surface Container
  darkBorder: '#383023',       // Dark Bronze Border
  darkElevated: '#2A241C',     // Elevated Dark Card

  // 🔹 Green / Success / Emerald Palette
  forestDark: '#065F46',       // Deep Forest Green
  successDark: '#059669',      // Dark Emerald Green
  emerald: '#1B8F5A',          // Rich Emerald
  success: '#10B981',          // Success Emerald
  successLight: '#34D399',     // Mint Light
  successBorder: '#A7F3D0',    // Green Border
  mint: '#D1FAE5',             // Mint Tint
  greenLight: '#DCFCE7',       // Soft Light Green
  emeraldSoft: '#E6F9F0',      // Soft Emerald Tint
  successTint: '#ECFDF5',      // Light Success Tint
  greenBg: '#F0FDF4',          // Very Soft Green Background

  // 🔹 Amber / Secondary / Warm Palette
  warmDark: '#8B3F00',         // Deep Warm Brown
  amberText: '#8C6514',        // Rich Dark Gold Text
  goldDarker: '#7A5408',       // Dark Brown Gold
  amberDeep: '#B8860B',        // Deep Gold
  amberDark: '#D4AF37',        // Royal Gold
  secondary: '#E5C158',        // Secondary Vibrant Light Gold
  amber: '#D4AF37',            // Amber Gold
  yellow: '#F5D061',           // Bright Yellow Gold
  amberBorder: '#E5C158',      // Gold Border
  amberLight: '#FDF5DC',       // Soft Gold Tint
  amberBg: '#FDFBF7',          // Cream Background
  orangeSoft: '#F8DEAC',       // Light Warm Gold
  warmTint: '#FDF8EC',         // Warm Cream Tint

  // 🔹 Indigo & Purple Palette
  indigo: '#4F46E5',           // Rich Indigo
  purple: '#7C3AED',           // Royal Purple
  indigoBorder: '#C7D2FE',     // Indigo Border
  indigoLight: '#E0E7FF',      // Light Indigo
  indigoTint: '#EEF2FF',       // Very Light Indigo Tint
  purpleTint: '#F5F3FF',       // Very Light Purple Tint

  // 🔹 Red & Danger Palette
  dangerDark: '#B91C1C',       // Dark Red
  dangerRed: '#DC2626',        // Alert Red
  danger: '#EF4444',           // Standard Danger Red
  dangerMuted: '#FCA5A5',      // Muted Red
  dangerBorder: '#FECACA',     // Red Card/Input Border
  dangerSoft: '#FEE2E2',       // Soft Pink/Red Tint
  dangerLight: '#FEF2F2',      // Very Light Red Tint

  // 🔹 Neutrals, Warm Slates & Grays
  black: '#000000',            // Absolute Black
  textPrimary: '#1A1610',      // Primary Text (Warm Dark Noir)
  textDark: '#231E17',         // Very Dark Gray
  textBody: '#3D3528',         // Body Copy Warm Slate
  textMuted: '#6B5E4A',        // Muted Warm Gray
  textSecondary: '#8A7A64',    // Secondary Subdued Warm Text
  muted: '#A89B85',            // Placeholder Gray
  placeholder: '#A89B85',      // Input Placeholder
  slateBorder: '#E8DFC8',      // Warm Cream / Slate Border
  border: '#E5DEC9',           // Standard Warm Border
  borderLight: '#F4EFE2',      // Light Border
  slateLight: '#F9F5EC',       // Cool Slate Fill
  background: '#F7F2E7',       // App Background Cream / Warm Gray
  grayLight: '#F7F2E7',        // Gray Light Fill
  slateBg: '#FDFBF7',          // Cream Background
  bgLight: '#FAF5EA',          // Off-White Cream Card Background
  white: '#FFFFFF',            // Pure White
  surface: '#FFFFFF',          // Card & Modal Surface
  cardBg: '#FFFFFF',           // Card Background

  // 🔹 Transparencies & Overlays
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.65)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
  overlayLight: 'rgba(0, 0, 0, 0.25)',
  primaryAlpha10: 'rgba(212, 175, 55, 0.1)',
  goldAlpha10: 'rgba(212, 175, 55, 0.1)',
  goldAlpha20: 'rgba(212, 175, 55, 0.2)',
  goldAlpha30: 'rgba(212, 175, 55, 0.3)',
  successAlpha10: 'rgba(16, 185, 129, 0.1)',
  dangerAlpha10: 'rgba(239, 68, 68, 0.1)',
  whiteTransparent10: 'rgba(255, 255, 255, 0.1)',
  whiteTransparent15: 'rgba(255, 255, 255, 0.15)',
  whiteTransparent20: 'rgba(255, 255, 255, 0.2)',
  whiteTransparent25: 'rgba(255, 255, 255, 0.25)',
  whiteTransparent30: 'rgba(255, 255, 255, 0.3)',
  whiteTransparent70: 'rgba(255, 255, 255, 0.7)',
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};

