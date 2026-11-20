import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS, Fonts } from '../constants';
import CustomButton from './CustomButton';

export const ConfirmModal = ({
  visible,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'primary', // 'primary' | 'secondary' | 'danger'
  isLoading = false,
  icon,
  confirmIcon,
}) => {
  // Clean confirm text to avoid trailing text arrows/emojis that wrap awkwardly
  const cleanConfirmText = String(confirmText || 'Confirm')
    .replace(/[→➜➔➝➛➤]/g, '')
    .trim();

  // Smart default icon if not explicitly passed
  const renderTopIcon = () => {
    if (icon) {
      return <View style={styles.iconContainer}>{icon}</View>;
    }

    if (type === 'secondary') {
      return (
        <View style={[styles.iconContainer, styles.iconBoxAmber]}>
          <Ionicons name="wallet-outline" size={SIZES.w10} color={COLORS.secondary} />
        </View>
      );
    }

    if (type === 'danger') {
      return (
        <View style={[styles.iconContainer, styles.iconBoxDanger]}>
          <Ionicons name="alert-circle-outline" size={SIZES.w10} color={COLORS.dangerRed} />
        </View>
      );
    }

    return (
      <View style={[styles.iconContainer, styles.iconBoxPrimary]}>
        <Ionicons name="shield-checkmark-outline" size={SIZES.w10} color={COLORS.primaryBlue} />
      </View>
    );
  };

  const defaultConfirmIcon = confirmIcon || (type === 'secondary' ? 'wallet-outline' : 'checkmark-circle-outline');

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {renderTopIcon()}

          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}

          <View style={styles.buttonRow}>
            {cancelText ? (
              <TouchableOpacity
                onPress={onCancel}
                disabled={isLoading}
                style={styles.cancelBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            ) : null}

            <CustomButton
              title={cleanConfirmText}
              onPress={onConfirm}
              type={type}
              icon={defaultConfirmIcon}
              iconPosition="right"
              iconSize={SIZES.w4}
              isLoading={isLoading}
              style={styles.confirmBtn}
              textStyle={styles.confirmBtnText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.w6,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius * 1.2,
    padding: SIZES.w6,
    width: '100%',
    maxWidth: SIZES.width * 0.9,
    alignItems: 'center',
    borderWidth: SIZES.border,
    borderColor: COLORS.border,
    ...SHADOWS.large,
  },
  iconContainer: {
    marginBottom: SIZES.w3,
  },
  iconBoxAmber: {
    width: SIZES.width * 0.16,
    height: SIZES.width * 0.16,
    borderRadius: (SIZES.width * 0.16) / 2,
    backgroundColor: COLORS.amberLight,
    borderWidth: 1.5,
    borderColor: COLORS.amberBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDanger: {
    width: SIZES.width * 0.16,
    height: SIZES.width * 0.16,
    borderRadius: (SIZES.width * 0.16) / 2,
    backgroundColor: COLORS.dangerLight,
    borderWidth: 1.5,
    borderColor: COLORS.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxPrimary: {
    width: SIZES.width * 0.16,
    height: SIZES.width * 0.16,
    borderRadius: (SIZES.width * 0.16) / 2,
    backgroundColor: COLORS.primaryTint,
    borderWidth: 1.5,
    borderColor: COLORS.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.height * 0.006,
  },
  description: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: SIZES.w6,
    marginBottom: SIZES.h3,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.w3,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: SIZES.height * 0.015,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.slateLight,
    borderWidth: SIZES.border,
    borderColor: COLORS.slateBorder,
  },
  cancelText: {
    fontFamily: Fonts.inter.semibold,
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  confirmBtn: {
    flex: 1,
  },
  confirmBtnText: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.caption,
  },
});

export default ConfirmModal;
