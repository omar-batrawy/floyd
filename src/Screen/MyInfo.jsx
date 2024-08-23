import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Order from "../Component/Order";
import Profile from "../Component/Profile";
import Wish from "../Component/Wish";
import { GetOrders } from './../Redux/Order/OrderActions';
import FloyDLogoTab from "../Component/FloyDLogoTab";


function MyInfo({ navigation,route }) {
  const screen = route.params?.screen;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetOrders());
  }
  , [dispatch]);
  
  const shipping = useSelector((state) => state.user);

  const [viewertype, setViewType] = useState("Profile");
  const [token, setToken] = useState("");
  const [verified,setVerified]=useState("")

  
 


  const getToken = async () => {
    setToken(await AsyncStorage.getItem("token"));
    setVerified(await AsyncStorage.getItem("verfied"));

 }
 getToken();
 
 const LoginHandler = () => {
   navigation.reset({
     index: 0,
     routes: [{ name: "Login" }],
   });
 }
 useEffect(() => {
  if (screen == "Wish") {
    setViewType("Wish List");
  }
}, []);
const [editable, setEditable] = useState(false);
const editHandler = (e) => {
  e.preventDefault();
  setEditable(!editable);
};

 
 if(token == "" || token == null || token == undefined || verified == "false"){
   return (
<View style={[styles.container, {justifyContent: "center"}]}>
<Text style={{fontSize : 16, color : "#0F2573", fontWeight : "bold",textAlign:"center",width : "80%"}}>Welcome! Please log in to your account, fill your bag, and get your orders delivered to your doorstep.</Text>
       <TouchableOpacity
         onPress={() => LoginHandler()}
         style={{backgroundColor : "#0F2573", width : 150,height:40, display : "flex", justifyContent : "center", alignItems : "center", borderRadius : 10, marginTop : 20}}
       >
        <Text style={{color : "white",fontSize:20}}>
         Login
          </Text>
       </TouchableOpacity>
     </View>
   );
 }
  else return (
    <View style={styles.container}>
            <FloyDLogoTab navigation={navigation} showHearIcon={false}/>

    
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => setViewType("Profile")}
          style={[
            styles.viewtype,
            {
              backgroundColor: viewertype == "Profile" ? "#4287C8" : "#E1EAF1",
            },
          ]}
        >
          <Text
            style={[
              styles.textInViewType,
              { color: viewertype == "Profile" ? "#FFFFFF" : "#3D6183" },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewType("Wish List")}
          style={[
            styles.viewtype,
            {
              backgroundColor:
                viewertype == "Wish List" ? "#4287C8" : "#E1EAF1",
            },
          ]}
        >
          <Text
            style={[
              styles.textInViewType,
              { color: viewertype == "Wish List" ? "#FFFFFF" : "#3D6183" },
            ]}
          >
            Wish List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewType("Orders")}
          style={[
            styles.viewtype,
            { backgroundColor: viewertype == "Orders" ? "#4287C8" : "#E1EAF1" },
          ]}
        >
          <Text
            style={[
              styles.textInViewType,
              { color: viewertype == "Orders" ? "#FFFFFF" : "#3D6183" },
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
      </View>
      {viewertype == "Profile" && <Profile/>}
      {viewertype == "Wish List" && <Wish navigation={navigation} />}
      {viewertype == "Orders" && <Order />}


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
     position: "relative",
  },
  loading: {
    height:"100%",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "gray",
    opacity: 0.3,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  
  menu: {
    display: "flex",
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    justifyContent: "space-between",
    gap: 1,
  },
  viewtype: {
    width: "34%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  textInViewType: {
    color: "#3D6183",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MyInfo;
