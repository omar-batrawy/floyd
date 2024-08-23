import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
import moment from "moment";

const OrderContainer = ({ navigation, prop, navigateTo }) => {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" ,  }}>
        <Text style={{ fontSize: 18 , color :"#0F2573" }}>Order {moment(prop.orderdate).format("DD/MM/YYYY")}</Text>
        <Text style={{ fontSize: 15, color :"#0F2573" }}>$ {prop.orderprice}     Delivery Charge ${prop.orderdeliveryprice}</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" ,color :"#0F2573" }}>Total $ {parseFloat(prop.orderdeliveryprice) + parseFloat(prop.orderprice) }</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" ,  }}>
    
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,  // 90% of the screen width
    height: 122,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    
     backgroundColor: "white",
  },
});

export default OrderContainer;
