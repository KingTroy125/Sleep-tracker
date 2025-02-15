import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { 
  FadeIn,
  SlideInRight,
  SlideOutLeft 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Track Your Sleep',
    subtitle: 'Monitor your sleep patterns and improve your rest',
    emoji: '🌙'
  },
  {
    id: 2,
    title: 'Sleep Analytics',
    subtitle: 'Get detailed insights about your sleep quality',
    emoji: '📊'
  },
  {
    id: 3,
    title: 'Smart Alarm',
    subtitle: 'Wake up at the optimal time in your sleep cycle',
    emoji: '⏰'
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleDone();
    }
  };

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error saving first launch state:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={SlideInRight}
        exiting={SlideOutLeft}
        style={styles.slideContainer}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{slides[currentIndex].emoji}</Text>
        </View>
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>
      </Animated.View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1854',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emojiContainer: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#2D1854',
    fontSize: 16,
    fontWeight: 'bold',
  },
});