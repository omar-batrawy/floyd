import { StyleSheet } from "react-native";
import Main from "./src/Main";
import store from "./src/Redux/store";
import { Provider } from "react-redux";
import { usePushNotifications } from "./usePushNotifications";

export default function App() {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);


  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: false,
  //   }),
  // });
  
  // const setInAsyncStorage = async (key, value) => {
  //   try {
  //     await AsyncStorage.setItem(key, value);
  //   } catch (error) {
  //     console.log("Error in setInAsyncStorage", error);
  //   }
  // };
  // useEffect(() => {
  //   console.log("regestring for push notification");
  //   registerForPushNotificationsAsync()
  //     .then((token) => {
  //       console.log("token12333", token);
  //       setExpoPushToken(token);
  //       setInAsyncStorage("expoPushToken", token);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, []);
  global.API_URL = "https://floydcenter.com/floyd-center/wp-json";

  
  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     token = (
  //       await Notifications.getExpoPushTokenAsync({
  //         projectId: "cad8549c-86fe-4530-be81-b3015da04fcd",
  //       })
  //     ).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }

  // const sendNotification = () => {
  //   console.log("sending notification");
  // };
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
