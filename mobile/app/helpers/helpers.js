// import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { Alert, Dimensions, PixelRatio, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message';

import colors from '../values/colors';


Array.prototype.filterSplit = function (cb) {
  const nonFiltereds = [];
  const filtereds = this.filter(item => {
    if (!cb(item)) nonFiltereds.push(item);
    return cb(item);
  })
  return [filtereds, nonFiltereds];
};

class Helpers {
  constructor() {
   
    this.isIOS = Platform.OS === 'ios';
    this.screenOptions = {
      headerShown: false,
      animation: 'slide_from_right',
      background: 'black',
    };
    this.screenWidth = Dimensions.get('window').width;
    this.screenHeight = Dimensions.get('window').height;
    this.statusBarHeight = getStatusBarHeight();
    this.firebaseDeviceToken = null;
    this.locale = "az";
    this.style = {
      center: () => ({ justifyContent: 'center', alignItems: 'center' }),
      border: (borderRadius, borderWidth, borderColor) => ({ borderRadius, borderWidth, borderColor }),
      size: (width, height, backgroundColor) => ({ width: this.px(width), height: this.px(height), backgroundColor }),
      square: (size, backgroundColor) => ({ width: this.px(size), height: this.px(size), backgroundColor }),
      circle: (radius, backgroundColor) => ({ width: this.px(radius), height: this.px(radius), borderRadius: this.px(radius), backgroundColor }),
      circumference: (radius, borderWidth, borderColor) => ({ width: this.px(radius), height: this.px(radius), borderRadius: radius, borderWidth, borderColor }),
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  uniqueArrayObjects(array, key) {
    return [...new Map(array.map(item => [item?.[key], item])).values()];
  }

  fontStyle(...args) {
    let [type = 'Regular', size = 16, color = colors.black] = args;
    return {
      fontFamily: this.isIOS
        ? `Roboto-${type ? type : 'Regular'}`
        : `Roboto-${type ? type : 'Regular'}`,
      fontSize: this.px(size),
      color: color,
    };
  }

  px(pixel) {
    const scale = this.screenWidth / 375;
    const newSize = pixel * scale;
    let result = Math.round(PixelRatio.roundToNearestPixel(newSize));
    result = this.isIOS ? result : result - 2;
    return pixel > 0 && result <= 0 ? 1 : result;
  }

  random(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

//   mobx(LOC) {
//     return inject('stores')(observer(LOC));
//   }

api(headers={}){
  return axios.create({
    baseURL:"http://192.168.100.35:8000/api/v1",
    timeout:7500,
    withCredentials:true,
    headers:{
      Accept:"application/json",
      'Content-Type':'application/json',
      token:'',
      ...headers,
    }
  })
}

  toast(message, type) {
    Toast.show({
      type: type || 'error',
      text1: message,
    });
  }

  handleError(error) {
    console.log({ error })
    // if (error.response.status === 422) {
    //   this.toast('Daxil edilən məlumat keçərli deyil', 'error');
    // }
    // if (error.response.status === 401) {
    //   userStore.logout(() => {
    //     navigationStore.navigation.navigate('HomePage');
    //   });
    // }

  }

  uniqid(length) {
    let chars = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ];
    let part1 = chars.sort(() => Math.random() - 0.5).join('');
    let part2 = chars.sort(() => Math.random() - 0.5).join('');
    return (part1 + part2).substring(5, length + 5);
  }

  uniqint(length) {
    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let parts = [];
    chars.forEach(() =>
      parts.push(chars.sort(() => Math.random() - 0.5).join('')),
    );
    return parts.join('').substring(5, length + 5);
  }

  arrayUniqueByKey(array, key) {
    return [...new Map(array.map(item => [item[key], item])).values()];
  }

  uniqueByNestedKey(array, key) {
    let keys = key.split(".");
    return [...new Map(array.map(item => {
      return [keys.reduce((first, second) => {
        return first && first[second];
      }, item), item]
    }
    )
    ).values()];
  }

  uniqueArray(data) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    return data?.filter(onlyUnique);
  }

  confirm(options = {}) {
    Alert.alert(
      options?.title || '',
      options?.text || '',
      [
        {
          text: options?.noButtonText || this.translate("decline"),
          style: 'cancel',
          color: 'red',
        },
        {
          text: options?.yesButtonText || this.translate("yes"),
          onPress: () => options?.onConfirm(),
        },
      ],
      {
        cancelable: options?.cancelable || true,
      },
    );
  }

  ucWords(str) {
    str = str.toLocaleLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
      return s.toLocaleUpperCase();
    });
  }



  translate(key) {
    return settingStore.translate(key);
  }

  getRelativeTime = () => {
    if (this.locale === "en")
      return ({
        past: '%s ago',
        s: "a sec",
        ss: '%s secs',
        m: '1 min',
        mm: '%d m',
        h: '1 h',
        hh: '%d h',
        d: '1 d',
        dd: '%d d',
        M: '1 mon',
        MM: '%d M',
        y: '1 y',
        yy: '%d Y'
      })
    else if (this.locale === "az")
      return ({
        past: '%s ',
        s: "1 san",
        ss: '%s san',
        m: '1 dəq',
        mm: '%d dəq',
        h: '1 saat',
        hh: '%d saat',
        d: '1 g',
        dd: '%d g',
        M: '1 ay',
        MM: '%d ay',
        y: '1 il',
        yy: '%d il'
      })
    else if (this.locale === "ru")
      return ({
        past: '%s до',
        s: '1 сек',
        ss: '%s сек',
        m: '1 мин',
        mm: '%d мин',
        h: '1 ч',
        hh: '%d ч',
        d: '1 д',
        dd: '%d д',
        M: '1 м',
        MM: '%d м',
        y: '1 г',
        yy: '%d г'
      })
  }
}

export default new Helpers();
