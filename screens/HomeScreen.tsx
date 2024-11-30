import { Text, View, StyleSheet, Image } from "react-native";

import { COLORS } from "../styles/global";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        {user.profilePhoto && (
          <Image style={styles.image} source={{ uri: user.profilePhoto }} />
        )}
        <View>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.main_bg,
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },
  userEmail: {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
  },
});
