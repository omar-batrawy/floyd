import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import FloyDLogoTab from "../Component/FloyDLogoTab";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import OfferComponent from "../Component/OfferComponent";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct,GetPromotion } from "../Redux/Product/ProductActions";
import { useEffect } from "react";

function Searchinput({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.passwordInput}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8BABC9"
        style={[styles.input, styles.textInputStyle]}
        value={value}
        onChangeText={onChangeText}
      />

      <View style={styles.eyeIcon}>
        <AntDesign name="search1" size={24} color="#8BABC9" />
      </View>
    

    </View>
  );
}
function Offer({ navigation }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    pagination: {
      page: 1,
      limit: 20
    },
    on_sale: true,
    search: ""
  });

  const dispatch = useDispatch();

  // Update the filters when search changes
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search
    }));
  }, [search]);

  // Dispatch the action when filters change
  useEffect(() => {
    dispatch(GetPromotion(filters));
  }, [filters, dispatch]);

  const productData = useSelector((state) => state.Product);
  return (
    <View style={styles.container}>
      <FloyDLogoTab navigation={navigation}/>
      <Searchinput
        placeholder="Search items"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
  <ScrollView
        contentContainerStyle={styles.categoryContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {productData?.Promotion && productData?.Promotion?.map((item, index) => (
  item && (  // Ensure item is not null or undefined
    <OfferComponent
      key={item.id} // Preferably use a unique key from the item, fall back to index if necessary
      navigation={navigation}
      prop={{
        image: item?.images?.[0]?.src,
        title: item?.name,
        beforeprice: item?.regular_price ,
        afterprice: item?.price ,
        productId: item?.id,

        loading : false,
        id : item?.id,
      }}

      
    />
  )
))}
{productData?.loading && (
  [...Array(4)].map((_, index) => (
    <OfferComponent key={index} prop={{ loading: true }} />
  ))
)}





        </ScrollView>
    
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
    // justifyContent: "center",
    alignItems: "center",
    // marginTop : "2%"
    position: "relative",
  },
 
  input: {
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
 
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  textInputStyle: {
    fontSize: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    top: 18, // Adjust the value to align the icon vertically
  },
  categoryContainer :
  {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    backgroundColor: "#F5F5F5",
    gap: 20,
       // justifyContent: "space-between",
    // marginTop: 20,
    // marginBottom: 20,
  },
});

export default Offer;
