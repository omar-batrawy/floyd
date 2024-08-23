import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductinShop from "../Component/ProductinShop";
import test1 from "./../../assets/Images/bread.png";


const Wish = ({ navigation }) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <ScrollView contentContainerStyle={styles.categoryContainer}>
      {!user?.whishlistLoading && user?.whishlist?.map((item, i) => (
        <ProductinShop
          key={i}
          navigation={navigation}
          prop={{
            productimage: item.variation_data.image,
            productname: item.variation_data.name,
            price: item.variation_data.price,
            favorite: true,
            id: item.product_id,
            loading: false,
          }}
          navigateTo="ProductDetails"
          />
      ))}

{user?.whishlistLoading &&
          [...Array(4)].map((_, index) => (
            <ProductinShop key={index} prop={{ loading: true }} />
          ))}

{!user?.whishlistLoading && user?.whishlist?.length === 0 && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "#3D6183" , fontWeight :"bold" }}>
            Your wishlist is empty
          </Text>
        </View>
      )
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 10,
    width: "100%",
  },
});

export default Wish;
