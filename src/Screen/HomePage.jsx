import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity 
} from "react-native";
import FloyDLogoTab from "../Component/FloyDLogoTab";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Shopoffer from "./../../assets/Images/Shopoffer.png";
import Category from "../Component/Category";
import { getwhishList } from "../Redux/User/UserActions";
import { useSelector ,useDispatch} from "react-redux";
import { GetProduct } from "../Redux/Product/ProductActions";

function Searchinput({ placeholder, value, onChangeText ,productData,navigation}) {
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
      {productData?.Product?.length > 0 && value !== "" && (
        <View style={[styles.searchedProduct, { height: productData?.Product?.length <= 6 ? 'auto' : 200 }]}>
          <View style={styles.searchedProductContent}>
            {productData?.Product?.slice(0, 4).map((item, index) => (
              <TouchableOpacity key={index} style={styles.searchedProductItem} 
              onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
              >
                <Image
                  source={{ uri: item?.images[0]?.src }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function HomePage({ navigation }) {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getwhishList());
  }
  , []);

  useEffect(() => {
    const filters = {
      search: search,
    };

    dispatch(GetProduct(filters));
  }, [search]);

  const productData = useSelector((state) => state.Product);
console.log("productData",productData)
  const CategoryData = useSelector((state) => state.Category);
  const user = useSelector((state) => state.user);
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      <FloyDLogoTab navigation={navigation}/>
      <Searchinput
        placeholder="Search items"
        value={search}
        onChangeText={(text) => setSearch(text)}
        productData={productData}
        navigation={navigation}
      />
      <Image source={Shopoffer} style={{ width: "100%", height: 250 }} />
      <View style={styles.startView}>
        <Text style={styles.shopDepartment}>Shop By Department</Text>
      </View>
      {CategoryData?.Category && (
  <View style={styles.categoryContainer}>
    {CategoryData.Category.map((item, index) => 
      item ? (
        <Category
          key={index}
          navigation={navigation}
          prop={{ 
            background: item?.image?.src || '', 
            categoryName: item.name.split('&')[0] || '', 
            productId: item.id ,
            loading : false
          }}
          navigateTo="Category"
          item={item}
        />
      ) : null
    )}
  </View>
)}

{CategoryData?.loading && (
  <View style={styles.categoryContainer}>
  {[...Array(4)].map((_, index) => (
    <Category key={index} prop={{loading: true}} />
  ))}
</View>

)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF",
  },
  contentContainer: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#8BABC9",
    height: 60,
  },
  searchedProduct: {
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 10,
  },
  searchedProductContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  searchedProductItem: {
    // width: "45%",
    // marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 70,
    height: 70,
  },
  productName: {
    color: "#8BABC9",
    textAlign: "center",
    marginTop: 5,
  },
  startView: {
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: 16,
    marginTop: 50,
    marginRight: 20,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  textInputStyle: {
    fontSize: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 18,
  },
  shopDepartment: {
    fontSize: 15,
    color: "#4287C8",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-evenly",
    paddingBottom: 50,
    rowGap: 15
  },
});

export default HomePage;
