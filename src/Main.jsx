import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import AddLocation from "./Screen/AddLocation";
import Cart from "./Screen/Cart";
import CategoryProduct from "./Screen/CategoryProduct";
import ForgetPassword from "./Screen/ForgetPassword";
import Home from "./Screen/Home";
import HomePage from "./Screen/HomePage";
import Login from "./Screen/Login";
import MyInfo from "./Screen/MyInfo";
import Offer from "./Screen/Offer";
import ProductDetails from "./Screen/ProductDetails";
import Register from "./Screen/Register";
import Splash from "./Screen/Splash";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavBar({ route }) {
  
  const getTabBarIcon = (routeName, focused) => {
    const activeColor = "#0F2573"; // Define the color for active icons
    const inactiveColor = "#8BABC9"; // Define the color for inactive icons
    if (routeName === "Home") {
      return (
    
        <Svg
        data-name="Group 37"
        xmlns="http://www.w3.org/2000/svg"
        width={20.725}
        height={19.174}
        viewBox="0 0 20.725 19.174"
      >
        <Defs>
          <ClipPath id="a">
            <Path
              data-name="Rectangle 80"
              fill={focused ? activeColor : inactiveColor}
              d="M0 0H20.725V19.174H0z"
            />
          </ClipPath>
        </Defs>
        <G data-name="Group 36" clipPath="url(#a)">
          <Path
            data-name="Path 65"
            d="M2.557 8.344l-.624.52c-.207.173-.411.348-.62.518a.788.788 0 01-1.122-.065.778.778 0 01.114-1.128Q1.839 6.9 3.379 5.613l4-3.353Q8.622 1.224 9.862.187a.767.767 0 011.007 0q1.617 1.35 3.23 2.7l4.923 4.121 1.415 1.186a.783.783 0 11-1 1.2c-.372-.3-.738-.617-1.106-.926l-.15-.123V15.998a3.166 3.166 0 01-2.661 3.126 3.5 3.5 0 01-.546.038q-3.378.006-6.755.006c-.88 0-1.761 0-2.641-.01a3.158 3.158 0 01-2.984-2.7 4.18 4.18 0 01-.03-.488V8.344m10.974 9.265h1.43a1.616 1.616 0 001.656-1.661V7.202a.313.313 0 00-.126-.268Q13.947 4.808 11.4 2.677l-1.04-.87-.1.079-2.216 1.862-3.8 3.174a.338.338 0 00-.135.291q.006 4.373 0 8.746a1.605 1.605 0 001.646 1.651h1.284c.046 0 .092 0 .151-.008v-.2-5.845a.767.767 0 01.819-.821c1.549 0 3.1.011 4.647-.006a.833.833 0 01.873.867c-.015 1.939-.006 3.877-.006 5.816zM8.767 17.6h3.2v-5.294h-3.2z"
            transform="translate(0 .001)"
            fill={focused ? activeColor : inactiveColor}
            />
        </G>
      </Svg>
      );
    } else if (routeName === "SHOP") {
      return (
        <Svg
        data-name="Group 37"
        xmlns="http://www.w3.org/2000/svg"
        width={20.725}
        height={19.174}
        viewBox="0 0 20.725 19.174"
      >
        <Defs>
          <ClipPath id="a">
            <Path
              data-name="Rectangle 80"
              fill={focused ? activeColor : inactiveColor}
              d="M0 0H20.725V19.174H0z"
            />
          </ClipPath>
        </Defs>
        <G data-name="Group 36" clipPath="url(#a)">
          <Path
            data-name="Path 65"
            d="M2.557 8.344l-.624.52c-.207.173-.411.348-.62.518a.788.788 0 01-1.122-.065.778.778 0 01.114-1.128Q1.839 6.9 3.379 5.613l4-3.353Q8.622 1.224 9.862.187a.767.767 0 011.007 0q1.617 1.35 3.23 2.7l4.923 4.121 1.415 1.186a.783.783 0 11-1 1.2c-.372-.3-.738-.617-1.106-.926l-.15-.123V15.998a3.166 3.166 0 01-2.661 3.126 3.5 3.5 0 01-.546.038q-3.378.006-6.755.006c-.88 0-1.761 0-2.641-.01a3.158 3.158 0 01-2.984-2.7 4.18 4.18 0 01-.03-.488V8.344m10.974 9.265h1.43a1.616 1.616 0 001.656-1.661V7.202a.313.313 0 00-.126-.268Q13.947 4.808 11.4 2.677l-1.04-.87-.1.079-2.216 1.862-3.8 3.174a.338.338 0 00-.135.291q.006 4.373 0 8.746a1.605 1.605 0 001.646 1.651h1.284c.046 0 .092 0 .151-.008v-.2-5.845a.767.767 0 01.819-.821c1.549 0 3.1.011 4.647-.006a.833.833 0 01.873.867c-.015 1.939-.006 3.877-.006 5.816zM8.767 17.6h3.2v-5.294h-3.2z"
            transform="translate(0 .001)"
            fill={focused ? activeColor : inactiveColor}
            />
        </G>
      </Svg>
      );
    } 
    else if (routeName === "ME") {
      return (
     
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={21.089}
        height={21.089}
        viewBox="0 0 21.089 21.089"
      >
        <Defs>
          <ClipPath id="a">
            <Path
              data-name="Rectangle 84"
              fill={focused ? activeColor : inactiveColor}      
              d="M0 0H21.089V21.089H0z"
            />
          </ClipPath>
        </Defs>
        <G data-name="Group 43">
          <G
            data-name="Group 42"
            transform="translate(0 .004) translate(0 -.004)"
            clipPath="url(#a)"
          >
            <Path
              data-name="Path 70"
              d="M20.261 6.436a10.579 10.579 0 10.829 4.1 10.545 10.545 0 00-.829-4.1m-.319 8.074a10.186 10.186 0 01-.63 1.243 18.08 18.08 0 00-.546-.211 4.687 4.687 0 00-.563-.189c-.453-.1-.906-.2-1.352-.334a4.036 4.036 0 01-.595-.213.438.438 0 01-.247-.31 1.855 1.855 0 01-.046-.496c0-.053 0-.054.057-.055a2.766 2.766 0 01.455.037 2.771 2.771 0 00.613.042.9.9 0 00.454-.16.4.4 0 00.166-.255.759.759 0 00-.014-.324c-.071-.311-.15-.621-.21-.935a6.629 6.629 0 01-.1-.816c-.012-.188-.013-.376-.019-.564v-.13c-.014-.246-.031-.492-.041-.738-.007-.168 0-.336 0-.5 0-.188.008-.376-.011-.564a2.906 2.906 0 00-.073-.435 1.1 1.1 0 00-.243-.494.158.158 0 01-.019-.033 2.6 2.6 0 00-.565-.695 1.456 1.456 0 00-.36-.241 1.68 1.68 0 00-.879-.14 1.849 1.849 0 00-.847.3c-.1.064-.2.128-.288.2a.122.122 0 01-.137.017.9.9 0 00-.365-.064 2.173 2.173 0 00-.311.026 1.269 1.269 0 00-.672.334 2 2 0 00-.453.663 1.284 1.284 0 00-.11.51q0 .511.03 1.021a10.892 10.892 0 01-.007 1.158c-.011.18-.018.361-.039.539a5.549 5.549 0 01-.128.711c-.067.263-.143.524-.2.79a1 1 0 000 .446.492.492 0 00.387.388.853.853 0 00.174.021 3.92 3.92 0 00.471-.035c.227-.022.454-.048.682-.063.04 0 .041.016.042.044a2.1 2.1 0 01-.049.5.432.432 0 01-.278.328c-.128.051-.256.1-.388.138-.441.128-.891.221-1.341.311a3.154 3.154 0 00-.521.14c-.384.148-.761.314-1.14.476a1.249 1.249 0 00-.49.389 1.745 1.745 0 00-.34.75 7.09 7.09 0 00-.043.247c-.028.18-.056.361-.082.542s-.045.352-.067.529l-.056.453-.051.446c-.023.2-.048.4-.07.6-.018.159-.032.318-.05.477l-.022.192q-.168-.036-.335-.077.013-.132.028-.263c.028-.244.059-.489.086-.733s.059-.514.091-.771c.035-.279.069-.559.108-.838s.082-.583.138-.872a1.977 1.977 0 01.569-1.086 1.318 1.318 0 01.335-.249c.115-.055.232-.1.349-.154.3-.133.607-.262.917-.376l.209-.078c-.01-.02-.024-.019-.036-.023-.171-.049-.345-.086-.511-.15a5.8 5.8 0 01-1.049-.558.678.678 0 01-.286-.382 1.839 1.839 0 01-.077-.487c0-.081 0-.162-.01-.244a.179.179 0 01.029-.145 2.778 2.778 0 00.5-1.044c.016-.063.016-.061.083-.05.114.018.129.006.175-.077a.932.932 0 00.048-.1 2.881 2.881 0 00.225-.733 1.7 1.7 0 00.033-.417.266.266 0 00-.088-.188.148.148 0 00-.156-.03c-.018.007-.029 0-.026-.024a.293.293 0 01.011-.037c.052-.178.1-.356.157-.533a2.118 2.118 0 00.1-.514 3.158 3.158 0 00-.089-1 1.246 1.246 0 00-.225-.479 2.059 2.059 0 00-.518-.435 6.063 6.063 0 00-.986-.477 1.343 1.343 0 00-.814-.061 1.579 1.579 0 00-.662.331.06.06 0 01-.081.011.388.388 0 00-.063-.027.774.774 0 00-.457-.031 1.106 1.106 0 00-.333.148c-.148.09-.287.193-.428.293a.949.949 0 00-.315.394 2.514 2.514 0 00-.181.821c-.008.091-.006.183-.021.273a.968.968 0 00.014.333 3.556 3.556 0 00.182.615c.03.08.062.159.1.25a.2.2 0 00-.223.017.424.424 0 00-.16.268.905.905 0 000 .235 1.785 1.785 0 00.132.553c.062.142.126.283.183.427s.091.148.228.1h.007c.06-.022.063-.021.078.038a5.916 5.916 0 00.433 1.146.254.254 0 01.027.117c0 .084-.011.167-.015.251a2.5 2.5 0 01-.065.459.734.734 0 01-.339.478c-.145.089-.288.183-.438.263a3.722 3.722 0 01-.91.365 2.71 2.71 0 00-.4.12q-.717.291-1.432.587a1.33 1.33 0 00-.222.1 1.5 1.5 0 00-.171.129 10.2 10.2 0 1118.073-1.393"
              transform="translate(0 .004)"
              fill={focused ? activeColor : inactiveColor}             />
          </G>
        </G>
      </Svg>
      );
    }

    else if (routeName === "OFFER") {
      return (
        <Svg
        data-name="Group 41"
        xmlns="http://www.w3.org/2000/svg"
        width={20.061}
        height={19.174}
        viewBox="0 0 20.061 19.174"
      >
        <Defs>
          <ClipPath id="a">
            <Path
              data-name="Rectangle 83"
              fill={focused ? activeColor : inactiveColor}
              d="M0 0H20.061V19.174H0z"
            />
          </ClipPath>
        </Defs>
        <G data-name="Group 40" clipPath="url(#a)"               fill={focused ? activeColor : inactiveColor}
>
          <Path
            data-name="Path 67"
            d="M177.073 165.618a1.009 1.009 0 101.023 1 1.022 1.022 0 00-1.023-1"
            transform="translate(-164.503 -154.738)"
          />
          <Path
            data-name="Path 68"
            d="M18.2 6.933c-.3-.939.516-2.461-.052-3.243s-2.28-.476-3.069-1.05S14.07.35 13.131.045c-.906-.294-2.1.957-3.1.957S7.836-.249 6.93.045c-.939.3-1.164 2.026-1.946 2.6S2.49 2.9 1.915 3.69s.252 2.3-.052 3.243C1.569 7.839 0 8.583 0 9.587s1.569 1.748 1.863 2.654c.3.939-.516 2.461.052 3.243s2.28.476 3.069 1.05 1.007 2.29 1.946 2.6c.906.294 2.1-.957 3.1-.957s2.194 1.251 3.1.957c.939-.3 1.164-2.026 1.946-2.6s2.494-.261 3.069-1.05-.252-2.3.052-3.243c.294-.906 1.863-1.65 1.863-2.654s-1.568-1.748-1.86-2.654M7.47 5.311a1.908 1.908 0 11-1.9 1.912 1.92 1.92 0 011.9-1.912m-.613 8.246a2.711 2.711 0 01-.427.306 2.041 2.041 0 01-.364-.294.35.35 0 01.006-.448c.159-.2.33-.387.5-.574q3.167-3.461 6.336-6.92c.054-.059.108-.119.166-.173a.455.455 0 01.613-.038.431.431 0 01.047.624c-.292.343-.6.671-.906 1q-2.983 3.26-5.971 6.517m5.688.239a1.907 1.907 0 111.948-1.884 1.926 1.926 0 01-1.948 1.888"
          />
          <Path
            data-name="Path 69"
            d="M99.466 96.541a1.009 1.009 0 10-1.008-1 1.013 1.013 0 001.008 1"
            transform="translate(-91.99 -88.313)"
          />
        </G>
      </Svg>
      );
    }     
    else if (routeName === "CART") {
      return (

        <Svg
        data-name="Group 32"
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={19.168}
        viewBox="0 0 22 19.168"
      >
        <Defs>
          <ClipPath id="a">
            <Path data-name="Rectangle 36" fill={focused ? activeColor : inactiveColor} d="M0 0H22V19.168H0z" />
          </ClipPath>
        </Defs>
        <G data-name="Group 31" clipPath="url(#a)">
          <Path
            data-name="Path 59"
            d="M7.211 16.107h-.712a3.8 3.8 0 01-.5-.018.863.863 0 01-.743-.732L4.285 9.85 3.379 4.7c-.162-.92-.326-1.839-.486-2.759-.016-.092-.047-.128-.146-.128h-1.8A.921.921 0 010 .913.9.9 0 01.93 0h2.7a.9.9 0 01.94.8c.084.494.172.988.249 1.483.015.1.056.113.142.113H21.073a.9.9 0 01.909 1.104q-.458 2.6-.909 5.2c-.19 1.089-.376 2.179-.568 3.267a.92.92 0 01-.915.769H6.626l.109.628c.049.274.1.547.146.823.014.091.055.108.136.108h11.378a.9.9 0 11.032 1.806c-.291.005-.583 0-.917 0a1.649 1.649 0 01.826 1.267 1.564 1.564 0 01-.536 1.392 1.629 1.629 0 01-2.265-.109 1.58 1.58 0 01-.414-1.354 1.646 1.646 0 01.81-1.182H8.812a1.643 1.643 0 01.818 1.313 1.555 1.555 0 01-.613 1.389 1.626 1.626 0 01-2.263-.244 1.665 1.665 0 01.457-2.467M5.142 4.2l1.179 6.7h12.513l1.179-6.7z"
            fill={focused ? activeColor : inactiveColor}
          />
        </G>
      </Svg>
        
      );
    }
       
    // Default icon if routeName doesn't match any of the above conditions
    return <AntDesign name="default-icon" size={10} color="black" />;
  };

  return {
    tabBarIcon: ({ focused, color, size }) =>
      getTabBarIcon(route.name, focused),
  };
}

