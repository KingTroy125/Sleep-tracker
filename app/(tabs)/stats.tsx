// app/(tabs)/stats.tsx
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import Animated, { 
  FadeInDown, 
  FadeIn,
  SlideInRight 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const { darkMode } = useTheme();

  const monthlyData = {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    datasets: [{
      data: [7.2, 6.8, 7.5, 6.5, 7.8, 7.2, 6.9],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
    }]
  };

  const qualityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [75, 82, 78, 85, 80, 77, 83],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
    }]
  };

  return (
    <SafeAreaView style={[styles.safeArea, darkMode && styles.darkMode]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View 
          entering={FadeIn.duration(500)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Sleep Statistics</Text>
          <View style={styles.moreIconContainer}>
            <Feather name="more-vertical" size={24} color="white" />
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.duration(600).delay(200)}
          style={[styles.overviewCard, darkMode && styles.darkModeCard]}
        >
          <Text style={styles.cardTitle}>Monthly Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7.2h</Text>
              <Text style={styles.statLabel}>Avg. Duration</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>82%</Text>
              <Text style={styles.statLabel}>Avg. Quality</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>11:30</Text>
              <Text style={styles.statLabel}>Avg. Bedtime</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>6:45</Text>
              <Text style={styles.statLabel}>Avg. Wake up</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.duration(600).delay(800)}
          style={[styles.insightsCard, darkMode && styles.darkModeCard]}
        >
          <Text style={styles.insightsTitle}>Sleep Insights</Text>
          <View style={styles.insightItem}>
            <Feather name="trending-up" size={20} color="#4CAF50" />
            <Text style={styles.insightText}>Sleep quality improved by 15% this week</Text>
          </View>
          <View style={styles.insightItem}>
            <Feather name="clock" size={20} color="#FFC107" />
            <Text style={styles.insightText}>Your best sleep quality is between 10 PM - 6 AM</Text>
          </View>
          <View style={styles.insightItem}>
            <Feather name="calendar" size={20} color="#2196F3" />
            <Text style={styles.insightText}>You've maintained a consistent sleep schedule for 5 days</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2D1854',
  },
  darkMode: {
    backgroundColor: '#1A0F33',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moreIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  darkModeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '45%',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  chartTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginLeft: -16,
  },
  insightsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  insightsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  insightText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
});