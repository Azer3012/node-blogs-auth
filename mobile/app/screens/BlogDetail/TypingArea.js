import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import helpers from '../../helpers/helpers';
import colors from '../../values/colors';


const TypingArea = ({id,update}) => {
  const {image} = useSelector(state => state.user.currentUser);
  const [comment, setComment] = useState(null);
  const [loading,setLoading]=useState(false)

  console.log(comment);
  const submit = async () => {
    if (comment) {
        setLoading(true)
      try {
        const response = await helpers.api().post(`/blogs/${id}/comments`,{comment});
        console.log(response);
        await update()
        setComment('')
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.image} source={{uri: image}} />
        <TextInput value={comment} onChangeText={setComment} multiline style={styles.input} />
      </View>
      <CustomButton loading={loading} onPress={submit} text={'Add comment'} />
      
    </View>
  );
};

export default TypingArea;

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: 'row',
    marginBottom: helpers.px(16),
  },
  image: {
    width: helpers.px(30),
    height: helpers.px(30),
    borderRadius: helpers.px(50),
    marginRight: helpers.px(10),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    flex: 1,
    paddingLeft: helpers.px(10),
    minHeight: helpers.px(70),
  },
});
