import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from './values/colors';
import helpers from './helpers/helpers';
import Entypo from 'react-native-vector-icons/Entypo'

const Layout = ({
  headerText,
  children,
  hasHeader = true,
  style,
  type,
  imageHeight,
  backgorundImage,
  backButtonHasCustomCallback = false,
  backButtonCustomCallback,
  hasBackButton = true,
  hasLinkButton = true,
  linkButtonAction,
  loader = false,
  violetBorder,
  isService = false,
  customHeaderTextStyle,
}) => {
  const navigation = useNavigation();
  const colorAnim = useRef(new Animated.Value(0)).current;
  let layout = {
    general: (
      <>
        <View style={[styles.safeAreaStyle]} />
        {hasHeader && (
          <View style={[styles.header, violetBorder && styles.violetBorder]}>
            {!!hasBackButton && (
              <View style={styles.backIcon}>
                <TouchableOpacity
                  hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                  style={styles.backButton}
                  onPress={() => {
                    if (backButtonHasCustomCallback) {
                      backButtonCustomCallback();
                    } else {
                      navigation.goBack();
                    }
                  }}>
                  <Entypo name="chevron-left" size={helpers.px(16)} />
                </TouchableOpacity>
              </View>
            )}
            <Text style={[styles.headerText, customHeaderTextStyle]}>
              {headerText}
            </Text>
          </View>
        )}
        {!!children && children}
      </>
    ),
  };
  return (
    <>
      <Animated.View style={[styles.animatedHeader]} />

      {!!type && layout[type]}
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeAreaStyle: {
    flex: 0,
    zIndex: 30,
    backgroundColor: colors.white,
    height: helpers.statusBarHeight,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    borderTopWidth: 0,
    height: helpers.px(64),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    zIndex: 30,
    elevation: 1,
  },
});
