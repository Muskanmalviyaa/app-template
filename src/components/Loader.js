import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';
import { COLORS, SIZES, Fonts } from '../constants';

export const Loader = ({ visible = true, message = 'Loading...', fullScreen = false }) => {
  if (!visible) return null;

  if (fullScreen) {
    return (
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size="small" color={COLORS.primary} />
      {message ? <Text style={styles.inlineMessage}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    padding: 24,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    fontFamily: Fonts.inter.medium,
    marginTop: SIZES.w4,
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
  },
  inlineContainer: {
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inlineMessage: {
    fontFamily: Fonts.inter.regular,
    marginLeft: SIZES.w0,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
});

export default Loader;

