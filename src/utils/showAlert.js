import { Alert } from 'react-native';

/**
 * showAlert — Centralized Alert utility (legacy fallback)
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  PREFERRED: Use `useModal()` from `src/contexts/ModalContext` in components.
 *     This file remains for non-component contexts (services, utils) where
 *     React hooks cannot be used.
 *
 * In-component usage (preferred):
 *   const { showAlert, showConfirm, showError } = useModal();
 *
 * Non-component usage (services, saga effects):
 *   import { showAlert, showConfirm, showError } from '../utils/showAlert';
 *
 * Variants:
 *   showAlert(title, message, onOk)        — simple OK dialog
 *   showConfirm(title, message, onYes)     — Yes/Cancel dialog
 *   showError(message)                     — Error dialog
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Simple OK alert.
 * @param {string} title
 * @param {string} message
 * @param {Function} [onOk] — called when user presses OK
 */
export const showAlert = (title, message, onOk) => {
    Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: onOk, style: 'default' }],
        { cancelable: true }
    );
};

/**
 * Confirmation dialog with Yes and Cancel actions.
 * @param {string} title
 * @param {string} message
 * @param {Function} onYes — called when user confirms
 * @param {Function} [onNo] — called when user cancels (optional)
 * @param {string} [yesText] — label for confirm button (default: 'Yes')
 * @param {string} [noText] — label for cancel button (default: 'Cancel')
 */
export const showConfirm = (title, message, onYes, onNo, yesText = 'Yes', noText = 'Cancel') => {
    Alert.alert(
        title,
        message,
        [
            { text: noText, onPress: onNo, style: 'cancel' },
            { text: yesText, onPress: onYes, style: 'default' },
        ],
        { cancelable: true }
    );
};

/**
 * Generic error alert.
 * @param {string} message — error description
 * @param {Function} [onOk] — optional callback
 */
export const showError = (message, onOk) => {
    Alert.alert('Error', message, [{ text: 'OK', onPress: onOk }], { cancelable: true });
};
