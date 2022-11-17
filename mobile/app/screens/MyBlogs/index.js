import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import helpers from '../../helpers/helpers';
import Layout from '../../Layout';
import colors from '../../values/colors';

import CreateIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setBlogList} from '../../redux/features/dashboardSlice';

import BlogItem from '../../components/BlogItem';

import SearchInput from '../../components/SearchInput';
import { setMyBlogList } from '../../redux/features/blogSlice';
const MyBlogs = () => {
  
  const [filter, setFilter] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {list, error, loading} = useSelector(state => state.myBlogs);

  const getBlogList = async () => {
    
    try {
      const response = await helpers.api().get('/blogs/my', {filter});
      console.log({response});

      dispatch(setMyBlogList(response.data.list));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogList();
  }, [filter]);

  return (
    <Layout type={'general'} headerText="My Blogs" hasBackButton={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <SearchInput value={filter} setValue={setFilter} />
          </View>
          <View style={styles.createContainer}>
            <TouchableOpacity style={styles.createBtn}>
              <CreateIcon name="pluscircle" size={16} color={colors.main} />
              <Text style={styles.createText}>Create Blog</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={list}
          keyExtractor={item => item._id}
          renderItem={({item}) => <BlogItem item={item} />}
          style={styles.flatList}
        />
      </View>
    </Layout>
  );
};

export default MyBlogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: helpers.px(16),
  },
  header: {
    marginTop: helpers.px(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '60%',
  },
  createContainer: {},
  createBtn: {
    flexDirection: 'row',
    height: helpers.px(30),
    width: helpers.px(130),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    ...helpers.fontStyle('Regular', 14),
    marginLeft: helpers.px(5),
  },
  flatList:{
    marginTop:helpers.px(16)
  }
});
