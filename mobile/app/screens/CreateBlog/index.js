import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Layout from '../../Layout';

import CustomInput from '../../components/CustomInput';
import colors from '../../values/colors';
import helpers from '../../helpers/helpers';
import CustomButton from '../../components/CustomButton';
import TagsInput from '../../components/TagsInput';
import { useNavigation } from '@react-navigation/native';
const CreateBlog = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const navigation=useNavigation()
  const createBlog = async () => {
    if (title && content) {
      try {
        const response = await helpers.api().post('/blogs', {
          title,
          body: content,
          tags,
        });
        
        navigation.navigate('myBlogs')
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Layout type={'general'} headerText={'Create Blog'}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <CustomInput
            value={title}
            setValue={setTitle}
            label={'Title'}
            placeholder={'Title'}
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            textarea={true}
            value={content}
            setValue={setContent}
            label={'Content'}
            placeholder={'Content'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TagsInput setValues={setTags} values={tags} />
        </View>

        <CustomButton onPress={createBlog} text={'Submit'} />
      </View>
    </Layout>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: helpers.px(16),
    paddingTop: helpers.px(16),
  },
  inputContainer: {
    marginBottom: helpers.px(8),
  },
});
