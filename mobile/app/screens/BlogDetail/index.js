import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import helpers from '../../helpers/helpers';
import Layout from '../../Layout';
import colors from '../../values/colors';
import moment from 'moment';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import useLike from '../../hooks/useLike';
import Comments from './Comments';

const BlogDetail = () => {
  const route = useRoute();

  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  const {id} = route.params;
  const [isIlikedBlog, handleLike] = useLike(detail, route.name);
  const blogContent = detail?.body.replace(/<[^>]+>/g, '');

  const getBlogDetail = async () => {
    try {
      const response = await helpers.api().get(`/blogs/${id}`);

      console.log(response);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, []);
  return (
    <Layout type={'general'} headerText={'Blog Detail'}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom:70}} showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleAndAuthor}>
              <Text style={styles.title}>{detail.title}</Text>
              <Text style={styles.author}>
                {detail.author.firstName} {detail.author.lastName}
              </Text>
            </View>
            <View style={styles.timeAndLikes}>
              <Text style={styles.time}>
                {moment(detail.createdAt).fromNow()}
              </Text>
              <TouchableOpacity
                onPress={() => handleLike(detail._id)}
                style={styles.like}>
                <LikeIcon
                  name={isIlikedBlog ? 'like1' : 'like2'}
                  size={18}
                  color={isIlikedBlog ? colors.buttonBakground : null}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.body}>{blogContent}</Text>
          <View style={styles.tags}>
            {detail.tags.map((item, index) => (
              <Text style={styles.tag}>{item}</Text>
            ))}
          </View>

          <Text style={styles.countReplies}>{detail.comments.length} replies</Text>
          <Comments update={getBlogDetail} comments={detail.comments} id={detail._id}/>
        </ScrollView>
      )}
    </Layout>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: helpers.px(16),
    paddingTop: helpers.px(16),
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: helpers.px(16),
  },
  titleAndAuthor: {
    width: '50%',
  },
  title: {
    ...helpers.fontStyle('Bold', 14),
  },
  author: {
    ...helpers.fontStyle('Light', 14),
  },
  timeAndLikes: {
    flexDirection: 'row',
  },
  time: {
    ...helpers.fontStyle('Regular', 12),
    marginRight: helpers.px(8),
  },
  body: {
    ...helpers.fontStyle('Regular', 14),
  },
  tags: {
    flexDirection: 'row',
    paddingVertical: helpers.px(16),
  },
  tag: {
    backgroundColor: colors.tagBg,
    padding: helpers.px(5),
    marginRight: helpers.px(5),
    ...helpers.fontStyle('Bold', 10),
  },
  countReplies:{

    ...helpers.fontStyle('Light',14),
    marginBottom:helpers.px(8)
  }
 
});
