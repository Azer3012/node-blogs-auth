import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout';
import CustomInput from '../../components/CustomInput';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';
import CustomButton from '../../components/CustomButton';

const Registration = () => {
  const [value, setValue] = useState('');
  return (
    <Layout type={'general'} headerText={'Registration'} hasBackButton={false}>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
          <CustomInput
            placeholder="First Name"
            label={'First Name'}
            {...{value, setValue}}
          />
        </View>
      <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Surname"
            label={'SurName'}
            {...{value, setValue}}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="email"
            label={'Email'}
            {...{value, setValue}}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="password"
            label={'Password'}
            isPassword={true}
            {...{value, setValue}}
          />
        </View>
       
        <View style={styles.btnContainer}>
         <CustomButton text={"Sign Up"} />
        </View>
        <View style={styles.btnContainer}>
         <CustomButton text={"Login with google"} google={true} />
        </View>
        <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Login</Text>
        </TouchableOpacity>
        

      </View>
    </Layout>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '70%',
    marginBottom: helpers.px(12),
  },
  forgotBtn:{
    marginBottom:helpers.px(16),
  },
  forgotText:{
    ...helpers.fontStyle('Bold',16,colors.buttonBakground)
  },
  btnContainer:{
    width: '70%',
    marginBottom: helpers.px(8),
  }
});