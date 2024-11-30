import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { LogoutIcon } from "../assets/Icons/LogoutIcon";

import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../styles/global";
import { AddPostScreen } from "../screens/AddPostScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { logoutDB } from "../helpers/auth";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    logoutDB(dispatch);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          headerTitle: "Публікації",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={
                focused ? COLORS.main_accent_color : COLORS.primary_text_color
              }
            />
          ),
          headerRight: () => (
            <Pressable onPress={onLogOut}>
              <LogoutIcon style={{ marginRight: 10 }} />
            </Pressable>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        options={({ navigation }) => ({
          headerTitle: "Створити публікацію",
          tabBarIcon: () => (
            <View style={styles.addIcon}>
              <AntDesign name="plus" size={24} color={COLORS.main_bg} />
            </View>
          ),
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ marginLeft: 10 }}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={COLORS.primary_text_color}
                />
              </Pressable>
            );
          },
          tabBarStyle: { display: "none" },
        })}
        name="AddPost"
        component={AddPostScreen}
      />

      <Tab.Screen
        options={() => ({
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={
                focused ? COLORS.main_accent_color : COLORS.primary_text_color
              }
            />
          ),
        })}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  addIcon: {
    backgroundColor: COLORS.main_accent_color,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
