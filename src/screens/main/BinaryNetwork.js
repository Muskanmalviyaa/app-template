import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import MainView from '../../components/MainView';
import { fetchBinaryTree } from '../../redux/slices/incomeSlice';

export const BinaryNetwork = ({ navigation }) => {
  const dispatch = useDispatch();
  const { binaryTree } = useSelector((state) => state.income || {});

  useEffect(() => {
    dispatch(fetchBinaryTree());
  }, [dispatch]);

  return (
    <MainView bottomSafe={true}>
      <CustomHeader
        title="Binary Network"
        showBackButton={true}
        onBackPress={() => navigation?.goBack?.()}
        showBadges={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Network Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Team Performance</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>Left Team BV</Text>
              <Text style={styles.statNumber}>{binaryTree?.leftBv || 0}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>Right Team BV</Text>
              <Text style={styles.statNumber}>{binaryTree?.rightBv || 0}</Text>
            </View>
          </View>
        </View>

        {/* Tree Overview Container */}
        <View style={styles.treeSection}>
          <Text style={styles.treeSectionTitle}>Network Hierarchy</Text>
          <View style={styles.nodeCard}>
            <View style={styles.avatarNode}>
              <Ionicons name="person" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.nodeName}>My Root Account</Text>
            <Text style={styles.nodeStatus}>Active</Text>
          </View>

          {/* Child Legs */}
          <View style={styles.legsRow}>
            <View style={styles.legCard}>
              <Text style={styles.legTitle}>Left Leg</Text>
              <Text style={styles.legCount}>Members: {binaryTree?.leftCount || 0}</Text>
            </View>
            <View style={styles.legCard}>
              <Text style={styles.legTitle}>Right Leg</Text>
              <Text style={styles.legCount}>Members: {binaryTree?.rightCount || 0}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </MainView>
  );
};

export default BinaryNetwork;

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.h3,
  },
  statsTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.w3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
  statNumber: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h2,
    color: COLORS.primary,
    marginTop: SIZES.w1,
  },
  treeSection: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  treeSectionTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.h3,
  },
  nodeCard: {
    alignItems: 'center',
    padding: SIZES.w3,
    borderRadius: SIZES.radius,
    backgroundColor: '#F3F4F6',
    marginBottom: SIZES.h3,
  },
  avatarNode: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.w2,
  },
  nodeName: {
    fontFamily: Fonts.roboto.bold,
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
  },
  nodeStatus: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.caption,
    color: COLORS.success,
    marginTop: 2,
  },
  legsRow: {
    flexDirection: 'row',
    gap: SIZES.w3,
  },
  legCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: SIZES.radius,
    padding: SIZES.w3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  legTitle: {
    fontFamily: Fonts.inter.bold,
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
  },
  legCount: {
    fontFamily: Fonts.inter.regular,
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: SIZES.w1,
  },
});
