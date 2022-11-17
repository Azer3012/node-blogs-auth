import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout';
import CustomInput from '../../components/CustomInput';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { loginValidationSchema } from '../validations/loginValidationSchema';

const Login = () => {
  const [email, setEmail] = useState('abishovazar@gmail.com');
  const [password, setPassword] = useState('azer1234');
  const [error,setError]=useState(null)
  const navigation = useNavigation();


  const validate=async(password,email)=>{

  
    try {
      const isValid=await loginValidationSchema.validate({password,email})
      return isValid
    } catch (error) {
      console.log(error.errors);
      setError(error.path)
      return helpers.toast(error.errors);
    }
  }

  const login = async () => {

    const isValid=await validate(password,email)

    if(isValid){
      try {
        const response = await helpers.api().post('/login', {email, password});
        console.log(response);
        navigation.navigate('MainTab');
      } catch (error) {
        console.log(error);
      }
    }
    
  };
  return (
    <Layout type={'general'} headerText={'Login'} hasBackButton={false}>
      <View style={styles.container}>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('forgotPassword');
          }}
          style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.btnContainer}>
          <CustomButton onPress={login} text={'Login'} />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton text={'Login with google'} google={true} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('registration');
          }}
          style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Login;

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
  forgotBtn: {
    marginBottom: helpers.px(16),
  },
  forgotText: {
    ...helpers.fontStyle('Bold', 16, colors.buttonBakground),
  },
  btnContainer: {
    width: '70%',
    marginBottom: helpers.px(8),
  },
});
