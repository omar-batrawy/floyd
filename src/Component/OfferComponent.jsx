import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, ClipPath, Path, G, Ellipse } from "react-native-svg";
import {addToCart }from "../Redux/Product/ProductActions";

const OfferComponent = ({ navigation, prop, navigateTo }) => {
  const data = {
    product_id: prop.id,
    quantity: 1,
    price: prop.afterprice,
    productname: prop.title,
    productimage: prop.image,
  };
  handleAddToCart = () => {
    Alert.alert("Added to Cart");
  };
  const screenWidth = Dimensions.get("window").width;

  const fadeAnim = useRef(new Animated.Value(0)).current;

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

    // Cleanup function to stop the animation when the component unmounts
    return () => loopAnimation.stop();
  }, [fadeAnim]);
  const addToCarthandler = (e) => {
    e.preventDefault();
    addToCart(data);
    alert("Item added to cart");
  };
  const navigatetoProduct = (e) => {
    e.preventDefault();

    // navigation.navigate(navigateTo, { product: prop.id });
    // navigation.navigate("ProductDetails", { product: prop.id });
    //console log the navigateTo prop
  };
  if (prop.loading) {
    return (
      <View style={[styles.container, { backgroundColor: "#D3D3D3" }]}>
        <Animated.View style={{ ...styles.loadingBlock, opacity: fadeAnim }}>
          {/* <View style={styles.innerBlock} /> */}
        </Animated.View>
      </View>
    );
  }
  return (
    <View
      // onPress={() => navigation.navigate("ProductDetails")}
      style={styles.container}
    >
      <TouchableOpacity onPress={(e) => navigatetoProduct(e)}
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          //  backgroundColor: "blue",
        }}
      >
        <Image
          source={{ uri: prop.image }}
          style={{ width: "70%", height: "70%" }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          paddingVertical: 20,
        }}
      >
        <Text style={styles.offerTitle}>{prop.title}</Text>
        <TouchableOpacity onPress={(e) => navigatetoProduct(e)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#8BABC9",
              textDecorationLine: "line-through",
            }}
          >
          $  {prop.beforeprice}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#4287C8" }}>
          $ {prop.afterprice} 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => addToCarthandler(e)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "80%",
            height: 45,
            backgroundColor: "#0F2573",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
            ADD TO CART
          </Text>
          <Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={22.034}
              height={17.947}
              viewBox="0 0 21.034 16.947"
            >
              <Defs>
                <ClipPath id="a">
                  <Path
                    data-name="Rectangle 36"
                    fill="#fff"
                    d="M0 0H16.78V14.62H0z"
                  />
                </ClipPath>
              </Defs>
              <G data-name="Group 106">
                <G data-name="Group 46">
                  <G
                    data-name="Group 31"
                    clipPath="url(#a)"
                    transform="translate(-164.254 -486) translate(164.254 488.327)"
                  >
                    <Path
                      data-name="Path 59"
                      d="M5.5 12.285h-.543a2.9 2.9 0 01-.382-.014.658.658 0 01-.567-.558l-.741-4.2-.691-3.93c-.123-.7-.249-1.4-.37-2.1-.012-.07-.036-.1-.112-.1H.72A.7.7 0 010 .7.689.689 0 01.709 0H2.77a.688.688 0 01.715.607c.064.377.131.753.19 1.131.012.076.043.086.108.086H16.078a.69.69 0 01.692.849q-.35 1.984-.693 3.969c-.145.831-.286 1.662-.433 2.492a.7.7 0 01-.7.586H5.053l.083.479c.037.209.079.418.112.627.011.07.042.082.1.082h8.678a.689.689 0 11.025 1.378h-.7a1.258 1.258 0 01.63.966 1.193 1.193 0 01-.409 1.056 1.242 1.242 0 01-1.727-.083 1.2 1.2 0 01-.316-1.033 1.255 1.255 0 01.617-.9H6.721a1.253 1.253 0 01.624 1 1.186 1.186 0 01-.467 1.059 1.24 1.24 0 01-1.726-.186 1.27 1.27 0 01.348-1.88M3.922 3.206l.9 5.114h9.544l.9-5.114z"
                      fill="#fff"
                    />
                  </G>
                </G>
                <G
                  data-name="Ellipse 4"
                  transform="translate(-164.254 -486) translate(175.288 486)"
                  fill="#fff"
                  stroke="#0f2573"
                  strokeWidth={1}
                >
                  <Ellipse cx={5} cy={4.5} rx={5} ry={4.5} stroke="none" />
                  <Ellipse cx={5} cy={4.5} rx={4.5} ry={4} fill="none" />
                </G>
                <Path
                  data-name="Path 71"
                  d="M-1.267-5.089v1.421h-.907v-1.421h-1.415v-.9h1.414V-7.4h.907v1.414H.147v.9z"
                  transform="translate(-164.254 -486) translate(182.078 495.84)"
                  fill="#0f2573"
                />
              </G>
            </Svg>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 211,
    overflow: "hidden",
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F2573",
  },
  categoryText: {
    color: "white",
    fontSize: 14, // Adjusted font size for smaller screens
    textAlign: "center",
  },
  loadingBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  innerBlock: {
    width: 50,
    height: 50,
    backgroundColor: "#333",
  },
});

export default OfferComponent;
