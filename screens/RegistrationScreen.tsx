import { FC, useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../src/types";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { styles } from "../styles/css";

import Input from "../components/Input";
import Button from "../components/Button";
import AddIcon from "../icons/AddIcon";

import { useDispatch } from "react-redux";
import { signUp } from "../src/redux/user/userOperations";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Registration">;

const RegistrationScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const handleInputFocus = (value: boolean) => {
    setKeyboardStatus(value);
  };

  const handleLoginChange = (value: string) => {
    setDisplayName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onRegister = () => {
    console.log("onRegister :>> ", displayName, email, password);

    dispatch(signUp({ displayName, email, password }));
    navigation.navigate("Login");
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  const showButton = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        {isPasswordVisible ? "Показати" : "Приховати"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.containerForKeyboard}>
        <Image
          source={require("../assets/images/bg.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.formContainer,
              height: keyboardStatus ? "78%" : "60%",
            }}
          >
            <View style={styles.avatarContainer}>
              <AddIcon width="25" height="25" style={styles.plusIcon}></AddIcon>
            </View>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={displayName}
                placeholder="Логін"
                onTextChange={handleLoginChange}
                onFocusStatus={handleInputFocus}
              />

              <Input
                value={email}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
                onFocusStatus={handleInputFocus}
              />

              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
                onFocusStatus={handleInputFocus}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onRegister}>
                <Text style={[styles.baseText, styles.buttonText]}>
                  Зареєстуватися
                </Text>
              </Button>

              <View style={styles.loginContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Вже є акаунт?&ensp;
                  <TouchableWithoutFeedback onPress={onLogin}>
                    <Text style={styles.linkText}>Увійти</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
