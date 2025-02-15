// app/index.tsx
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withRepeat, 
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  const fastRotation = useSharedValue(0);
  const slowRotation = useSharedValue(0);

  useEffect(() => {
    // Fast hand (1 second)
    fastRotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Slow hand (40 seconds)
    slowRotation.value = withRepeat(
      withTiming(360, {
        duration: 40000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    const timer = setTimeout(async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        setIsLoading(false);
        if (hasLaunched === null) {
          router.replace('/onboarding');
        } else {
          router.replace('/(tabs)/home');
        }
      } catch (error) {
        router.replace('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fastHandStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${fastRotation.value}deg` }],
  }));

  const slowHandStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${slowRotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.overlay}>
        <View style={styles.clockWrapper}>
          <View style={styles.clockContainer}>
            <View style={styles.clock}>
              <Animated.View style={[styles.hand, fastHandStyle]} />
              <Animated.View style={[styles.hand, slowHandStyle]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1854',
    width: width,
    height: height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D1854',
  },
  clockWrapper: {
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockContainer: {
    transform: [{ scale: 3 }], // Made clock larger
  },
  clock: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  hand: {
    position: 'absolute',
    width: 1,
    backgroundColor: 'white',
    height: 10,
    left: '50%',
    bottom: '50%',
    transformOrigin: 'center bottom',
  },
});