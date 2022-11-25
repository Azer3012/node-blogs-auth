import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import SearchIcon from 'react-native-vector-icons/FontAwesome'
import helpers from '../helpers/helpers'
import colors from '../values/colors'

const SearchInput = ({
    value,
    setValue
}) => {
    
  return (
    <View style={[styles.container,value ? {borderColor:colors.borderFocus}:null]}>
      <SearchIcon name='search' color={colors.inputBorder} size={16}/>
      <TextInput autoCapitalize='none'
        autoComplete='off'
        autoCorrect={false} onChangeText={(value)=>setValue(value)}   style={styles.input} placeholder='Search'/>
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:colors.inputBorder,
        height:helpers.px(40),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:helpers.px(10),
       
    },
    input:{
        flex:1,
        paddingLeft:helpers.px(10),
        height:'100%',
        ...helpers.fontStyle('Regular', 14),
        
        
    }
})