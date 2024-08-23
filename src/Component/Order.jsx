import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import Svg, { G, Path, TSpan } from "react-native-svg"
import { Text as Textsvg } from "react-native-svg";
import OrderContainer from "./OrderContainer";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from './../Redux/Order/OrderActions';

const Order = ({ navigation, prop, navigateTo }) => {
  const order = useSelector((state) => state.Order);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {order?.Order?.map((item, i) => (
        <OrderContainer
          key={i} // Add a key prop for each child component
          prop={{ orderid: item.id, orderdate: item.date_created, orderstatus: "Delivered", orderprice: item.total, orderdeliveryprice: item.shipping_total }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Use 100% to fill the parent width
    flexGrow: 1, // Allow ScrollView to grow and be scrollable
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Align items to the center horizontally
    paddingTop: 20,
    paddingBottom: 20, // Add padding to the bottom to ensure content is scrollable
    gap: 20,
  },
});

export default Order;
