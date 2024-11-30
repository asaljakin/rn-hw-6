import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Input } from "../components/Inputs/Input";
import { COLORS } from "../styles/global";
import AntDesign from "react-native-vector-icons/AntDesign";
import { navigationProps } from "../types/navigationType";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { addComment, getPostById } from "../helpers/firestore";
import { PostData } from "../types/postsDataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const CommentsScreen = ({ navigation, route }: navigationProps) => {
  const [post, setPost] = useState<PostData | undefined>();
  const [comment, setComment] = useState("");
  const postId = route?.params?.postId;
  const user = useSelector((state: RootState) => state.user);
  const getPost = async () => {
    if (postId) {
      const fetchedPosts = await getPostById(postId);
      if (fetchedPosts) {
        setPost(fetchedPosts);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
    }, [postId])
  );
  console.log(post);

  const onAddComment = () => {
    if (user.uid) {
      addComment(postId, user.uid, comment);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <Image style={styles.image} source={{ uri: post?.imageUrl }} />
        <View style={styles.comments}>
          {post?.comments.map((comment) => {
            return (
              <View style={styles.commentWrapper}>
                <Image
                  style={styles.userIcon}
                  source={require("../assets/images/Forest.png")}
                />
                <View style={[styles.commentBoxCommon, styles.commentBoxLeft]}>
                  <Text style={styles.text}>{comment.comment}</Text>
                  <Text style={[styles.dateText]}>{comment.createdAt}</Text>
                </View>
              </View>
            );
          })}
          {/* <View style={styles.commentWrapper}>
            <Image
              style={styles.userIcon}
              source={require("../assets/images/Forest.png")}
            />
            <View style={[styles.commentBoxCommon, styles.commentBoxLeft]}>
              <Text style={styles.text}>
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={[styles.dateText]}>09 червня, 2020 | 09:14</Text>
            </View>
          </View>

          <View style={styles.commentWrapper}>
            <View style={[styles.commentBoxCommon, styles.commentBoxRight]}>
              <Text style={styles.text}>Thank you!</Text>
              <Text style={[styles.dateText]}>10 червня, 2020 | 12:10</Text>
            </View>
            <Image
              style={styles.userIcon}
              source={require("../assets/images/Rectangle 22.png")}
            />
          </View> */}
        </View>
      </ScrollView>

      <Input
        style={styles.input}
        onChangeText={(text) => setComment(text)}
        placeholder="Коментувати..."
        additionalContent={
          <TouchableOpacity onPress={onAddComment} style={styles.button}>
            <AntDesign name="arrowup" size={18} color={COLORS.main_bg} />
          </TouchableOpacity>
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.main_bg,
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
    justifyContent: "space-between",
  },

  image: {
    borderRadius: 16,
    width: "100%",
    height: 280,
  },
  userIcon: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  comments: {
    marginTop: 32,
    gap: 24,
  },
  commentWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  commentBoxCommon: {
    width: "88%",
    padding: 16,
    backgroundColor: COLORS.secondary_bg,

    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentBoxLeft: {
    borderTopRightRadius: 6,
  },
  commentBoxRight: {
    borderTopLeftRadius: 6,
  },

  text: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.primary_text_color,
  },

  dateText: {
    color: COLORS.light_text_color,
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
  },
  input: {
    borderRadius: 100,
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    padding: 6,
    borderRadius: 100,
    backgroundColor: COLORS.main_accent_color,
    justifyContent: "center",
    alignContent: "center",
  },
});
