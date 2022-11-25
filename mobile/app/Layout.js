import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from './values/colors';
import helpers from './helpers/helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import { setUser } from './redux/features/userSlice';

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
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.user);
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

  const getUser = async () => {
    setFetching(true)
    try {
      const response=await helpers.api().get('/getUser')
      console.log({response});
      dispatch(setUser(response.data))
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false)
    }
  };

  useEffect(()=>{
    getUser()
  },[])
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
  headerText: {
    ...helpers.fontStyle('Bold', 18),
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  backButton: {
    borderWidth: helpers.px(1.5),
    borderColor: colors.black,
    borderRadius: helpers.px(8),
    width: helpers.px(24),
    height: helpers.px(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    left: helpers.px(16),
    position: 'absolute',
  },
});
