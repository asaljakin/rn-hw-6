import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { navigationProps } from "../types/navigationType";

export const CameraScreen = ({ navigation, route }: navigationProps) => {
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Pressable onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current !== null && route) {
      //   console.log("I am here");

      const photo = await cameraRef.current.takePictureAsync();

      if (photo?.uri) {
        navigation.navigate("AddPost", { photoUri: photo?.uri });
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        {/* Flip Camera Button */}
        <View style={styles.topButtonRightContainer}>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={styles.flipButton}
          >
            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Close Camera Button */}
        <View style={styles.topButtonLeftContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Capture Button */}
        <View style={styles.bottomButtonContainer}>
          <View style={styles.captureButtonWrapper}>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            />
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  topButtonRightContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 999,
  },
  topButtonLeftContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 999,
  },
  flipButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
    padding: 10,
  },
  closeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
    padding: 10,
  },
  bottomButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  captureButtonWrapper: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 40,
    padding: 4,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  permissionButton: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
