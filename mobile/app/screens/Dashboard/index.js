import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import helpers from '../../helpers/helpers';
import Layout from '../../Layout';
import colors from '../../values/colors';
import SearchInput from './_components/SearchInput';
import CreateIcon from 'react-native-vector-icons/AntDesign'

const Dashboard = () => {
  const [value,setValue]=useState('')
  const getBlogs = async () => {
    try {
      const response = await helpers.api().get('/blogs');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <Layout type={'general'} headerText="Dashboard" hasBackButton={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <SearchInput {...{value,setValue}}/>
          </View>
          <View style={styles.createContainer}>
            <TouchableOpacity style={styles.createBtn}>
                <CreateIcon name='pluscircle' size={16} color={colors.main}/>
                <Text style={styles.createText}>Create Blog</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal:helpers.px(16)
  },
  header:{
    marginTop:helpers.px(16),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  inputContainer:{
    width:'60%'
  },
  createContainer:{
    
  },
  createBtn:{
    flexDirection:'row',
    height:helpers.px(30),
    width:helpers.px(130),
    borderWidth:1,
    borderColor:colors.inputBorder,
    justifyContent:'center',
    alignItems:'center',
    
  },
  createText:{
    ...helpers.fontStyle('Regular',14),
    marginLeft:helpers.px(5)
  }

});
