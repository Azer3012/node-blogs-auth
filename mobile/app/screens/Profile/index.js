import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Layout from '../../Layout';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';
import {useDispatch, useSelector} from 'react-redux';

import Chevron from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../redux/features/userSlice';

const Profile = () => {
  
  
  const navigation=useNavigation()
  const dispatch=useDispatch()
  
const handleLogout=async()=>{
  try {
    const response=await helpers.api().post('/logout')
    console.log(response);
    dispatch(setUser(null))
    navigation.navigate('login')
  } catch (error) {
    console.log(error);
  }
}
  
  
  return (
    <Layout type={'general'} headerText={'Profile'} hasBackButton={false}>
      <View style={styles.container}>
        
      <TouchableOpacity  onPress={()=>navigation.navigate('editProfile')} style={styles.setting}>
        <Text style={styles.settingText}>Edit Profile</Text>
        <Chevron name='chevron-right' size={18}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.setting}>
        <Text style={styles.settingText}>Language</Text>
        <Chevron name='chevron-right' size={18}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.setting}>
        <Text style={styles.settingText}>Log out</Text>
        <Chevron name='chevron-right' size={18}/>
      </TouchableOpacity>
        
      </View>
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: helpers.px(16),
    paddingHorizontal: helpers.px(16),
  },
  header:{
    alignItems:'center'
  },
  imageBtn:{
    width:helpers.px(70),
    height:helpers.px(70),
    borderRadius:helpers.px(50),
    position:'relative'

  },
  icon:{
    position:'absolute',
    right:helpers.px(10),
    bottom:helpers.px(10),
  },
  image:{
    width:helpers.px(70),
    height:helpers.px(70),
    borderRadius:helpers.px(50)
  },
  fullName:{
    ...helpers.fontStyle('Regular',16)
  },
  line:{
    height:helpers.px(1),
    backgroundColor:colors.inputBorder
  },
  setting:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:helpers.px(8),
    borderBottomWidth:1,
    borderColor:colors.inputBorder
  },
  settingText:{
    ...helpers.fontStyle('Regular',16)
  }

});
