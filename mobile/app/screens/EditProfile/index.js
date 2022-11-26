import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Layout from '../../Layout';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../../components/CustomInput';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';

import CemeraIcon from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { changePhoto, setUser } from '../../redux/features/userSlice';

const EditProfile = () => {
  const user = useSelector(state => state.user.currentUser);
  console.log({user});
  const [firstName,setFirstName]=useState(user.firstName)
  const [lastName,setLastName]=useState(user.lastName)
  const [email,setEmail]=useState(user.email)
  const [image,setImage]=useState(user.image)
  const [loading,setLoading]=useState(false)
  


  const dispatch=useDispatch()
  const changeProfilePhoto=async()=>{
    try {
      setLoading(true)
        await selectPhoto()
        const formData=new FormData()

        formData.append('id',user._id)
        formData.append('image',image)

        const response=await helpers.api().post('/changePhoto',formData)

        console.log({res:response.data});

        let cloudImage=response.data

        dispatch(changePhoto(cloudImage))

        
    } catch (error) {
        console.log(error);
    }

    finally{
      setLoading(false)
    }
  }


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

  const setProfileInfo=async()=>{
    
    try {
        setLoading(true)
        const response=await helpers.api().post('/edit',{...user,firstName,lastName,email})
        dispatch(setUser(response.data))
    } catch (error) {
        console.log(error);
    }
    finally{
        setLoading(false)
    }
  }
  return (
    <Layout type={'general'} headerText="Edit Profile">
      <View style={styles.container}>
        <TouchableOpacity onPress={changeProfilePhoto}  style={styles.imageBtn}>
          <Image style={styles.image} source={{uri: user.image}} />
         {loading &&<ActivityIndicator style={styles.loader} size={'small'} color={colors.buttonBakground}/>}
          <CemeraIcon style={styles.icon} color={colors.white} name='camera' size={16}/>
        </TouchableOpacity>
        <Text style={styles.fullName}>{user.firstName} {user.lastName}</Text>
        <View style={styles.inputContainer}>
          <CustomInput value={firstName} setValue={setFirstName} placeholder={user.firstName} />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput value={lastName} setValue={setLastName}  placeholder={user.lastName} />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput value={email} setValue={setEmail}  placeholder={user.email} />
        </View>
        <CustomButton loading={loading} text={"Edit"} onPress={setProfileInfo}/>
      </View>
    </Layout>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop:helpers.px(16),
    paddingHorizontal:helpers.px(16)
  },
  inputContainer:{
    marginBottom:helpers.px(8)
  },
  imageBtn:{
    width:helpers.px(70),
    height:helpers.px(70),
    alignSelf:'center',
    borderRadius:helpers.px(50),
    position:'relative',
    
  },
  loader:{
    position:'absolute',
    left:helpers.px(20),
    top:helpers.px(20),

    width:helpers.px(30),
    height:helpers.px(30)
    
  },
  image:{
    width:helpers.px(70),
    height:helpers.px(70),
    borderRadius:helpers.px(50)
  },
  icon:{
    position:'absolute',
    bottom:helpers.px(10),
    right:helpers.px(10),
    
  },
  fullName:{
    ...helpers.fontStyle('Bold',18),
    alignSelf:'center',
    marginBottom:helpers.px(16)
    
  }

});
