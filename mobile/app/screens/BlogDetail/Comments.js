import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'
import helpers from '../../helpers/helpers'
import colors from '../../values/colors'
import TypingArea from './TypingArea'

const Comments = ({comments,id,update}) => {
  return (
    <View style={styles.comments}>
            {comments.map(comment => (
              <View key={comment._id} style={styles.comment}>
                <Image style={styles.commentAuthorImage} source={{uri:comment.author.image}} />
                <View style={styles.commentInfo}>
                  <View style={styles.commentAuthorAndTime}>
                    <Text style={styles.commentAuthor}>
                      {comment.author.firstName} {comment.author.lastName}
                    </Text>
                    <Text style={styles.commentTime}>
                      {moment(comment.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text style={styles.commentText}>{comment.body}</Text>
                </View>
              </View>
            ))}
            <TypingArea id={id} update={update}/>
          </View>
  )
}

export default Comments

const styles = StyleSheet.create({
    comments: {
        borderTopWidth: 1,
        borderColor: colors.inputBorder,
        paddingTop: helpers.px(16),
      },
    comment:{
        flexDirection:'row',
        marginBottom:helpers.px(8)
    },
    commentAuthorImage:{
        width:helpers.px(30),
        height:helpers.px(30),
        borderRadius:helpers.px(50)
    },
    commentInfo:{
        marginLeft:helpers.px(10)
    },
    commentAuthorAndTime:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:helpers.px(5)
       
    },
    commentAuthor:{
        ...helpers.fontStyle('Light',12),
        marginRight:helpers.px(8)
    },
    commentTime:{
        ...helpers.fontStyle('Light',12)
    },
    commentText:{
        ...helpers.fontStyle('Regular',14)
    }

})