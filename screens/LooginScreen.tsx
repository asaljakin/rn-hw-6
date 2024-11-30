import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useState } from "react";

import { navigationProps } from "../types/navigationType";

import { COLORS } from "../styles/global";
import { Input } from "../components/Inputs/Input";
import { MainBTN } from "../components/Buttons/MainBTN";
import { OnlyTextBTN } from "../components/Buttons/OnlyTextBTN";
import { loginDB } from "../helpers/auth";
import { useDispatch } from "react-redux";

export const LoginScreen = ({ navigation }: navigationProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlerSecureTextEntry = () => {
    setSecureTextEntry(() => !secureTextEntry);
  };

  

  const onLogIn = () => {
    loginDB({ email, password }, dispatch);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image
          resizeMode="cover"
          style={styles.backgroundImage}
          source={require("../assets/images/bg.png")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.commonWrapper}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>

            <View style={styles.inputsWrapper}>
              <Input
                onChangeText={(text) => setEmail(text)}
                placeholder="Адреса електронної пошти"
              />
              <Input
                secureTextEntry={secureTextEntry}
                placeholder="Пароль"
                onChangeText={(text) => setPassword(text)}
                style={styles.customInputStyles}
                additionalContent={
                  <OnlyTextBTN
                    CTA={secureTextEntry ? "Показати" : "Hide"}
                    onPress={handlerSecureTextEntry}
                  />
                }
              />
            </View>

            <View style={styles.buttonWrapper}>
              <MainBTN onPress={onLogIn} CTA={"Увійти"} />
              <View style={styles.textButtonWrapper}>
                <Text style={styles.customText}>Немає акаунту?</Text>
                <OnlyTextBTN
                  onPress={() => navigation.navigate("Registration")}
                  textCustomStyle={styles.textCustomStyle}
                  CTA="Зареєструватися"
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
    height: "55%",
    backgroundColor: COLORS.main_bg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  title: {
    marginTop: 32,
    fontSize: 30,
    color: COLORS.primary_text_color,
    lineHeight: 36,
    fontWeight: "500",
    textAlign: "center",
  },

  inputsWrapper: {
    gap: 16,
    marginTop: 32,
  },

  buttonWrapper: {
    marginTop: 42,
    gap: 16,
  },

  customInputStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },

  customText: {
    fontSize: 16,
    color: COLORS.secondary_accent_color,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
  },
  textCustomStyle: {
    textDecorationLine: "underline",
  },
});
