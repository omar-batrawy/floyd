import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, Dimensions, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Svg, { Path } from "react-native-svg";
import { AddtowishList, RemovewishList } from "../Redux/User/UserActions";
import {addToCart }from "../Redux/Product/ProductActions";
const ProductinShop = ({ navigation, prop, navigateTo }) => {
  const screenWidth = Dimensions.get('window').width;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [favorite, setFavorite] = useState(false);
  const [favoriteid, setFavoriteid] = useState("");
  const data = {
    product_id: prop.id,
    quantity: 1,
    price: prop.price,
    productname: prop.productname,
    productimage: prop.productimage,
  };
const addToCarthandler = (e) => {
    e.preventDefault();
    addToCart(data);
    alert("Item added to cart");
  };


  useEffect(() => {
    const item = user?.whishlist?.find((item) => item.product_id === prop.id);
    if (item) {
      setFavorite(true);
      setFavoriteid(item?.item_id);
    } else {
      setFavorite(false);
    }
  }, [user?.whishlist, prop.id]);

  const navigatetoProduct = (e) => {
    e.preventDefault();

    // navigation.navigate(navigateTo, { product: prop.id });
    navigation.navigate("ProductDetails", { product: prop.id ,isFavorite:favorite});
    //console log the navigateTo prop
  };

  const favoritesetting = (e) => {
    e.preventDefault();
    if (favorite) {
      setFavorite(false);
      dispatch(RemovewishList(favoriteid));

    } else {
      setFavorite(true);
      dispatch(AddtowishList(prop.id,navigation));

    }
  };

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    loopAnimation.start();

    return () => loopAnimation.stop();
  }, [fadeAnim]);

  if (prop.loading) {
    return (
      <View style={[styles.container, { backgroundColor: "#D3D3D3", width: screenWidth / 2 - 20 }]}>
        <Animated.View style={{ ...styles.loadingBlock, opacity: fadeAnim }}>
        </Animated.View>
      </View>
    );
  }


  return (
    <View>
      <View style={[styles.container, { width: screenWidth / 2 - 20 }]}>
        <TouchableOpacity onPress={(e) => navigatetoProduct(e)} style={{ width: "100%", height: "70%", backgroundColor: "white", paddingTop: 5 }}>
          <Image
            source={{uri : prop.productimage}}
            style={{ position: "relative" , width: "100%", height: "100%" }}
          />
          <Text style={{ color: "#0F2573", fontSize: 16, position: "absolute", bottom: 10, width: "100%", textAlign: "center" }}>
            {prop.productname}
          </Text>
        </TouchableOpacity>
        <View style={{ width: "100%", height: "30%", display: "flex", flexDirection: "row" }}>
          <View style={{ width: "60%", backgroundColor: "rgba(139, 171, 201, 0.25)", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Text style={{ color: "#3D6183", fontSize: 17, fontWeight: "bold", textAlign: "center" }}>
              $ {" "} {prop.price}
            </Text>
          </View>
          <TouchableOpacity onPress={(e) => addToCarthandler(e)} style={{ width: "40%", backgroundColor: "#0F2573", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Text
              style={{ color: "#fff", fontSize: 15, textAlign: "center", display: "block", margin: "auto" }}
            >
              <Svg
                width="30px"
                height="30px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
              >
                <Path
                  d="M261 268.006c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1 0 .564-.436 1-1 1-.564 0-1-.436-1-1 0-.564.436-1 1-1zM275 268.006c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1 0 .564-.436 1-1 1-.564 0-1-.436-1-1 0-.564.436-1 1-1zM255 246.006a1 1 0 00-1 1 1 1 0 001 1h1.18l2.65 13.242a3.017 3.017 0 00-1.83 2.758c0 1.645 1.355 3 3 3h17a1 1 0 001-1 1 1 0 00-1-1h-17c-.571 0-1-.429-1-1s.429-1 1-1h15a1 1 0 00.03-.006H278a1 1 0 00.988-.844l.94-5.969a1 1 0 00-.832-1.144 1 1 0 00-1.145.834l-.806 5.123H260.82l-1.8-8.994h12.084a1 1 0 001-1 1 1 0 00-1-1h-12.485l-.639-3.195a1 1 0 00-.98-.805z"
                  style={{
                    InkscapeStroke: "none"
                  }}
                  transform="translate(-252 -244)"
                  color="#fff"
                  fill="#fff"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={4.1}
                />
                <Path
                  d="M276 246.006c-3.302 0-6 2.698-6 6s2.698 6 6 6 6-2.698 6-6-2.698-6-6-6zm0 2c2.221 0 4 1.779 4 4 0 2.22-1.779 4-4 4s-4-1.78-4-4c0-2.221 1.779-4 4-4z"
                  style={{
                    InkscapeStroke: "none"
                  }}
                  transform="translate(-252 -244)"
                  color="#fff"
                  fill="#fff"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={4.1}
                />
                <Path
                  d="M276 249.006a1 1 0 00-1 1v1h-1a1 1 0 00-1 1 1 1 0 001 1h1v1a1 1 0 001 1 1 1 0 001-1v-1h1a1 1 0 001-1 1 1 0 00-1-1h-1v-1a1 1 0 00-1-1z"
                  style={{
                    InkscapeStroke: "none"
                  }}
                  transform="translate(-252 -244)"
                  color="#fff"
                  fill="#fff"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={4.1}
                />
              </Svg>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={(e) => favoritesetting(e)} style={{ position: "absolute", top: 4, right: 4 }}>
        {favorite ? (
          <FontAwesome name="heart" size={24} color="#4287c8" />
        ) : (
          <AntDesign name="hearto" size={24} color="#4287c8" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 232,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: 232,
  },
});

export default ProductinShop;
