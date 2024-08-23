import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';
import { ScrollView } from "react-native-gesture-handler";
import Svg, { G, Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/User/UserActions";
function CustomPasswordInput({ placeholder, value, onChangeText }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [selected, setSelected] = React.useState('+91');
  const [country, setCountry] = React.useState('');
  const [phone, setPhone] = React.useState('');
  return (
    <View style={styles.passwordInput}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8BABC9"
        style={[styles.input, styles.textInputStyle]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={togglePasswordVisibility}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#8BABC9"
        />
      </TouchableOpacity>
    </View>
  );
}
function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [selected, setSelected] = useState('+231');
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState('');
  const navigatetoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Homepage" }],
    });
  }

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.user);

  const updatedData = {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
  };

  const navigateAddLocation = () => {
if(!email || !password || !first_name || !last_name || !phone){
  alert("Please fill all fields")
  return;
}


  
    dispatch(register(updatedData, navigation));



  }




  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center',alignItems: 'center'}}     
       showsVerticalScrollIndicator={false}
    >
      <View style={styles.Firstcontainer}>
      <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={131.544}
      height={54.602}
      viewBox="0 0 131.544 54.602"
    >
      <G data-name="Group 102">
        <Path
          data-name="Path 38"
          d="M.977 1.057v27.227h8.45V17.159h10.549v-5.5H9.427V6.908h12.35V1.057z"
          transform="translate(0 -.001) translate(-.547 -.592)"
          fill="#0f2573"
        />
        <Path
          data-name="Path 39"
          d="M56.922 1.057h8.413v20.522h8.779v6.7H56.922z"
          transform="translate(0 -.001) translate(-31.903 -.592)"
          fill="#0f2573"
        />
        <G data-name="Group 26">
          <G data-name="Group 99">
            <Path
              data-name="Path 40"
              d="M99.964 14.1q0-6.667 3.715-10.382T114.023 0q6.8 0 10.474 3.649t3.678 10.224a16.764 16.764 0 01-1.607 7.828 11.452 11.452 0 01-4.643 4.755 15.328 15.328 0 01-7.568 1.7 17.41 17.41 0 01-7.624-1.467 11.48 11.48 0 01-4.893-4.643 15.413 15.413 0 01-1.876-7.946m8.413.037q0 4.123 1.532 5.925a5.8 5.8 0 008.367.037q1.485-1.764 1.486-6.333 0-3.844-1.551-5.618A5.3 5.3 0 00114 6.372a5.111 5.111 0 00-4.086 1.8q-1.542 1.8-1.541 5.961"
              transform="translate(0 -.001) translate(0 .001) translate(-56.026 -.001)"
              fill="#0f2573"
            />
            <Path
              data-name="Path 41"
              d="M159.22 1.057h9.345l5.485 9.185 5.5-9.185h9.295l-10.588 15.824v11.4h-8.432v-11.4z"
              transform="translate(0 -.001) translate(0 .001) translate(-89.236 -.593)"
              fill="#0f2573"
            />
            <Path
              data-name="Path 42"
              d="M14.355 88.54l5.538 1.674a10.21 10.21 0 01-1.757 3.892 7.622 7.622 0 01-2.978 2.357 11.134 11.134 0 01-4.527.8 13.145 13.145 0 01-5.447-.969 8.636 8.636 0 01-3.648-3.409A11.555 11.555 0 010 86.636q0-5.074 2.7-7.8t7.638-2.726a10.37 10.37 0 016.075 1.563 9.179 9.179 0 013.285 4.8l-5.58 1.241a4.79 4.79 0 00-.614-1.367 3.63 3.63 0 00-1.3-1.116 3.723 3.723 0 00-1.716-.391A3.71 3.71 0 007.2 82.568a7.334 7.334 0 00-.865 4.026q0 3.4 1.032 4.661a3.539 3.539 0 002.9 1.261 3.522 3.522 0 002.741-1.016 6.3 6.3 0 001.346-2.957"
              transform="translate(0 -.001) translate(0 .001) translate(0 -42.658)"
              fill="#4287c8"
            />
            <Path
              data-name="Path 43"
              d="M52.208 76.9h16.935v4.366h-10.6v3.25h9.835v4.171h-9.837v4.031H69.45v4.631H52.208z"
              transform="translate(0 -.001) translate(0 .001) translate(-29.26 -43.102)"
              fill="#4287c8"
            />
            <Path
              data-name="Path 44"
              d="M99.274 76.9h5.9l7.7 11.314V76.9h5.957v20.45h-5.957l-7.659-11.229v11.234h-5.941z"
              transform="translate(0 -.001) translate(0 .001) translate(-55.639 -43.102)"
              fill="#4287c8"
            />
            <Path
              data-name="Path 45"
              d="M150.053 76.9h19.209v5.05h-6.445v15.4H156.5v-15.4h-6.445z"
              transform="translate(0 -.001) translate(0 .001) translate(-84.099 -43.102)"
              fill="#4287c8"
            />
            <Path
              data-name="Path 46"
              d="M200.23 76.9h16.935v4.366h-10.6v3.25h9.835v4.171h-9.835v4.031h10.909v4.631H200.23z"
              transform="translate(0 -.001) translate(0 .001) translate(-112.221 -43.102)"
              fill="#4287c8"
            />
            <Path
              data-name="Path 47"
              d="M247.391 97.355V76.9h10.533a15.309 15.309 0 014.478.5 4.767 4.767 0 012.5 1.862 5.775 5.775 0 01-1.773 8.252 7.632 7.632 0 01-2.22.809 6.3 6.3 0 011.645.754 6.391 6.391 0 011.011 1.076 8.045 8.045 0 01.885 1.27l3.06 5.926h-7.141l-3.377-6.249a4.772 4.772 0 00-1.144-1.577 2.655 2.655 0 00-1.549-.474h-.558v8.3zm6.347-12.164h2.662a9.487 9.487 0 001.674-.279 1.668 1.668 0 001.025-.642 2.071 2.071 0 00-.23-2.706 3.8 3.8 0 00-2.357-.53h-2.776z"
              transform="translate(0 -.001) translate(0 .001) translate(-138.653 -43.102)"
              fill="#4287c8"
            />
            <Path
              data-name="Path 48"
              d="M262.9 56.359a2.919 2.919 0 102.919 2.919 2.919 2.919 0 00-2.919-2.919"
              transform="translate(0 -.001) translate(0 .001) translate(-145.709 -31.587)"
              fill="#0f2573"
            />
            <Path
              data-name="Path 49"
              d="M235.508 56.359a2.919 2.919 0 102.919 2.919 2.919 2.919 0 00-2.919-2.919"
              transform="translate(0 -.001) translate(0 .001) translate(-130.357 -31.587)"
              fill="#0f2573"
            />
            <Path
              data-name="Path 50"
              d="M238.2 23.359l-1.4-4.76-.713-2.422a.506.506 0 00-.037-.078v-.013a.81.81 0 01.087.016l2.513.739 3.481 1.024.22.065a28.266 28.266 0 00.184-3.353 20.22 20.22 0 00-.669-5.274 11.907 11.907 0 00-2.154-4.364 9.7 9.7 0 00-3.762-2.879 14.962 14.962 0 00-5.971-1h-1.641v6.174a5.747 5.747 0 014.334 1.586q1.412 1.6 1.411 5.924a12.835 12.835 0 01-.631 4.727 3.965 3.965 0 01-1.746 2.043 8.664 8.664 0 01-3.751.585h-5.4V1.057H205.5V8.48h8.638v19.8h2.2a4.031 4.031 0 018.061 0h3.933a4.031 4.031 0 017.884-1.185 9.606 9.606 0 002.561-1.721l.008-.009-.591-2.01"
              transform="translate(0 -.001) translate(0 .001) translate(-115.177 -.593)"
              fill="#0f2573"
            />
            <Path
              data-name="Path 51"
              d="M280.54 40.784a.18.18 0 01.055.011l1.578.464 2.187.643 2.846.837 1.225.36.042.013c-.109.09-.216.174-.322.258l-.324.259-.32.256-.323.258-.32.256-.323.258-.323.259 2.557 2.557-1.531 1.53-2.556-2.557c-.091.11-.174.217-.26.323l-.259.323-.256.32-.258.323-.256.32-.259.324-.259.324a.401.401 0 01-.014-.04l-.974-3.314-.88-2.99-.448-1.522a.326.326 0 00-.023-.049z"
              transform="translate(0 -.001) translate(0 .001) translate(-157.231 -22.858)"
              fill="#4287c8"
            />
          </G>
        </G>
      </G>
    </Svg>
  
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3D6183" }}>
          Create an Account
        </Text>
      </View>
      <View style={styles.secondcontainer}>
        
        <View style={{ position: 'relative', zIndex: 1  ,width : "100%"}}> 
            <CountryCodeDropdownPicker 
        selected={selected} 
        setSelected={setSelected}
        setCountryDetails={setCountry} 
        phone={phone} 
        setPhone={setPhone} 
        countryCodeContainerStyles={styles.countrycode}
        phoneStyles={styles.input}
        dropdownStyles={{ position: 'absolute', top: '100%', zIndex: 2 , backgroundColor: '#FFF', width: '100%'}} 
        searchStyles={styles.input}
        searchTextStyles={styles.textInputStyle}
      />
        </View>
        <View style={styles.firstLastName}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#8BABC9"
            style={[styles.textInputStylefirstLastName, styles.textInputStyle]}
            value={first_name}
            onChangeText={(text) => setFirstName(text)}
          />

          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#8BABC9"
            style={[styles.textInputStylefirstLastName, styles.textInputStyle]}
            value={last_name}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#8BABC9"
          style={[styles.input, styles.textInputStyle]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <CustomPasswordInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.startView}>
          <Text style={styles.forgetPassword}>
            By registering you agree on our terms and conditions
          </Text>
        </View>
      </View>
      <View style={styles.thirdcontainer}>
        <TouchableOpacity style={styles.loginbutton} onPress={() => navigateAddLocation()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.EndtView} onPress={() => navigatetoHome()}>
          <Text style={styles.forgetPassword}>Skip for Now!</Text>
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
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 60,
  },
  secondcontainer: {
    width: "90%",
    height: "40%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  thirdcontainer: {
    width: "90%",
    height: "30%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "8%",
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 18, // Adjust the value to align the icon vertically
  },
  input: {
    height: 60,
    width: "100%",
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
  countrycode: {
    height: 60,
    width: "25%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 10,
    fontSize: 13,
    lineHeight: 24,
    color: "#8BABC9",
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

  loginbutton: {
    width: "100%",
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  EndtView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    fontSize: 16,
  },
  forgetPassword: {
    color: "#9C9C9C",
    fontSize: 13,
  },
  firstLastName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Register;
