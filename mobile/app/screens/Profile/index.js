import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Layout from '../../Layout';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';
import {useSelector} from 'react-redux';
import CemeraIcon from 'react-native-vector-icons/Feather';
import Chevron from 'react-native-vector-icons/EvilIcons'

const Profile = () => {
  const user = useSelector(state => state.user.currentUser);
  console.log(user);
  const settings=[
    {id:1,text:'Edit Profile'},
    {id:2,text:'Language'},
    {id:3,text:'Log out'},
  ]

  const renderItem=({item})=>{
    return(
      <TouchableOpacity style={styles.setting}>
        <Text style={styles.settingText}>{item.text}</Text>
        <Chevron name='chevron-right' size={18}/>
      </TouchableOpacity>
    )
  }
  const Seperator=()=>{
    return(
      <View style={styles.line}></View>
    )
  }
  return (
    <Layout type={'general'} headerText={'Profile'} hasBackButton={false}>
      <View style={styles.container}>
        
        
        <FlatList
        data={settings}
        keyExtractor={item=>item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={<Seperator/>}
        />
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
    paddingVertical:helpers.px(8)
  },
  settingText:{
    ...helpers.fontStyle('Regular',16)
  }

});
