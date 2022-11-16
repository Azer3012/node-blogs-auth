import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import helpers from '../helpers/helpers'
import colors from '../values/colors'
import GoogleIcon from 'react-native-vector-icons/AntDesign'

const CustomButton = ({
    text,
    google=false,
    onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,google&&{backgroundColor:colors.googleBtn}]}>
        {google && <GoogleIcon style={styles.icon} name='google' color={colors.white}/> }
      <Text style={styles.text}>{text}</Text>
      
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button:{
        height:helpers.px(35),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.buttonBakground,
        
    },
    icon:{

        marginRight:helpers.px(10)
    },
    text:{
        ...helpers.fontStyle('Regular',16,colors.white)
    }
})