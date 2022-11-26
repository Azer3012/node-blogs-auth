import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/EvilIcons';
import helpers from '../helpers/helpers';
import colors from '../values/colors';
import useLike from '../hooks/useLike';
import { useNavigation, useRoute } from '@react-navigation/native';
const BlogItem = ({item}) => {
  const route=useRoute()
  const [isIlikedBlog, handleLike] = useLike(item,route.name);
  const blogContent = item?.body?.replace(/<[^>]+>/g, '');

  const navigation=useNavigation()

 

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('blogDetail',{
      id:item._id
    })} style={styles.blogCard}>
      <View style={styles.headerBlog}>
        <Image style={styles.authorImage} source={{uri: item.author.image}} />
        <View style={styles.titleAndAuthor}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.authorName}>{item.author.fullName}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>{blogContent?.substring(0, 200)}...</Text>
      </View>
      <View style={styles.tags}>
        {item.tags.map((tag, index) => (
          <Text style={styles.tagText} key={index}>
            #{tag}
          </Text>
        ))}
      </View>
      <View style={styles.likeAndComments}>
        <TouchableOpacity
          onPress={() => handleLike(item._id)}
          style={styles.like}>
          <LikeIcon
            name={isIlikedBlog ? 'like1' : 'like2'}
            size={18}
            color={isIlikedBlog ? colors.buttonBakground : null}
          />
          <Text style={styles.likeText}>{item.likesCount}</Text>
        </TouchableOpacity>
        <View style={styles.comment}>
          <CommentIcon name="comment" size={18} />
          <Text style={styles.likeText}>{item?.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogItem;

const styles = StyleSheet.create({
  blogCard: {
    borderWidth: 1,
    borderRadius: helpers.px(8),
    borderColor: colors.inputBorder,
    padding: helpers.px(8),
    marginBottom:helpers.px(16)
  },
  headerBlog: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: helpers.px(35),
    height: helpers.px(35),
    borderRadius: helpers.px(50),
    resizeMode: 'cover',
  },
  titleAndAuthor: {
    paddingLeft: helpers.px(8),
  },
  title: {
    ...helpers.fontStyle('Bold', 12),
  },
  authorName: {
    ...helpers.fontStyle('Regular', 12),
  },
  body: {
    paddingVertical: helpers.px(10),
  },
  bodyText: {
    ...helpers.fontStyle('Light', 14),
  },
  tags: {
    flexDirection: 'row',
    paddingVertical: helpers.px(8),
  },
  tagText: {
    backgroundColor: colors.tagBg,
    padding: helpers.px(5),
    marginRight: helpers.px(5),
    ...helpers.fontStyle('Bold', 10),
  },
  likeAndComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  like: {
    flexDirection: 'row',
    marginRight: helpers.px(10),
  },
  comment: {
    flexDirection: 'row',
  },
});
