import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import Svg, { Defs, ClipPath, G, Path, Circle } from "react-native-svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOneproduct } from "../Redux/Product/ProductActions";
import { addToCart } from "../Redux/Product/ProductActions";
import noImage from "../../assets/Noimages.png";
import { AddtowishList, RemovewishList } from "../Redux/User/UserActions";

function Product({ navigation, route }) {
  const { product, isFavorite } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetOneproduct(product));
  }, []);
  const [productVariationSelected, setProductVariationSelected] = useState([]);

  const { oneproduct, loading, productVariation } = useSelector(
    (state) => state.Product
  );
  const [quantity, setQuantity] = useState(1);
  console.log("var,", productVariation);
  useEffect(() => {
    if (quantity < 0) {
      setQuantity(0);
    }
  }, [quantity]);
  const [price, setPrice] = useState(0.6);
  const [type, settype] = useState("unit");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (oneproduct) {
      setPrice(oneproduct.price);
      setData(oneproduct);
    }
  }, [oneproduct]);
  const getFirstWordBeforeAmpersand = () => {
    if (
      data &&
      data.categories &&
      data.categories[0] &&
      data.categories[0].name
    ) {
      let firstPart = data.categories[0].name.split("&")[0]; // Get the part before '&'
      let firstWord = firstPart.trim().split(" ")[0]; // Get the first word
      return firstWord;
    }
    return ""; // Return empty string if there's no valid data
  };
  const [isFavoriteproduct, setFavoriteproduct] = useState(isFavorite);
  const favoriteandler = (e) => {
    e.preventDefault();
    // setFavoriteproduct(!isFavoriteproduct);
    if (isFavoriteproduct) {
      setFavoriteproduct(false);
      dispatch(RemovewishList(oneproduct.id));
    } else {
      setFavoriteproduct(true);
      dispatch(AddtowishList(oneproduct.id,navigation));
    }
  };
  const getSelectedVariation = () => {
    if (!productVariation || productVariation.length === 0) return null;

    return productVariation.find((variation) => {
      // Check if the variation name contains the selected type (unit or bulk)
      const matchesType = variation.name.includes(type);

      // Check if the variation's attributes match the selected attributes
      const matchesAttributes = productVariationSelected.every((selected) => {
        return variation.attributes.some(
          (attribute) =>
            attribute.name === selected.name &&
            attribute.option === selected.option
        );
      });

      return matchesType && matchesAttributes;
    });
  };

  const handleOptionSelect = (item, option) => {
    // Update the selected product variations
    setProductVariationSelected((prev) => {
      // Remove any previously selected options for the same item name
      const filteredVariations = prev.filter(
        (prevItem) => prevItem.name !== item.name
      );
      // Add the new selection
      return [...filteredVariations, { name: item.name, option: option }];
    });

    // Find and set the selected variation
    const selectedVariation = getSelectedVariation();
    if (selectedVariation) {
      setPrice(selectedVariation.price);
    }
  };
  const addToCarthandler = (e) => {
    e.preventDefault();
    const Productdata = {
      product_id: oneproduct?.id,
      quantity: quantity,
      price: price,
      productname: oneproduct?.name,
      image: productVariation[0]?.image
        ? productVariation[0]?.image?.src
        : noImage,

      productVariation: productVariationSelected,
    };
    addToCart(Productdata);
    alert("Item added to cart");
  };
  useEffect(() => {
    if (oneproduct) {
      setPrice(oneproduct.price);
      setData(oneproduct);

      // Set the default variation price (if applicable)
      const selectedVariation = getSelectedVariation();
      if (selectedVariation) {
        setPrice(selectedVariation.price);
      }
    }
  }, [oneproduct, productVariationSelected, type]);
  function removeNumbersFromString(str) {
 
    if (!str) {
      return null;
    } 
    

    return str.replace(/\d+/g, '');
  }
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.innerContainer}>
          <View style={styles.startView}>
            <Text style={styles.shopDepartment}>{removeNumbersFromString(data?.name)}</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 28 28"
              >
                <G
                  data-name="Group 57"
                  transform="translate(-391 -58)"
                  fill="none"
                  stroke="#707070"
                >
                  <Path
                    data-name="Line 1"
                    transform="translate(400.829 67.829)"
                    strokeWidth={2}
                    d="M8.833 0L0 8.833"
                  />
                  <Path
                    data-name="Line 2"
                    transform="translate(400.829 67.829)"
                    strokeWidth={2}
                    d="M8.833 8.833L0 0"
                  />
                  <G
                    data-name="Ellipse 5"
                    transform="translate(391 58)"
                    strokeWidth={1}
                  >
                    <Circle cx={14} cy={14} r={14} stroke="none" />
                    <Circle cx={14} cy={14} r={13.5} />
                  </G>
                </G>
              </Svg>
            </TouchableOpacity>
          </View>

          <View style={styles.typeSelector}>
            <TouchableOpacity
              onPress={() => settype("unit")}
              style={styles.typeButton}
            >
              <View
                style={[
                  styles.typeButtonInner,
                  type === "unit" && styles.selectedType,
                ]}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === "unit" && styles.selectedTypeText,
                  ]}
                >
                  Retail
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => settype("bulk")}
              style={styles.typeButton}
            >
              <View
                style={[
                  styles.typeButtonInner,
                  type === "bulk" && styles.selectedType,
                ]}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === "bulk" && styles.selectedTypeText,
                  ]}
                >
                  Wholesale
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {productVariation && productVariation?.length > 0 && (
            <Image
              style={styles.imagePlaceholder}
              source={{ uri: productVariation[0]?.image?.src }}
            />
          )}
          {loading && <View style={styles.imagePlaceholder}></View>}

          {productVariation && productVariation?.length === 0 && (
            <Image style={styles.imagePlaceholder} source={noImage} />
          )}

          <View style={styles.quantitySelector1}>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={() => setQuantity(quantity - 1)}
                style={styles.quantityButton}
              >
                <View style={styles.quantityButtonInner}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityButtonText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <View style={styles.quantityButtonInner}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.iconPlaceholder}
              onPress={(e) => favoriteandler(e)}
            >
              {isFavoriteproduct ? (
                <Svg
                  data-name="Group 39"
                  xmlns="http://www.w3.org/2000/svg"
                  width={30.203}
                  height={27.212}
                  viewBox="0 0 30.203 27.212"
                >
                  <G data-name="Group 58">
                    <Path
                      data-name="Path 66"
                      d="M7.736 0h1.122c.354.067.712.119 1.061.2a10.441 10.441 0 014.51 2.562c.231.208.458.42.689.632l.7-.648A10.6 10.6 0 0119.663.4c.593-.19 1.22-.272 1.832-.4h1a1.86 1.86 0 00.2.039 7.861 7.861 0 013.631 1.2A7.975 7.975 0 0130.2 8.221a14.91 14.91 0 01-2.024 7.368 24.918 24.918 0 01-4.985 6.243 41.094 41.094 0 01-6.605 4.938 2.679 2.679 0 01-2.984-.025 43.628 43.628 0 01-5.225-3.739 25.76 25.76 0 01-6.617-7.985 15.06 15.06 0 01-1.6-5C.09 9.438.053 8.851 0 8.266v-.177a2.384 2.384 0 00.052-.317 7.578 7.578 0 011.179-3.84A8.112 8.112 0 016.777.139c.317-.062.639-.093.959-.139m.488 2.75"
                      fill="#4287c8"
                    />
                  </G>
                </Svg>
              ) : (
                <Svg
                  data-name="Group 39"
                  xmlns="http://www.w3.org/2000/svg"
                  width={30.203}
                  height={27.212}
                  viewBox="0 0 30.203 27.212"
                >
                  <Defs>
                    <ClipPath id="a">
                      <Path
                        data-name="Rectangle 82"
                        fill="#4287c8"
                        d="M0 0H30.203V27.212H0z"
                      />
                    </ClipPath>
                  </Defs>
                  <G data-name="Group 38" clipPath="url(#a)">
                    <Path
                      data-name="Path 66"
                      d="M7.736 0h1.122c.354.067.712.119 1.061.2a10.441 10.441 0 014.51 2.562c.231.208.458.42.689.632l.7-.648A10.6 10.6 0 0119.663.4c.593-.19 1.22-.272 1.832-.4h1a1.86 1.86 0 00.2.039 7.861 7.861 0 013.631 1.2A7.975 7.975 0 0130.2 8.221a14.91 14.91 0 01-2.024 7.368 24.918 24.918 0 01-4.985 6.243 41.094 41.094 0 01-6.605 4.938 2.679 2.679 0 01-2.984-.025 43.628 43.628 0 01-5.225-3.739 25.76 25.76 0 01-6.617-7.985 15.06 15.06 0 01-1.6-5C.09 9.438.053 8.851 0 8.266v-.177a2.384 2.384 0 00.052-.317 7.578 7.578 0 011.179-3.84A8.112 8.112 0 016.777.139c.317-.062.639-.093.959-.139m.488 2.75c-.264.026-.529.043-.791.078A5.424 5.424 0 002.787 8 11.554 11.554 0 003.8 12.868a20.683 20.683 0 005.084 6.913 39.456 39.456 0 006.025 4.538.329.329 0 00.419-.007c.432-.292.875-.566 1.309-.855a31.707 31.707 0 006.926-6.016 15.851 15.851 0 003.743-7.575 6.754 6.754 0 00-.254-3.714 5.354 5.354 0 00-7.245-2.846 11.5 11.5 0 00-3.535 2.943 1.391 1.391 0 01-2.328-.01A12.037 12.037 0 0011.279 3.8a5.605 5.605 0 00-3.055-1.05"
                      fill="#4287c8"
                    />
                  </G>
                </Svg>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              {getFirstWordBeforeAmpersand()}
            </Text>
          </View>

          <View style={styles.leftview}>
            <Text style={styles.productName}>{removeNumbersFromString(data?.name)}</Text>
          </View>

          <Text style={styles.price}>${data?.price}</Text>

          {data && !loading &&
            data.attributes &&
            data.attributes.map(
              (item, index) =>
                item.name !== "measurement" && (
                  <View key={index} style={styles.sizeSelector}>
                    <Text style={styles.sectionTitle}>Choose {item.name}</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.sizeOptions}
                      contentContainerStyle={{ alignItems: "center", gap: 10 }}
                    >
                      {item.options &&
                        item.options.map((option, optionIndex) => (
                          <TouchableOpacity
                            key={optionIndex}
                            style={[
                              styles.sizeOption,
                              productVariationSelected.some(
                                (selected) =>
                                  selected.name === item.name &&
                                  selected.option === option
                              )
                                ? styles.selectedSize
                                : {},
                            ]}
                            onPress={() => handleOptionSelect(item, option)}
                          >
                            <Text style={styles.sizeOptionText}>
                              {option} 
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  </View>
                )
            )}

     

         <View style={styles.companyInfo}>
            <Text style={styles.sectionTitle}>Company Name</Text>
            <Text style={styles.companyDescription}>
              Info about the product goes here, and it can be up to two lines
            </Text>
          </View> 
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addToCart}
        onPress={(e) => addToCarthandler(e)}
      >
        <Text style={styles.totalPrice}>{(quantity * price).toFixed(2)}</Text>
        <Text style={styles.addToCartText}>ADD TO CART</Text>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={62}
          height={59}
          viewBox="0 0 62 59"
        >
          <Defs>
            <ClipPath id="a">
              <Path
                data-name="Rectangle 36"
                fill="#fff"
                d="M0 0H22V19.168H0z"
              />
            </ClipPath>
          </Defs>
          <G data-name="Group 49" transform="translate(-149 -472)">
            <Path
              data-name="Rectangle 88"
              transform="translate(149 472)"
              fill="#0f2573"
              d="M0 0H62V59H0z"
            />
            <G data-name="Group 46">
              <G
                data-name="Group 31"
                clipPath="url(#a)"
                transform="translate(169 493.406)"
              >
                <Path
                  data-name="Path 59"
                  d="M7.211 16.107h-.712a3.8 3.8 0 01-.5-.018.863.863 0 01-.743-.732L4.285 9.85 3.379 4.7c-.162-.92-.326-1.839-.486-2.759-.016-.092-.047-.128-.146-.128h-1.8A.921.921 0 010 .913.9.9 0 01.93 0h2.7a.9.9 0 01.94.8c.084.494.172.988.249 1.483.015.1.056.113.142.113H21.073a.9.9 0 01.909 1.104q-.458 2.6-.909 5.2c-.19 1.089-.376 2.179-.568 3.267a.92.92 0 01-.915.769H6.626l.109.628c.049.274.1.547.146.823.014.091.055.108.136.108h11.378a.9.9 0 11.032 1.806c-.291.005-.583 0-.917 0a1.649 1.649 0 01.826 1.267 1.564 1.564 0 01-.536 1.392 1.629 1.629 0 01-2.265-.109 1.58 1.58 0 01-.414-1.354 1.646 1.646 0 01.81-1.182H8.812a1.643 1.643 0 01.818 1.313 1.555 1.555 0 01-.613 1.389 1.626 1.626 0 01-2.263-.244 1.665 1.665 0 01.457-2.467M5.142 4.2l1.179 6.7h12.513l1.179-6.7z"
                  fill="#fff"
                />
              </G>
            </G>
            <G
              data-name="Ellipse 4"
              transform="translate(184 490)"
              fill="#fff"
              stroke="#0f2573"
              strokeWidth={1}
            >
              <Circle cx={6} cy={6} r={6} stroke="none" />
              <Circle cx={6} cy={6} r={5.5} fill="none" />
            </G>
            <Path
              data-name="Path 71"
              d="M-.545-4.368V-2.5h-1.19v-1.868h-1.854v-1.181h1.854V-7.4h1.19v1.854H1.31v1.181z"
              transform="translate(191.252 500.954)"
              fill="#0f2573"
            />
          </G>
        </Svg>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0F2573" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "flex-end", // Ensures the addToCart is at the bottom
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 85, // Provide space for the add to cart button
  },
  innerContainer: {
    paddingTop: 20,
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  startView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    marginTop: "7%",
    height: 50,
    position: "relative",
  },
  shopDepartment: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D6183",
    textAlign: "center",
  },
  goBackButton: {
    position: "absolute",
    right: 20,
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  typeButton: {
    width: "50%",
    height: 59,
  },
  typeButtonInner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#E2EAF2",
  },
  selectedType: {
    backgroundColor: "#0F2573",
    opacity: 1,
  },
  typeButtonText: {
    fontSize: 14,
    color: "#3D6183",
    fontWeight: "bold",
    zIndex: 10,
  },
  selectedTypeText: {
    color: "white",
  },
  imagePlaceholder: {
    width: "90%",
    height: 200,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 48,
    backgroundColor: "#E1EAF1",
    position: "relative",
  },
  quantitySelector1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    position: "relative",
  },
  quantityButton: {
    width: "30%",
    height: "100%",
  },
  quantityButtonInner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRightWidth: 2,
    borderRightColor: "white",
    borderLeftWidth: 2,
    borderLeftColor: "white",
  },
  quantityDisplay: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "100%",
  },
  quantityButtonText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  iconPlaceholder: {
    position: "absolute",
    right: 50,
  },
  category: {
    width: 82,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4287C8",
  },
  categoryText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  leftview: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  productName: {
    fontSize: 16,
    color: "#3D6183",
    fontWeight: "bold",
  },
  price: {
    fontSize: 26,
    color: "#3D6183",
    fontWeight: "bold",
  },
  sizeSelector: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#3D6183",
    fontWeight: "bold",
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 10,
  },
  sizeOption: {
    paddingHorizontal: 15,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D6183",
  },
  selectedSize: {
    backgroundColor: "#0F2573",
  },
  sizeOptionText: {
    color: "white",
    fontSize: 15,
  },
  sizeOptionTextSelected: {
    color: "#0F2573",
    fontSize: 15,
  },
  companyInfo: {
    width: "90%",
  },
  companyDescription: {
    fontSize: 14,
    color: "#3D6183",
  },
  addToCart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 85,
    backgroundColor: "#0F2573",
    position: "absolute",
    bottom: 0,
  },
  totalPrice: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  addToCartText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  loading: {
    height: "100%",
    width: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    opacity: 0.1,
  },
});

export default Product;
