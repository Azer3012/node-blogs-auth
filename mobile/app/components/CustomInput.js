import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import helpers from '../helpers/helpers';
import colors from '../values/colors';
import EyeIcon from 'react-native-vector-icons/Feather';

const CustomInput = ({
  value,
  setValue,
  isPassword = false,
  label,
  placeholder = 'email',
  textarea=false
}) => {
  const [hide, setHide] = useState(true);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container,textarea && {minHeight:helpers.px(80),alignItems:'flex-start'}]}>
        <TextInput
          secureTextEntry={isPassword && hide}
          multiline={textarea}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={setValue}
        />
       { isPassword &&<TouchableOpacity style={styles.eye} onPress={()=>setHide(!hide)}>
          <EyeIcon name={hide?'eye-off':'eye'} size={16} />
        </TouchableOpacity>}
      </View>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    ...helpers.fontStyle('Light', 16),
    marginBottom: helpers.px(8),
  },
  container: {
    borderWidth: 1,
    minHeight: helpers.px(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '100%',
    paddingLeft: helpers.px(10),
    borderColor: colors.inputBorder,
    
  },
  input: {
    ...helpers.fontStyle('Regular', 16),
  },
  eye:{
    paddingRight:helpers.px(10)
  }
});
