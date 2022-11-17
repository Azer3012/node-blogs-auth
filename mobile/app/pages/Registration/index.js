import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout';
import CustomInput from '../../components/CustomInput';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';
import CustomButton from '../../components/CustomButton';

import { launchImageLibrary } from 'react-native-image-picker';
import { RegisterSchema } from '../validations/registerValidationSchema';
import { useNavigation } from '@react-navigation/native';

const Registration = () => {
  const navigation=useNavigation()
  const [name,setName]=useState('asif')
  const [surname,setSurname]=useState('abishoiv')
  const [email,setEmail]=useState('asifabishov@gmail.com')
  const [password,setPassword]=useState('asif1234')
  const [confirmPassword,setConfirmPassword]=useState('asif1234')
  const [error,setError]=useState('')
  const [image,setImage]=useState(null)

  const selectPhoto = async () => {

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        base64: true,
        allowsEditing: true,

      },
      imagePicker => {
        if (!imagePicker.didCancel) {
          console.log(imagePicker.assets);
          setImage({
            uri:imagePicker.assets[0].uri,
            name:imagePicker.assets[0].fileName,
            type:imagePicker.assets[0].type
          })

        } else {
          return;
        }
      },
    );
  };

  const validate = async data => {
    try {
      const isValid = await RegisterSchema.validate(data);
      return isValid;
    } catch (error) {
      setError(error.path);
      return helpers.toast(error.errors);
    }
  };
  
  const signUp=async()=>{

    const data={
        name,
        surname,
        email,
        password,
        repeatPassword:confirmPassword,
    }
    const isValid=await validate(data)
    if(isValid){
      try {
        const formData=new FormData()
        formData.append("firstName", name);
        formData.append("lastName", surname);
        formData.append("email", email);
        formData.append("password", password);
        if(image){
          formData.append("image", image);
        }

        if(formData){
          await helpers.api().post('/register',formData)
        }
      

        
        
        navigation.navigate('login')
      } catch (error) {
        console.log(error);
      }
    }

  }
  return (
    <Layout type={'general'} headerText={'Registration'} hasBackButton={false}>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
          <CustomInput
            placeholder="First Name"
            label={'First Name'}
            value={name}
            setValue={setName}
          />
        </View>
      <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Surname"
            label={'Surname'}
            value={surname}
            setValue={setSurname}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="email"
            label={'Email'}
            value={email}
            setValue={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="password"
            label={'Password'}
            isPassword={true}
            value={password}
            setValue={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="confirm"
            label={'Confirm Password'}
            isPassword={true}
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </View>
       
        <View style={styles.btnContainer}>
         <CustomButton onPress={signUp} text={"Sign Up"} />
        </View>
        <View style={styles.btnContainer}>
         <CustomButton text={"Login with google"} google={true} />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('login')} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Login</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={selectPhoto}>
          <Text>Select Photo</Text>
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