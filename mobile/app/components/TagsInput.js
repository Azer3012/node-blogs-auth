import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import helpers from '../helpers/helpers';
import colors from '../values/colors';
import RemoveIcon from 'react-native-vector-icons/Feather';

const TagsInput = ({
  values,
  setValues,

  label = 'Add Tags',
  placeholder = 'Tags',
}) => {

    const inputRef=useRef()
  const handleChange = e => {
    console.log(e.nativeEvent.text);
    setValues([...values, e.nativeEvent.text]);
    inputRef.current.clear()
  };

  const removeTag=(id)=>{
    setValues(values.filter((_,index)=>index!==id))
  }

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        {values.map((tag, index) => (
          <View style={styles.tag}>
            <TouchableOpacity style={styles.tabBtn} onPress={()=>removeTag(index)}>
              <Text style={styles.tagText}>{tag}</Text>
                <RemoveIcon style={styles.icon} name='x'/>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
            ref={inputRef}
          clearButtonMode='always'
          style={styles.input}
          placeholder={placeholder}
          onSubmitEditing={e => handleChange(e)}
        />
      </View>
    </>
  );
};

export default TagsInput;

const styles = StyleSheet.create({
  label: {
    ...helpers.fontStyle('Light', 16),
    marginBottom: helpers.px(8),
  },
  container: {
    borderWidth: 1,
    minHeight: helpers.px(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap:'wrap',
    width: '100%',
    paddingLeft: helpers.px(10),
    borderColor: colors.inputBorder,
   
  },
  input: {
    ...helpers.fontStyle('Regular', 16),
    flex: 1,
  },
  tag: {
    backgroundColor: colors.inputBorder,
    marginRight: helpers.px(10),
    padding: helpers.px(8),
    minWidth:helpers.px(70)
    
  },
  tagText:{
    ...helpers.fontStyle('Light',12)
  },
  tabBtn:{
    
    flexDirection:'row',
    justifyContent:'space-between'
   
  },
  icon:{
    
  }
});
