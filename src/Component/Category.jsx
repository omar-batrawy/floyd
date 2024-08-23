import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Category = ({ navigation, prop, navigateTo }) => {
  const screenWidth = Dimensions.get('window').width;

  const navigationWithID = () => {
    navigation.navigate(navigateTo, {
      id: prop.productId,
    });
  };

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

  if (prop.loading) {
    return (
      <View style={[styles.container, { backgroundColor: "#D3D3D3", width: screenWidth / 2 - 20 }]}>
        <Animated.View style={{ ...styles.loadingBlock, opacity: fadeAnim }}>
          {/* <View style={styles.innerBlock} /> */}
        </Animated.View>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={navigationWithID}>
      <View style={[styles.container, { width: screenWidth / 2 - 20 }]}>
        <Image source={{ uri: prop.background ? prop.background :"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" }} style={styles.image} />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.5)"]}
          style={styles.textContainer}
        >
          <Text style={styles.categoryText}>{prop.categoryName}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 113,
    overflow: "hidden",

  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  categoryText: {
    color: "white",
    fontSize: 14, // Adjusted font size for smaller screens
    textAlign: "center",
  },
  loadingBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  innerBlock: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
  },
});

export default Category;
