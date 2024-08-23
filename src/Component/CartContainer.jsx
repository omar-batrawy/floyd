import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const CartContainer = ({ navigation, prop  , navigateTo,removeFromCart,updateQauntity }) => {
  // const [quantity, setQuantity] = React.useState(prop.quantity);
  const [quantity, setQuantity] = useState(prop.quantity);
  const removeFromCarthandler = () => {
    removeFromCart(prop.id);
  };

  useEffect(() => {
    updateQauntity(prop.id,quantity);
  }, [prop.id,quantity]);
  

  useEffect(() => {
    if(quantity < 1) {
      removeFromCart(prop.id)


    }
  }, [quantity]);
  useEffect(() => {
    if(quantity === 0) {
      setQuantity(1);
    }
  }
  , [quantity]);
  return (
    // <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={styles.name}>{prop.productName}</Text>
          <Text  style={styles.price}>${(prop.price * quantity).toFixed(2)}</Text>




<View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "35%",}}>
          <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            height: "100%",
            backgroundColor: "#E1EAF1",
          }}
        >

<TouchableOpacity
              onPress={() => setQuantity(quantity - 1)}
              style={{   width: "30%",height: "50%",}}
              >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRightWidth: 2,
              borderRightColor: "white",
            }}
          >
              
            <Text style={{ fontSize: 14, color: "black", fontWeight: "bold" }}>
              -
            </Text>
          
          </View>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
              height: "50%",
            }}
          >
            <Text style={{ fontSize: 14, color: "black", fontWeight: "bold" }}>
              {quantity}
            </Text>
          </View>
          <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={{   width: "30%",height: "50%",}}
              >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            
              borderLeftWidth: 2,
              borderLeftColor: "white",
            }}
          >
          
            <Text style={{ fontSize: 14, color: "black", fontWeight: "bold" }}>
              +
            </Text>

          </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={(e) => removeFromCarthandler()}
        style={{ marginRight : 10}}
          >
        <Svg
      data-name="Group 93"
      xmlns="http://www.w3.org/2000/svg"
      width={23.515}
      height={25.658}
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
          </View>
        <View style={styles.secondContainer}>
         { prop.image &&
          <Image
            source={{uri : prop.image}}
            style={{ width: "90%", height: "90%" }}
          />}
         
          <Text style={{ fontSize: 13, color: "#8BABC9" }}>
           ${prop.price}
          </Text>

          </View>
       
      </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

  padding :"5%",

 },
 firstContainer: {
  width: "60%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
},
secondContainer: {
  width: "40%",
  height: "100%",
  // backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
},
name: {
  fontSize: 18,
  color: "#0F2573",
  fontWeight: "bold",
},
price: {
  fontSize: 17,
  color: "#4287C8",
  fontWeight: "bold",
},
 
});

export default CartContainer;
