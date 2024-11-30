import { FC } from "react";
import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";

import { COLORS } from "../../styles/global";

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  additionalContent?: React.ReactNode;
}

export const Input: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  style,
  additionalContent,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focusStyle, style]}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        // style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {additionalContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border_color,
    backgroundColor: COLORS.secondary_bg,
    padding: 16,
  },
  focusStyle: {
    borderColor: COLORS.main_accent_color,
  },
});
