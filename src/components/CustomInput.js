import React, { forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../constants';

export const CustomInput = forwardRef(({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  iconSize = 20,
  iconColor = COLORS.textSecondary,
  rightIcon,
  rightIconSize = 20,
  rightIconColor = COLORS.textSecondary,
  onRightIconPress,
  error,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  style,
  inputStyle,
  autoCapitalize = 'none',
  autoCorrect = false,
  textContentType,
  ...rest
}, ref) => {
  const renderIcon = (ic, size, color) => {
    if (!ic) return null;
    if (typeof ic === 'string') {
      return <Ionicons name={ic} size={size} color={color} />;
    }
    return ic;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
          multiline && styles.multilineContainer,
        ]}
      >
        {icon && (
          <View style={styles.iconContainer}>
            {renderIcon(icon, iconSize, error ? COLORS.danger : iconColor)}
          </View>
        )}

        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          textContentType={textContentType}
          scrollEnabled={multiline ? true : false}
          style={[styles.input, inputStyle]}
          {...rest}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress}
            activeOpacity={0.7}
          >
            {renderIcon(rightIcon, rightIconSize, rightIconColor)}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
});

CustomInput.displayName = 'CustomInput';

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding,
    width: '100%',
  },
  label: {
    fontFamily: Fonts.inter.semibold,
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginBottom: SIZES.height * 0.007,
    letterSpacing: SIZES.w0 * 0.05,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgLight,
    borderWidth: SIZES.border,
    borderColor: COLORS.border,
    borderRadius: SIZES.w6,
    paddingHorizontal: SIZES.padding,
    minHeight: SIZES.height * 0.065,
  },
  inputError: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  multilineContainer: {
    minHeight: SIZES.height * 0.1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: SIZES.w2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: SIZES.w0,
    padding: SIZES.w0 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
    paddingVertical: SIZES.height * 0.015,
  },
  errorText: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.caption,
    color: COLORS.danger,
    marginTop: SIZES.w0 / 2,
    marginLeft: SIZES.w0 / 2,
  },
});

export default CustomInput;
