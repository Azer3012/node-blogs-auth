import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
  Text,
} from 'react-native';
import helpers from '../helpers/helpers';
import colors from '../values/colors';
import {isIphoneX} from 'react-native-iphone-x-helper';
import ImageSkeleton from './ImageSkeleton';

const MIN_SCALE = 0;
const MAX_SCALE = 1;

const AnimatedTabButton = ({
  icon,
  label,
  addStyle,
  main,
  disable,
  isImage,
  ...props
}) => {
  const onPress = props.onPress;
  const isSelected = props.accessibilityState.selected;
  const scale = React.useRef(new Animated.Value(1)).current;
  const translateY = React.useRef(new Animated.Value(1)).current;
  const borderScale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    (!disable || !main) &&
      Animated.timing(scale, {
        toValue: isSelected ? MAX_SCALE : MIN_SCALE,
        useNativeDriver: true,
        duration: isSelected ? 300 : 100,
      }).start();

    Animated.timing(borderScale, {
      toValue: isSelected ? MAX_SCALE : MIN_SCALE,
      useNativeDriver: true,
      duration: isSelected ? 300 : 100,
      easing: Easing.linear,
    }).start();
  }, [isSelected]);

  const inverseScale = scale.interpolate({
    inputRange: [MIN_SCALE, MAX_SCALE],
    outputRange: [MAX_SCALE, MIN_SCALE],
  });

  return (
    <TouchableOpacity style={[styles.parentBody]} onPress={onPress}>
      <View style={styles.parentView}>
        <Animated.View
          style={{
            transform: [{translateY}],
            height: SIZE,
          }}>
          <ImageSkeleton
            source={icon}
            isTabImage={true}
            isSelected={
              !isImage && {
                tintColor:
                  !main || disable
                    ? isSelected
                      ? colors.main
                      : colors.black
                    : null,
              }
            }
            resizeMode={isImage ? 'cover' : 'contain'}
            style={[
              {
                ...styles.common,
                transform: [{scale}],
                ...addStyle,
              },
              !!isImage && {borderRadius: codio.px(50)},
              !isImage && {
                tintColor:
                  !main || disable
                    ? isSelected
                      ? colors.main
                      : colors.black
                    : null,
              },
            ]}></ImageSkeleton>
          <ImageSkeleton
            resizeMode={isImage ? 'cover' : 'contain'}
            source={icon}
            isTabImage={true}
            isSelected={
              !isImage && {
                tintColor:
                  !main || disable
                    ? isSelected
                      ? colors.main
                      : colors.black
                    : null,
              }
            }
            style={[
              {
                ...styles.common,
                transform: [{scale: inverseScale}],
                ...addStyle,
              },
              !isImage && {tintColor: !main || disable ? colors.black : null},
              !!isImage && {borderRadius: codio.px(50)},
            ]}></ImageSkeleton>
        </Animated.View>
        <Animated.Text
          style={{
            ...styles.text,
            ...helpers.fontStyle(
              'Regular',
              10,
              isSelected ? colors.main : colors.black,
            ),
          }}>
          {label}
        </Animated.Text>
      </View>
      <Animated.View
        style={[
          {
            transform: [
              {
                scaleX: borderScale,
              },
            ],
          },
          styles.bottomLine,
        ]}
      />
      
    </TouchableOpacity>
  );
};

const SIZE = helpers.px(20);

const styles = StyleSheet.create({
  parentBody: {
    flex: 1,
  },
  bottomLine: {
    borderBottomColor: colors.main,
    borderBottomWidth: helpers.isIOS ? helpers.px(4) : helpers.px(5),
    borderRadius: helpers.px(10),
    bottom: isIphoneX() ? -14 : 0,
    position: 'absolute',
    width: '100%',
  },
  parentView: {
    // top: codio.isIOS ? codio.px(2) : codio.px(8),
  },
  common: {
    position: 'absolute',
    width: helpers.px(18),
    height: helpers.px(18),
    alignSelf: 'center',
  },
  text: {
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: helpers.px(5),
  },

  notification: {
    padding: 3,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    ...helpers.fontStyle('Regular', 10, colors.white),
  },
});

export default React.memo(AnimatedTabButton)