import { FC } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../src/types";
import MapView, { Marker } from "react-native-maps";

import { View } from "react-native";
import { styles } from "../styles/css";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Map">;

const MapScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const location = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude || 37.4220936,
          longitude: location?.longitude || -122.083922,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        cameraZoomRange={15}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: location?.latitude || 37.4220936,
            longitude: location?.longitude || -122.083922,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
