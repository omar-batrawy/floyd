import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";
import Svg, { G, Path, TSpan, Text as Textsvg , Defs,ClipPath } from "react-native-svg";
import { useDispatch } from "react-redux";
import { getShipping ,RemoveShipping } from './../Redux/User/UserActions';
import { useSelector } from 'react-redux';

const Profile = ({ prop, navigateTo }) => {
  const navigation = useNavigation();

  const mapRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShipping());
  }, [dispatch]);
  const shipping = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState({
    latitude: 6.4281,
    longitude: -9.4295,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const logoutHandler = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.navigate("Splash");
          }
        }
      ],
      { cancelable: false }
    );
  };

  const deleteLocationHandler = (e,id) => {
    e.preventDefault();
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this location?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            dispatch(RemoveShipping(id));
          }
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const getFromAsyncStorage = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPhone = await AsyncStorage.getItem('phone');
      const storedAddress1 = await AsyncStorage.getItem('address');
      const storedAddress2 = await AsyncStorage.getItem('address_2');
      const storedCity = await AsyncStorage.getItem('city');
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      setName(storedName || '');
      setEmail(storedEmail || '');
      setPhone(storedPhone || '');
      setAddress_1(storedAddress1 || '');
      setAddress_2(storedAddress2 || '');
      setCity(storedCity || '');

      if (storedAddress1) {
        const parsedAddress1 = JSON.parse(storedAddress1);
        const { latitude, longitude } = parsedAddress1;
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    };
    getFromAsyncStorage();
  }, []);

  const AddLocationHandler = (e) => {
    e.preventDefault();
    navigation.navigate('AddLocation');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.container1}  showsVerticalScrollIndicator={false}>
      <Text style={{ fontSize: 16, color: "#0F2573", fontWeight: "bold" }}>
        {name}
      </Text>

      <Text style={{ fontSize: 16, color: "#0F2573" }}>{email}</Text>
      <Text style={{ fontSize: 16, color: "#0F2573" }}>{phone}</Text>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "7%",
          gap: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#0F2573", fontWeight: "bold" }}>
            Location
          </Text>
          <TouchableOpacity style={{ position: "absolute", right: "0%" }} onPress={(e) => AddLocationHandler(e)}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={45.882}
              height={45.882}
              viewBox="0 0 45.882 45.882"
            >
              <G data-name="Group 72">
                <G data-name="Group 71">
                  <G data-name="Group 70" fill="#8babc9">
                    <Path
                      data-name="Path 72"
                      d="M30.208 9.6a15.773 15.773 0 101.236 6.12 15.67 15.67 0 00-1.236-6.12m-.5 12.027a15.227 15.227 0 111.192-5.905 15.124 15.124 0 01-1.193 5.907"
                      transform="translate(-358.059 -360.059) rotate(45 -244.983 640.29)"
                    />
                    <Path
                      data-name="Path 72 - Outline"
                      d="M15.722 31.944A16.226 16.226 0 019.407.775a16.226 16.226 0 0112.629 29.894 16.121 16.121 0 01-6.314 1.275zm0-30.9a14.68 14.68 0 00-5.712 28.2A14.68 14.68 0 0021.434 2.2a14.583 14.583 0 00-5.712-1.154z"
                      transform="translate(-358.059 -360.059) rotate(45 -244.983 640.29)"
                    />
                  </G>
                </G>
                <Textsvg
                  data-name="+"
                  transform="translate(-358.059 -360.059) translate(381 390)"
                  fill="#8babc9"
                  fontSize={22}
                  fontFamily="Helvetica-Bold, Helvetica"
                  fontWeight={700}
                >
                  <TSpan x={-6} y={0}>
                    {"+"}
                  </TSpan>
                </Textsvg>
              </G>
            </Svg>
          </TouchableOpacity>
        </View>
        {
  shipping.shippinfo && !shipping.loading  ? (
    <MapView
      style={styles.map}
      region={region}
    >
      {shipping.shippinfo.map((item, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}
          title="Location"
          description="Selected Location"
        />
      ))}
    </MapView>
  ) : (
    <View style={styles.map}>
      <ActivityIndicator
        size="large"
        color="#0F2573"
        style={{ flex: 1, width: '100%' }}
      />
    </View>
  )
}

      </View>
      {shipping.shippinfo && shipping.shippinfo.length > 0 && shipping.shippinfo.map((item, index) => {
        let type, country, city, state, building_number, block, floor, postcode;

        try {
          type = item.type ? item.type : item.type;
        } catch (e) {
          console.error("Error parsing type:", e);
          type = item.type;
        }

        try {
          country = item.country ? item.country : item.country;
        } catch (e) {
          console.error("Error parsing country:", e);
          country = item.country;
        }

        try {
          city = item.city ? item.city : item.city;
        } catch (e) {
          console.error("Error parsing city:", e);
          city = item.city;
        }

        try {
          state = item.state ? item.state : item.state;
        } catch (e) {
          console.error("Error parsing state:", e);
          state = item.state;
        }

        try {
          building_number = item.building_number ? item.building_number : item.building_number;
        } catch (e) {
          console.error("Error parsing building number:", e);
          building_number = item.building_number;
        }
        try {
          block = item.block ? item.block : item.block;
          postcode = item.postcode ? item.postcode : item.postcode;
          floor = item.floor ? item.floor : item.floor;
        } catch (e) {
          console.error("Error parsing block:", e);
          block = item.block;
        }

        return (
          <View
            key={index}
            style={styles.locationContainer}
          >
            <Text
              style={styles.locationText}
            >
              {`${country || ''}, ${city || ''}, ${state || ''}, Building: ${building_number || ''}, Block: ${block || ''}, Floor: ${floor || ''}, Postal code: ${postcode || ''}`}
            </Text>
            <TouchableOpacity onPress={(e) => deleteLocationHandler(e,index)} style={styles.deleteButton}>
            <Svg
      data-name="Group 93"
      xmlns="http://www.w3.org/2000/svg"
      width={19.515}
      height={21.658}
      viewBox="0 0 23.515 25.658"
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 134"
            fill="#8babc9"
            d="M0 0H23.515V25.658H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 92" clipPath="url(#a)">
        <Path
          data-name="Path 79"
          d="M14.6 25.658H8.92c-.08-.008-.161-.018-.241-.025a5.226 5.226 0 01-1.812-.5 5.308 5.308 0 01-2.06-1.733 5.016 5.016 0 01-.88-2.074c-.087-.511-.132-1.03-.193-1.546-.042-.354-.079-.709-.119-1.064l-.118-1.058-.133-1.2q-.064-.531-.118-1.058l-.132-1.195q-.059-.531-.114-1.059l-.133-1.2-.118-1.058-.118-1.07-.119-1.058-.131-1.195c-.04-.361-.082-.722-.119-1.083-.006-.055-.024-.069-.077-.068-.37 0-.739.006-1.109 0a1.034 1.034 0 01-.964-.6A2.228 2.228 0 010 5.487v-.276a.168.168 0 00.012-.034.936.936 0 01.132-.369 1.057 1.057 0 01.956-.533h6.381a4.224 4.224 0 011.181-2.946 4.164 4.164 0 012.88-1.322A4.092 4.092 0 0114.23.79a4.247 4.247 0 011.811 3.484h6.4a1.067 1.067 0 011.077 1.077 1.054 1.054 0 01-1 1.058c-.369.014-.739 0-1.108 0-.133 0-.135 0-.15.129-.046.394-.089.788-.133 1.182l-.159 1.437-.179 1.605-.132 1.182-.13 1.17-.131 1.188-.133 1.182-.131 1.195L20 17.861l-.159 1.444c-.054.489-.113.979-.163 1.468a5.531 5.531 0 01-.3 1.346 5.294 5.294 0 01-2.178 2.712 5.215 5.215 0 01-2.353.8l-.248.025m.367-10.687v-4.284a1.067 1.067 0 10-2.135.009v8.519a1.143 1.143 0 00.117.514 1.067 1.067 0 002.017-.5v-4.253m-6.409 0v4.259a1.094 1.094 0 00.15.561 1.07 1.07 0 001.7.177 1.1 1.1 0 00.285-.767v-6.615-1.885a1.067 1.067 0 10-2.135-.009v4.278M13.9 4.271a2.081 2.081 0 00-1.022-1.808 2.04 2.04 0 00-2.33.059 2.08 2.08 0 00-.93 1.749z"
          fill="#8babc9"
        />
      </G>
    </Svg>
            </TouchableOpacity>
          </View>
        );
      })}

      <Button
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 40,
           marginBottom: 50,
        }}
        onPress={() => logoutHandler()}
        title="Logout"
      >
        <Text style={{ color: "#0F2573" }}>Logout</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: "10%",
    paddingHorizontal: "5%",
    width :"100%"

  },
  container1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  map: {
    width: "100%",
    height: 200,
    marginVertical : 25
  },
  locationContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  locationText: {
    fontSize: 15,
    color: "#0F2573",
    // fontWeight: "bold",
    flex: 1,
   
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default Profile;
