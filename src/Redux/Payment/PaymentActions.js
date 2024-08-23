import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get UUID and store it in AsyncStorage
const GetUiid = async () => {
  try {
    const res = await axios.get("https://www.uuidgenerator.net/api/version1");
    await AsyncStorage.setItem("uuid", res.data.trim());
  } catch (error) {
    console.log("Error generating UUID:", error);
  }
};

// Function to generate the payment token and store it in AsyncStorage
export const GenrateToken = async () => {
  try {
    // Ensure UUID is generated before requesting the token
    await GetUiid();

    const response = await axios.post(
      "https://sandbox.momodeveloper.mtn.com/collection/token/",
      null,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "4a1908ef0d3f4553a62f8b1eb45c1917",
        },
        auth: {
          username: "d678553d-1830-4ac1-95b4-e8f6b9128a6b",
          password: "c97a7179b1314219a53d09db71298f9e",
        },
        maxBodyLength: Infinity,
      }
    );

    // Store the token in AsyncStorage
    await AsyncStorage.setItem("Paymenttoken", response.data.access_token);
  } catch (error) {
    console.log("Error generating token:", error);
  }
};

// Function to generate credentials (UUID and Token)
const generateCredential = async () => {
  try {
    await GenrateToken(); // This will also generate UUID first
  } catch (error) {
    console.log("Error generating credentials:", error);
  }
};

// Function to handle payment request
export const PaymentRequest = (amount, phone) => async (dispatch) => {
  try {
    await generateCredential();

    // Retrieve the token and UUID from AsyncStorage
    const token = await AsyncStorage.getItem("Paymenttoken");
    const uuid = await AsyncStorage.getItem("uuid");

    console.log("UUID:", uuid);
    console.log("Token:", token);

    // Make the payment request
    const response = await axios.post(
      "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
      {
        "amount": amount,
        "currency": "EUR",
        "externalId": uuid,
        "payer": {
          "partyIdType": "MSISDN",
          "partyId": phone,
        },
        "payerMessage": "Payment for services",
        "payeeNote": "Thank you for your business",
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "4a1908ef0d3f4553a62f8b1eb45c1917",
          "x-target-environment": "sandbox",
          "x-reference-id": uuid,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token retrieved from AsyncStorage
        },
      }
    );

    // Handle the response as needed
    console.log("Payment request completed");
    console.log(response.data);
  } catch (error) {
    // console.log("Error processing payment request:", error?.response?.data?.message);
    console.log("Error processing payment request:", error?.response?.data?.message);
  }
};
