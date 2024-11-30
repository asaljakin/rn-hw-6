import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { navigationProps } from "../types/navigationType";

import { COLORS } from "../styles/global";

import { RoundedBTN } from "../components/Buttons/RoundedBTN";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LogoutIcon } from "../assets/Icons/LogoutIcon";
import { logoutDB } from "../helpers/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  getImageUrl,
  getPostsByUser,
  removeUserProfilePhotos,
  uploadImage,
} from "../helpers/firestore";
import { useCallback, useState } from "react";
import { PostData } from "../types/postsDataTypes";
import { pickImage } from "../helpers/utils/pickImage";
import { setUserInfo } from "../redux/reducers/userSlice";
import { useFocusEffect } from "@react-navigation/native";

export const ProfileScreen = ({ navigation }: navigationProps) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<PostData[] | undefined>();

  const [image, setImage] = useState<string | null>(null);

  const onLogOut = () => {
    logoutDB(dispatch);
  };
  const user = useSelector((state: RootState) => state.user);

  const onPickImage = async () => {
    await removeUserProfilePhotos(user.uid);
    const result = await pickImage();
    let imageUrl = "";
    if (result?.imageFile && user.uid) {
      const imageRef = await uploadImage(
        user.uid,
        result?.imageFile,
        result?.fileName
      );
      imageUrl = await getImageUrl(imageRef);
    }
    setImage(imageUrl);
    dispatch(
      setUserInfo({
        ...user,
        profilePhoto: imageUrl,
      })
    );
  };

  const getPhotoPosts = async () => {
    if (user.uid) {
      const fetchedPosts = await getPostsByUser(user.uid);
      setPosts(fetchedPosts);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPhotoPosts();
    }, [user.uid])
  );

  // console.log(posts);
  console.log(user);

  return (
    <View>
      <Image
        resizeMode="cover"
        style={styles.backgroundImage}
        source={require("../assets/images/bg.png")}
      />
      <View style={styles.commonWrapper}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.logoutBTN} onPress={onLogOut}>
            <LogoutIcon style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <View style={styles.avatarBoxWrapper}>
            <View style={styles.avatarPlaceholder}>
              {user.profilePhoto && (
                <Image
                  style={styles.imageAvatar}
                  source={{ uri: user.profilePhoto }}
                />
              )}
              <View style={styles.rounderBTNWrapper}>
                <RoundedBTN onPress={onPickImage} />
              </View>
            </View>
          </View>

          <Text style={styles.title}>{user.displayName}</Text>

          <ScrollView>
            {posts?.map((post) => {
              return (
                <View>
                  <Image style={styles.image} source={{ uri: post.imageUrl }} />
                  <Text style={styles.subTitle}>{post.description}</Text>
                  <View style={styles.infoWrapper}>
                    <View style={styles.infoContainer}>
                      <View style={styles.elementWrapper}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate("Comments", {
                              postId: post.postId,
                            })
                          }
                        >
                          <FontAwesome
                            name="comment"
                            color={COLORS.main_accent_color}
                            size={24}
                          />
                        </Pressable>

                        <Text>{post.comments.length}</Text>
                      </View>
                      <View style={styles.elementWrapper}>
                        <AntDesign
                          name="like2"
                          color={COLORS.main_accent_color}
                          size={24}
                        />
                        <Text>{post.likes}</Text>
                      </View>
                    </View>

                    <View style={styles.elementWrapper}>
                      <Pressable onPress={() => navigation.navigate("Map")}>
                        <FontAwesome5
                          style={{ marginRight: 4 }}
                          name="map-marker-alt"
                          size={24}
                          color={COLORS.light_text_color}
                        />
                      </Pressable>

                      <Text>{post.location}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commonWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  container: {
    width: "100%",
    height: "80%",
    backgroundColor: COLORS.main_bg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    position: "relative",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  avatarBoxWrapper: {
    position: "relative",
    marginTop: -60,
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.secondary_bg,
    borderRadius: 16,
    position: "relative",
  },
  imageAvatar: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  rounderBTNWrapper: {
    position: "absolute",
    right: -10,
    bottom: 15,
  },

  logoutBTN: {
    zIndex: 99,
    position: "absolute",
    right: 16,
    top: 22,
  },

  title: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    color: COLORS.primary_text_color,
    lineHeight: 36,
    fontWeight: "500",
    textAlign: "center",
  },

  image: {
    borderRadius: 16,
    width: "100%",
    height: 280,
  },
  subTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 18,
    color: COLORS.primary_text_color,
  },
  infoWrapper: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 24,
  },
  elementWrapper: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 24,
  },
});
