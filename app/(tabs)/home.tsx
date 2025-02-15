// app/(tabs)/home.tsx
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  FadeIn,
} from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function HomeScreen() {
  const [isTracking, setIsTracking] = useState(false);
  const progressWidth = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const chartData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [{
      data: [5, 7, 6, 8, 6, 7, 6],
      strokeWidth: 2
    }]
  };

  useEffect(() => {
    progressWidth.value = withSpring(78, {
      damping: 15,
      stiffness: 100
    });
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D1854" />
      
      <View style={styles.header}>
        <Text style={styles.date}>20 February</Text>
        <Feather name="more-vertical" size={24} color="white" />
      </View>

      <View style={styles.sleepCard}>
        <Text style={styles.dayText}>Monday</Text>
        <Text style={styles.sleepTimeText}>Sleep time: 10:30 PM - 07:15 AM</Text>
        <TouchableOpacity 
          style={styles.trackingButton}
          onPress={() => setIsTracking(!isTracking)}
        >
          <Text style={styles.trackingButtonText}>Start tracking</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>STATISTICS</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Quality</Text>
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
          <Text style={styles.statValue}>78 %</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>7h 50m</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1854',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  date: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sleepCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  sleepTimeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 20,
  },
  trackingButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackingButtonText: {
    color: '#2D1854',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 16,
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 16,
    height: 120,
    justifyContent: 'center',
  },
  chart: {
    marginLeft: -16,
  },
});