function BottomTabNavigator() {



  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#0F2573",
      tabBarInactiveTintColor: "#8BABC9",
      ...BottomNavBar({ route }),
    })}
  >
  



      {false && <Tab.Screen name="Home" component={Home} />}
      <Tab.Screen
        name="SHOP"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OFFER"
        component={Offer}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ME"
        component={MyInfo}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen

        name="CART"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />



{/* this how to initialize the tab  */}
      {/* <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
}

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      {/* <Stack.Screen
        name="Profile1"
        component={Profile}
        options={({ navigation }) => ({
          ...commonScreenOptions,
          headerLeft: () => null,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Faq"
        component={Faq}
        options={({ navigation }) => ({
          ...commonScreenOptions,
          ...commonHeaderStyles,
          headerLeft: () => <BackButton navigation={navigation} />,
          title: "FAQ",
        })}
      /> */}

    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="SHOP">
   <Tab.Screen
        name="Homepage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />

<Tab.Screen
        name="Category"
        component={CategoryProduct}
        options={{
          headerShown: false,
        }}
      />
<Tab.Screen

        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
         {/*  <Stack.Screen
        name="Faq"
        component={Faq}
        options={({ navigation }) => ({
          ...commonScreenOptions,
          ...commonHeaderStyles,
          headerLeft: () => <BackButton navigation={navigation} />,
          title: "FAQ",
        })}
      /> */}

    </Stack.Navigator>
  );
};

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Homepage"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        
         <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
             <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
             <Stack.Screen
          name="AddLocation"
          component={AddLocation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            headerShown: false,
          }}
        />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
