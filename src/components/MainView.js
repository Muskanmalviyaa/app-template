import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '../constants';

const MainView = ({ children, mainStyle, transparent = false, statusBarTransparent = false, bottomSafe = true, theme = 'light', dark = false }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const isStatusBarTransparent = transparent || statusBarTransparent;
  const paddingTop = isStatusBarTransparent ? 0 : insets.top ?? 0;
  const paddingBottom = bottomSafe ? insets.bottom ?? 0 : 0;
  const paddingLeft = bottomSafe ? insets.left ?? 0 : 0;
  const paddingRight = bottomSafe ? insets.right ?? 0 : 0;

  const isDark = theme === 'dark' || dark;
  const backgroundColor = transparent
    ? 'transparent'
    : COLORS.background;

  const statusBarStyle = (isDark || transparent || statusBarTransparent) ? 'light-content' : 'dark-content';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop, paddingBottom, paddingLeft, paddingRight },
        mainStyle,
      ]}
    >
      {isFocused && (
        <StatusBar
          translucent={isStatusBarTransparent}
          backgroundColor={isStatusBarTransparent ? 'transparent' : backgroundColor}
          barStyle={statusBarStyle}
        />
      )}
      {children}
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});