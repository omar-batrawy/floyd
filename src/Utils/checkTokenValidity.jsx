import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkTokenValidity = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const verified = await AsyncStorage.getItem("verfied");

    if (token && verified === "true") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
