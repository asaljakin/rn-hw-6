import { FC } from "react";
import { TouchableOpacity, Text, StyleSheet, TextStyle } from "react-native";


import { COLORS } from "../../styles/global";

interface OnlyTextBTNProps {
  CTA: string;
  textCustomStyle?: TextStyle;
  onPress?: () => void;
}

export const OnlyTextBTN: FC<OnlyTextBTNProps> = ({
  CTA,
  onPress,
  textCustomStyle,
}) => {
  return (
    <TouchableOpacity
      //   style={styles.button}
      onPress={onPress}
    >
      <Text style={[styles.CTAText, textCustomStyle]}>{CTA}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CTAText: {
    fontSize: 16,
    color: COLORS.secondary_accent_color,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
  },
});
