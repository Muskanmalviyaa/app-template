export const Icons = {
  logo: require('../assets/icons/logo.png'),
};

const roboto = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  semibold: 'Roboto-SemiBold',
  bold: 'Roboto-Bold',
  extrabold: 'Roboto-ExtraBold',
  black: 'Roboto-Black',
  light: 'Roboto-Regular',
};

const inter = {
  regular: 'Inter_24pt-Regular',
  medium: 'Inter_24pt-Medium',
  semibold: 'Inter_24pt-SemiBold',
  bold: 'Inter_24pt-Bold',
  regular18: 'Inter_18pt-Regular',
  bold28: 'Inter_28pt-Bold',
};

export const Fonts = {
  // Flat Roboto primary mappings
  regular: roboto.regular,
  medium: roboto.medium,
  semibold: roboto.semibold,
  bold: roboto.bold,
  extrabold: roboto.extrabold,
  black: roboto.black,
  light: roboto.light,

  // Flat Inter mappings
  interRegular: inter.regular,
  interMedium: inter.medium,
  interSemiBold: inter.semibold,
  interBold: inter.bold,
  inter18Regular: inter.regular18,
  inter28Bold: inter.bold28,

  // Namespaced objects for clear semantic access
  roboto,
  inter,
};

// Backward-compatible alias
export const Fontsa = Fonts;
