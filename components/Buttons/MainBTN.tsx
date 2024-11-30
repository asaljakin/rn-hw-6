import { FC } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { COLORS } from "../../styles/global";

interface MainBTNProps {
  CTA: string;
  onPress?: () => void;
  customStyles?: object;
  customTextColor?: object;
  disabled?: boolean;
}

export const MainBTN: FC<MainBTNProps> = ({
  CTA,
  onPress,
  customStyles,
  customTextColor,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, customStyles]}
      onPress={onPress}
    >
      <Text style={[styles.CTAText, customTextColor]}>{CTA}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.main_accent_color,
    paddingVertical: 16,
    borderRadius: 100,
  },
  CTAText: {
    fontSize: 16,
    color: COLORS.secondary_text_color,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
  },
});
