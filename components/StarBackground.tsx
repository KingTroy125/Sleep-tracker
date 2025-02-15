import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence,
  withTiming,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

const NUM_STARS = 50;

const StarComponent = ({ delay, x, y, size }) => {
  const starOpacity = useAnimatedStyle(() => {
    const animation = withRepeat(
      withSequence(
        withDelay(
          delay,
          withTiming(0.2, { duration: 1000, easing: Easing.linear })
        ),
        withTiming(1, { duration: 1000, easing: Easing.linear })
      ),
      -1,
      true
    );

    return {
      opacity: animation
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'white',
        },
        starOpacity,
      ]}
    />
  );
};

export const StarBackground = () => {
  const stars = Array.from({ length: NUM_STARS }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3000,
  }));

  return (
    <View style={styles.container}>
      {stars.map((star) => (
        <StarComponent
          key={star.id}
          delay={star.delay}
          x={star.x}
          y={star.y}
          size={star.size}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});