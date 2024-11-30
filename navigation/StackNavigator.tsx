import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import BottomTabNavigator from "./BottomTabNavigation";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import CommentsScreen from "../screens/CommentsScreen";
import MapScreen from "../screens/MapScreen";

import { colors } from "../styles/global";
import { styles } from "../styles/css";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../src/redux/user/userSelectors";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const auth = useSelector(selectIsAuth);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {auth ? (
        <>
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Коментарі",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="arrow-left" size={24} color={colors.black80} />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerStyle: styles.tabHeader,
              headerTitleStyle: styles.tabHeaderTitle,
              headerTitleAlign: "center",
            })}
          />

          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={({ navigation }) => ({
              headerShown: true,

              title: "Локація",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="arrow-left" size={24} color={colors.black80} />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: { paddingRight: 16 },
              headerLeftContainerStyle: { paddingLeft: 16 },
              headerStyle: styles.tabHeader,
              headerTitleStyle: styles.tabHeaderTitle,
              headerTitleAlign: "center",
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: "",
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
