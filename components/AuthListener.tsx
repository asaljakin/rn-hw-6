import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authStateChanged } from "../helpers/auth";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "../navigation/StackNavigator";
import { View, StyleSheet } from "react-native";

export const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StackNavigator />
      </View>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
