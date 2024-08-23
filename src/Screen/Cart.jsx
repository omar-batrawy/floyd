import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { G, Path, TSpan, Text as Textsvg } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "../Component/CartContainer";
import FloyDLogoTab from "../Component/FloyDLogoTab";
import { AddOrder } from './../Redux/Order/OrderActions';
import { getShipping } from './../Redux/User/UserActions';
import { PaymentRequest } from "../Redux/Payment/PaymentActions";

const CustomRadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#0F2573",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "#0F2573",
            }}
          />
        ) : null}
      </View>
      <Text style={{ marginLeft: 10 }}>{label}</Text>
    </TouchableOpacity>
  );
};

function Cart({ navigation }) {
  const dispatch = useDispatch();
  const [storedName, setStoredName] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPhone, setStoredPhone] = useState("");

  useEffect(() => {
    const getFromAsyncStorage = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPhone = await AsyncStorage.getItem('phone');
      setStoredName(storedName);
      setStoredEmail(storedEmail);
      setStoredPhone(storedPhone);
    };
    getFromAsyncStorage();
  }, []);

  const [shipping, setShipping] = useState(null);
  const [billing, setBilling] = useState(null);
const phoneValidregex = /^(\+231|231)?([27]\d{7})$/;
const phoneValid = phoneValidregex.test(storedPhone);

  const checkout = async (e) => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items to the cart before proceeding to checkout.");
      return;
    }
    if (!shipping) {
      Alert.alert("Shipping Address", "Please select a shipping address before proceeding to checkout.");
      return;
    }

    if(paymentMethod === "credit" && !storedPhone) {
      Alert.alert("Phone number", "Please add a phone number before proceeding to checkout.");
      return
    }

    if(paymentMethod === "credit" && !phoneValid) {
      Alert.alert("Phone number", "Please enter a valid phone number before proceeding to checkout.");
      return
    }
    if(selectAddress === 0) {
      Alert.alert("Shipping Address", "Please select a shipping address before proceeding to checkout.");
      return;
    }
    
    e.preventDefault();
    const line_items = cart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    const shipping_lines = [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ];

    // const payment_method = "bacs";
    // const payment_method_title = "Direct Bank Transfer";
    const payment_method = paymentMethod === "cash" ? "cod" : "momo";
    const payment_method_title = paymentMethod === "cash" ? "Cash on delivery" : "MTN";

    dispatch(AddOrder(line_items, shipping, shipping_lines, billing, payment_method, payment_method_title));
    if (paymentMethod == "credit") {
      console.log("Price:", price);
      dispatch(PaymentRequest(price, storedPhone));
    }
    getCart();
  };

  useEffect(() => {
    dispatch(getShipping());
  }, [dispatch]);

  const shippingInfo = useSelector((state) => state.user.shippinfo);
  const [viewertype, setViewType] = useState("Profile");
  const [token, setToken] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [verified, setVerified] = useState("");

  const getToken = async () => {
    setToken(await AsyncStorage.getItem("token"));
    setVerified(await AsyncStorage.getItem("verfied"));
  };
  getToken();

  const LoginHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const [cart, setCart] = useState([]);
  const getCart = async () => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      setCart(cart ? JSON.parse(cart) : []);
    } catch (error) {
      console.error("Error getting cart", error);
      return [];
    }
  };
  useFocusEffect(
    useCallback(() => {
      getCart();
    }, [])
  );

  const AddLocationHandler = (e) => {
    e.preventDefault();
    navigation.navigate('AddLocation');
  };

  const updateCart = async (newCart) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    } catch (error) {
      console.error(error);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [shippingID, setShippingID] = useState(0);

  //setselected shipping address the first one in the list by default
  useEffect(() => {
    if (shippingInfo && shippingInfo.length > 0) {
      selectAddress(0);
    }
  }, [shippingInfo]);

  const removeFromCart = async (itemId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const updatedCart = cart.filter((item) => item.product_id !== itemId);
              setCart(updatedCart);
              await updateCart(updatedCart);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateQauntity = async (itemId, quantity) => {
    try {
      const updatedCart = cart.map((item) =>
        item.product_id === itemId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
      await updateCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const [price, setPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setPrice(total);
  }, [cart]);

  const selectAddress = (index) => {
    const selectedShipping = shippingInfo[index];

    if (selectedShipping) {
      const address = {
        first_name: storedName,
        last_name: storedName,
        address_1: selectedShipping.address_1,
        address_2: selectedShipping.address_2 || '',
        city: selectedShipping.city,
        state: selectedShipping.state,
        postcode: selectedShipping.postcode,
        country: selectedShipping.country,
      };

      setShipping(address);
      setBilling(address);
    }
  };

  if (
    token == "" ||
    token == null ||
    token == undefined ||
    verified == "false"
  ) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 16,
            color: "#0F2573",
            fontWeight: "bold",
            textAlign: "center",
            width: "80%",
          }}
        >
          Welcome! Please log in to your account, fill your bag, and get your
          orders delivered to your doorstep.
        </Text>
        <TouchableOpacity
          onPress={() => LoginHandler()}
          style={{
            backgroundColor: "#0F2573",
            width: 150,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <FloyDLogoTab navigation={navigation} showHearIcon={false} />

        <View style={styles.menu}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false} // Disable vertical scrollbar
            showsHorizontalScrollIndicator={false} // Disable horizontal scrollbar
          >
            {cart?.map((item, i) => (
              <CartContainer
                key={i}
                prop={{
                  ...item,
                  productName: item.productname,
                  price: item.price,
                  quantity: item.quantity,
                  id: item.product_id,
                  image: item.productimage,
                }}
                navigateTo="Cheese"
                removeFromCart={removeFromCart}
                updateQauntity={updateQauntity}
              />
            ))}

            <View style={styles.secondContainer}>
              <Text
                style={{ fontSize: 16, color: "#0F2573", fontWeight: "bold" }}
              >
                Total
              </Text>
              <Text
                style={{ fontSize: 16, color: "#3D6183", fontWeight: "bold" }}
              >
                ${price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.thirdContainer}>
              <Text style={{ fontSize: 16, color: "#0F2573", fontWeight: "bold" }}>
                Payment
              </Text>
              <View>
                <CustomRadioButton
                  selected={paymentMethod === "cash"}
                  onPress={() => setPaymentMethod("cash")}
                  label="Cash on Delivery"
                />
                <CustomRadioButton
                  selected={paymentMethod === "credit"}
                  onPress={() => setPaymentMethod("credit")}
                  label="Credit Card"
                />
              </View>
            </View>
            <View style={[styles.secondContainer, { marginTop: 10 }]}>
              <Text
                style={{ fontSize: 16, color: "#0F2573", fontWeight: "bold" }}
              >
                Delivering to
              </Text>
              <TouchableOpacity
                onPress={() => setEditMode(true)}
              >
                <Text
                  style={{ fontSize: 14, color: "#3D6183" }}
                >
                  Change Location{" "}
                </Text>
              </TouchableOpacity>
            </View>

            {shipping && (
              <Text style={{ fontSize: 16, color: "#0F2573" }}>
                {`${shipping.country}, ${shipping.city}, ${shipping.state}, ${shipping.address_1}, Postal code: ${shipping.postcode}`}
              </Text>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={(e) => checkout(e)}>
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            CONFIRM ORDER
          </Text>
        </TouchableOpacity>

        {editMode && (
          <TouchableOpacity
            onPress={() => setEditMode(false)}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "30%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "5%",
                borderRadius: 10,
              }}
            >
              <ScrollView
                style={{ width: "100%", height: "100%" }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {shippingInfo && shippingInfo.length > 0 && shippingInfo.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationContainer}
                    onPress={() => {
                      setShippingID(index);
                      selectAddress(index);
                      setEditMode(false);
                    }}
                  >
                    <Text style={styles.locationText}>
                      {`${item.country}, ${item.city}, ${item.state}, ${item.address_1}, Postal code: ${item.postcode}`}
                    </Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={(e) => AddLocationHandler(e)}
                  style={styles.locationContainer}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#8babc9",
                    }}
                  >
                    Add New Location
                  </Text>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={45.882}
                    height={45.882}
                    viewBox="0 0 45.882 45.882"
                  >
                    <G data-name="Group 72">
                      <G data-name="Group 71">
                        <G data-name="Group 70" fill="#8babc9">
                          <Path
                            data-name="Path 72"
                            d="M30.208 9.6a15.773 15.773 0 101.236 6.12 15.67 15.67 0 00-1.236-6.12m-.5 12.027a15.227 15.227 0 111.192-5.905 15.124 15.124 0 01-1.193 5.907"
                            transform="translate(-358.059 -360.059) rotate(45 -244.983 640.29)"
                          />
                          <Path
                            data-name="Path 72 - Outline"
                            d="M15.722 31.944A16.226 16.226 0 019.407.775a16.226 16.226 0 0112.629 29.894 16.121 16.121 0 01-6.314 1.275zm0-30.9a14.68 14.68 0 00-5.712 28.2A14.68 14.68 0 0021.434 2.2a14.583 14.583 0 00-5.712-1.154z"
                            transform="translate(-358.059 -360.059) rotate(45 -244.983 640.29)"
                          />
                        </G>
                      </G>
                      <Textsvg
                        data-name="+"
                        transform="translate(-358.059 -360.059) translate(381 390)"
                        fill="#8babc9"
                        fontSize={22}
                        fontFamily="Helvetica-Bold, Helvetica"
                        fontWeight={700}
                      >
                        <TSpan x={-6} y={0}>
                          {"+"}
                        </TSpan>
                      </Textsvg>
                    </G>
                  </Svg>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableOpacity>
        )}
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
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#0F2573",
  },
  locationContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: 10,
  },
  header: {
    width: "100%",
    height: 130,
    backgroundColor: "#0F2573",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  menu: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
  },
  scrollView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  scrollViewContent: {
    paddingBottom: "25%",
    paddingTop: "10%",
  },
  confirmButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#0F2573",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "5%",
  },
  thirdContainer: {
    width: "100%",
    backgroundColor: "white",
    height: 180,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    paddingVertical: "8%",
    justifyContent: "space-between",
  },
});

export default Cart;
