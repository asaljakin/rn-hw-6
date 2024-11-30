import { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../src/types";

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../src/firebase/config";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../styles/global";
import { styles } from "../styles/css";

import { useSelector } from "react-redux";
import { selectUser } from "../src/redux/user/userSelectors";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Comments">;

const CommentsScreen: FC<HomeScreenProps> = ({ route }) => {
  const { postId, uri } = route.params;
  const { profilePhoto, displayName } = useSelector(selectUser);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
        comment,
        displayName,
        // profilePhoto,
        created: Timestamp.fromDate(new Date()),
      });

      Keyboard.dismiss();
      setComment("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getComments = async () => {
    const q = query(collection(db, `posts/${postId}/comments`));
    onSnapshot(q, (querySnapshot) => {
      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
      }));
      setComments(comments);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screensContainer}>
        <Image style={styles.postPhotoInCommentScreen} source={{ uri }} />

        {comments.length > 0 && (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection:
                    item.displayName === displayName ? "row-reverse" : "row",
                  marginBottom: 24,
                }}
              >
                <View
                  style={styles.avatarWrapper(item.displayName === displayName)}
                >
                  {item.profilePhoto ? (
                    <Image
                      style={styles.profilePhoto}
                      source={{ uri: item.profilePhoto }}
                    />
                  ) : (
                    <FontAwesome
                      name="user-circle"
                      size={28}
                      color={colors.orange}
                    />
                  )}
                </View>
                <View style={styles.userContainer}>
                  <Text
                    style={styles.nickname(item.displayName === displayName)}
                  >
                    {item.displayName}
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.baseText}>{item.comment}</Text>
                    {/* <Text style={styles.baseText}>{item.created}</Text> */}

                    <Text
                      style={styles.data(item.displayName === displayName)}
                    ></Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}

        <View style={{ position: "relative", marginTop: "32" }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({
              ios: 100,
            })}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Коментувати..."
              placeholderTextColor={colors.underline_gray}
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={createComment}>
              <Feather name="arrow-up" size={24} color={colors.white} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
