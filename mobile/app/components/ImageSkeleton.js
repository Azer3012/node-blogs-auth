import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import {Animated, View} from 'react-native';
  import FastImage from 'react-native-fast-image';
  import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
  import colors from '../values/colors';
  
  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
  const USE_NATIVE_DRIVER = true;
  const MIN_SCALE = 0;
  const MAX_SCALE = 1;
  
  const ImageSkeleton = ({
    source,
    style,
    resizeMode = 'cover',
    speed = 2500,
    isTabImage = false,
    isSkeleton = false,
    isSelected = null,
    ...props
  }) => {
    const [loaded, setLoaded] = useState(false);
    const scale = useRef(new Animated.Value(1)).current;
  
    const generateStyle = useCallback(
      style => {
        const generatedStyle = [...style];
        for (let i = 0; i < generatedStyle.length; i++) {
          const element = generatedStyle[i];
          delete element?.transform;
        }
        return generateStyle;
      },
      [isTabImage],
    );
  
    const newStyle = useMemo(
      () => (isTabImage ? generateStyle(style) : style),
      [isTabImage, JSON.stringify(style)],
    );
  
    useEffect(() => {
      if (loaded) {
        Animated.spring(scale, {
          toValue: MAX_SCALE,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
      } else {
        scale.setValue(MIN_SCALE);
      }
    }, [loaded]);
  
    return (
      <View>
        <AnimatedFastImage
          onLoadStart={() => setLoaded(false)}
          onLoadEnd={() => setLoaded(true)}
          source={source}
          {...isSelected}
          style={[
            {
              transform: [{scale}],
            },
            style,
          ]}
          resizeMode={FastImage.resizeMode[resizeMode]}
          {...props}
        />
        {(!loaded || isSkeleton) && (
          <View style={{position: 'absolute'}}>
            <SkeletonPlaceholder backgroundColor={colors.skeleton} speed={speed}>
              <SkeletonPlaceholder.Item {...newStyle} />
            </SkeletonPlaceholder>
          </View>
        )}
      </View>
    );
  };
  
  export default memo(ImageSkeleton);