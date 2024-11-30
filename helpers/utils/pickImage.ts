import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const file = await response.blob();
      const fileName = uri.split("/").pop() || uri;

      return { uri, imageFile: file, fileName };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error picking image:", error);
    throw error;
  }
};
