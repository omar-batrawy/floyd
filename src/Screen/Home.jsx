import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ display: "flex", gap: 90, flexDirection: "column" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Splash")}>
          <Text
            style={{
              fontSize: 20,

              fontWeight: "bold",
            }}
          >
            spalsh
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              fontSize: 20,

              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              fontSize: 20,

              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddLocation")}>
          <Text
            style={{
              fontSize: 20,

              fontWeight: "bold",
            }}
          >
            AddLocation
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    marginLeft: "4%",
    marginRight: "6%",
    flex: 1,
    flexDirection: "column",
    gap: 30,
  },

  Title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  good: {
    fontSize: 26,
    color: "#D3D3D3",
  },
});

export default Home;
