import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { AddLocationFunction } from "../Redux/User/UserActions";

function AddLocation({ navigation, route }) {
  const dispatch = useDispatch();

  const data = {};
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [email, setEmail] = useState(data.email || "");
  const [password, setPassword] = useState(data.password || "");
  const [first_name, setFirstName] = useState(data.first_name || "");
  const [last_name, setLastName] = useState(data.last_name || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [City, setCity] = useState(data.shipping?.city || "");
  const [Neighborhood, setNeighborhood] = useState(
    data.shipping?.neighborhood || ""
  );
  const [Building, setBuilding] = useState(data.shipping?.building || "");
  const [Block, setBlock] = useState(data.shipping?.block || "");
  const [Floor, setFloor] = useState(data.shipping?.floor || "");
  const [updateData, setUpdateData] = useState(data);


  const updatedData = {

    "latitude": markerCoordinates?.latitude,
    "longitude": markerCoordinates?.longitude,
    "city": City,
    "building": Building,
    "block": Block,
    "floor": Floor,
    "state": Neighborhood,
    "postcode": "",
    "country": "Liberia",
    "building_number": Building,
    
      "address_1": "No data",
      "address_2": "No data",





  };


  const mapRef = useRef(null);

  const navigatetoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Homepage" }],
    });
  };

  useEffect(() => {
    // Zooming to Liberia
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: 6.4281,
          longitude: -9.4295,
          latitudeDelta: 5, // Change the value to adjust zoom level
          longitudeDelta: 5,
        },
        1000 // Animation duration in milliseconds
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      setLoading(false);
      setLocation(location);
    })();
  }, []);

  const handleUseCurrentLocation = async () => {
    setLoading(true);
    if (location) {
      const { latitude, longitude } = location.coords;
      setMarkerCoordinates({ latitude, longitude });
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01, // Adjust zoom level
          longitudeDelta: 0.01,
        },
        1000 // Animation duration in milliseconds
      );
      setLoading(false);
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinates({ latitude, longitude });
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const registerHandler = () => {
    if (!markerCoordinates) {
      alert("Please select a location on the map");
      return;
    }
    if (!City) {
      alert("Please enter City");
      return;
    }
    if (!Neighborhood) {
      alert("Please enter Neighborhood");
      return;
    }
    if (!Building) {
      alert("Please enter Building");
      return;
    }
    if (!Block) {
      alert("Please enter Block");
      return;
    }
    if (!Floor) {
      alert("Please enter Floor");
      return;
    }

    dispatch(AddLocationFunction(updatedData, navigation));
    // navigatetoHome();
  };
  const loginData = useSelector((state) => state.user);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.Firstcontainer}>
          {!loading && (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: 6.4281,
                longitude: -9.4295,
                latitudeDelta: 5, // Change the value to adjust zoom level
                longitudeDelta: 5,
              }}
              onPress={handleMapPress}
            >
              {markerCoordinates && <Marker coordinate={markerCoordinates} />}
            </MapView>
          )}

          {loading && (
            <View style={styles.map}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          <TouchableOpacity
            style={styles.usecurrentlocation}
            onPress={handleUseCurrentLocation}
          >
            <Text>
              <MaterialIcons name="gps-not-fixed" size={24} color="white" />
            </Text>
            <Text style={{ color: "#FFF", fontSize: 14 }}>
              USE YOUR CURRENT LOCATION
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondcontainer}>
          <Text style={{ color: "#9C9C9C", fontSize: 14, textAlign: "center" }}>
            Or Pin your Location Manually on the Map
          </Text>
          <TextInput
            placeholder="City"
            placeholderTextColor="#8BABC9"
            style={[styles.input, styles.textInputStyle]}
            value={City}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            placeholder="Neighborhood"
            placeholderTextColor="#8BABC9"
            style={[styles.input, styles.textInputStyle]}
            value={Neighborhood}
            onChangeText={(text) => setNeighborhood(text)}
          />

          <View style={styles.firstLastName}>
            <TextInput
              placeholder="Building"
              placeholderTextColor="#8BABC9"
              style={[
                styles.textInputStylefirstLastName,
                styles.textInputStyle,
              ]}
              value={Building}
              onChangeText={(text) => setBuilding(text)}
            />

            <TextInput
              placeholder="Block"
              placeholderTextColor="#8BABC9"
              style={[styles.textInputStyleblock, styles.textInputStyle]}
              value={Block}
              onChangeText={(text) => setBlock(text)}
            />
            <TextInput
              placeholder="Floor"
              placeholderTextColor="#8BABC9"
              style={[styles.textInputStyleblock, styles.textInputStyle]}
              value={Floor}
              onChangeText={(text) => setFloor(text)}
            />
          </View>
          <View style={styles.startView}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Text style={styles.forgetPassword}>
              Set Your Location as Default
            </Text>
          </View>
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={() => registerHandler()}
          >
            <Text style={styles.buttonText}>Add Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loginData.loading &&<View style={styles.loading}>

<ActivityIndicator
size="large"
color="#0F2573"
/>
  

</View>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  loading :{
    height:"100%",
    width :"100%",
    position : "absolute",
    display :"flex",
    justifyContent :"center",
    alignItems :"center",
    backgroundColor : "grey",
    opacity : 0.5
  },
  Firstcontainer: {
    width: "100%",
    height: "45%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  secondcontainer: {
    width: "100%",
    height: "55%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: "8%",
    gap: 20,
  },

  input: {
    height: 60,
    width: "90%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#8BABC9",
  },
  loginbutton: {
    width: "90%",
    height: 60,
    backgroundColor: "#0F2573",
    borderRadius: 9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  textInputStyle: {
    fontSize: 15,
  },
  startView: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    fontSize: 16,
    marginVertical : 10,
  },

  forgetPassword: {
    color: "#819CAC",
    fontSize: 13,
  },
  map: {
    width: "100%",
    height: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  usecurrentlocation: {
    width: "100%",
    height: "15%",
    backgroundColor: "#4287C8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputStylefirstLastName: {
    height: 60,
    width: "48%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#8BABC9",
  },
  firstLastName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  textInputStyleblock: {
    height: 60,
    width: "24%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#8BABC9",
  },
  loadingContainer: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: [{ translateX: -50 }, { translateY: -50 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddLocation;
