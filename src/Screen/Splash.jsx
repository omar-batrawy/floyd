import React, { useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { checkTokenValidity } from "../Utils/checkTokenValidity";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  Rect,
  TSpan,
} from "react-native-svg";
import { Text as Textsvg } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "../Redux/Category/CategoryActions";

function Splash({ navigation }) {



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategories());
  }
  , []);

const setAsyncStorage = async (variablr,value) => {
  try {
    await AsyncStorage.setItem(variablr, value);
  }
  catch (error) {
  }
}



  useEffect(() => {
    const auth = {
      username: 'ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d',
      password: 'cs_6e8345aca193952cb934dc311a202928a0cd3bf0'
    };
  
    const storeAuthData = async () => {
      await setAsyncStorage("basicAuth", JSON.stringify(auth));
    };

    storeAuthData();




    const checkAndNavigate = async () => {
      setTimeout(async () => {
        const tokenValid = await checkTokenValidity();

        if (tokenValid) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Homepage" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
    }, 1000);

    };

    checkAndNavigate();
  }, []);

  return (
    <ImageBackground
      source={require("./../../assets/backgorund.png")} // Replace './path_to_your_image.jpg' with the actual path to your image
      style={[styles.backgroundImage]}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={530}
          height={1132}
          viewBox="0 0 430 932"
        >
          <Defs>
            <LinearGradient
              id="a"
              x1={0.5}
              x2={0.5}
              y2={1}
              gradientUnits="objectBoundingBox"
            >
              <Stop offset={0} stopColor="#0f2573" />
              <Stop offset={1} stopColor="#0f2573" stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path
            data-name="Rectangle 144"
            opacity={0.543}
            fill="url(#a)"
            d="M0 0H430V932H0z"
          />
        </Svg>
      </View>
      <View
        style={{
          position: "absolute",
          top: "20%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={227.576}
          height={94.463}
          viewBox="0 0 227.576 94.463"
        >
          <G data-name="Group 112">
            <Path
              data-name="Path 38"
              d="M.976 1.057v47.1H15.6V28.915h18.25V19.4H15.6v-8.221h21.363V1.057z"
              transform="translate(0 -.001) translate(-.234 -.253)"
              fill="#fff"
            />
            <Path
              data-name="Path 39"
              d="M56.922 1.057h14.555v35.5h15.188v11.6H56.922z"
              transform="translate(0 -.001) translate(-13.637 -.253)"
              fill="#fff"
            />
            <G data-name="Group 26">
              <G data-name="Group 99" fill="#fff">
                <Path
                  data-name="Path 40"
                  d="M99.964 24.388q0-11.534 6.426-17.96T124.287 0q11.759 0 18.121 6.313T148.77 24q0 8.258-2.779 13.543a19.813 19.813 0 01-8.033 8.226 26.518 26.518 0 01-13.093 2.94q-7.968 0-13.19-2.538a19.86 19.86 0 01-8.466-8.032q-3.246-5.494-3.245-13.752m14.555.065q0 7.134 2.651 10.25a10.033 10.033 0 0014.475.064q2.57-3.051 2.57-10.956 0-6.651-2.683-9.72a9.174 9.174 0 00-7.277-3.068 8.842 8.842 0 00-7.069 3.116q-2.668 3.116-2.667 10.314"
                  transform="translate(0 -.001) translate(0 .001) translate(-23.949 -.001)"
                />
                <Path
                  data-name="Path 41"
                  d="M159.22 1.057h16.167l9.49 15.891 9.51-15.891h16.081l-18.314 27.375V48.16h-14.588V28.432z"
                  transform="translate(0 -.001) translate(0 .001) translate(-38.145 -.254)"
                />
                <Path
                  data-name="Path 42"
                  d="M24.834 97.614l9.581 2.9a17.664 17.664 0 01-3.04 6.734 13.187 13.187 0 01-5.153 4.078 19.262 19.262 0 01-7.832 1.374 22.742 22.742 0 01-9.424-1.676 14.94 14.94 0 01-6.312-5.9A19.99 19.99 0 010 94.32q0-8.778 4.67-13.494t13.214-4.715q6.684 0 10.51 2.7a15.88 15.88 0 015.683 8.3l-9.654 2.147a8.286 8.286 0 00-1.061-2.358 6.279 6.279 0 00-2.245-1.931 6.441 6.441 0 00-2.968-.676 6.418 6.418 0 00-5.7 2.989q-1.5 2.219-1.5 6.965 0 5.882 1.785 8.064a6.123 6.123 0 005.02 2.182 6.093 6.093 0 004.746-1.763 10.9 10.9 0 002.329-5.116"
                  transform="translate(0 -.001) translate(0 .001) translate(0 -18.235)"
                />
                <Path
                  data-name="Path 43"
                  d="M52.208 76.9h29.3v7.553H63.165v5.623h17.014V97.3H63.165v6.975h18.872v8.012H52.208z"
                  transform="translate(0 -.001) translate(0 .001) translate(-12.508 -18.425)"
                />
                <Path
                  data-name="Path 44"
                  d="M99.274 76.9h10.209L122.8 96.479V76.9h10.31v35.379H122.8l-13.25-19.426v19.426H99.274z"
                  transform="translate(0 -.001) translate(0 .001) translate(-23.784 -18.425)"
                />
                <Path
                  data-name="Path 45"
                  d="M150.053 76.9h33.233v8.737h-11.15v26.643H161.2V85.641h-11.15z"
                  transform="translate(0 -.001) translate(0 .001) translate(-35.949 -18.425)"
                />
                <Path
                  data-name="Path 46"
                  d="M200.23 76.9h29.3v7.553h-18.343v5.623H228.2V97.3h-17.013v6.975h18.872v8.012H200.23z"
                  transform="translate(0 -.001) translate(0 .001) translate(-47.97 -18.425)"
                />
                <Path
                  data-name="Path 47"
                  d="M247.391 112.284V76.9h18.222a26.486 26.486 0 017.746.868 8.248 8.248 0 014.319 3.222 9.991 9.991 0 01-3.067 14.275 13.2 13.2 0 01-3.84 1.4 10.9 10.9 0 012.846 1.3 11.055 11.055 0 011.749 1.861 13.917 13.917 0 011.531 2.2l5.294 10.252h-12.352L264 101.473a8.255 8.255 0 00-1.979-2.728 4.594 4.594 0 00-2.68-.821h-.965v14.36zm10.981-21.044h4.61a16.413 16.413 0 002.9-.483 2.886 2.886 0 001.773-1.11 3.583 3.583 0 00-.4-4.682q-1.087-.917-4.078-.917h-4.8z"
                  transform="translate(0 -.001) translate(0 .001) translate(-59.269 -18.425)"
                />
                <Path
                  data-name="Path 48"
                  d="M265.032 56.359a5.05 5.05 0 105.05 5.05 5.05 5.05 0 00-5.05-5.05"
                  transform="translate(0 -.001) translate(0 .001) translate(-62.285 -13.503)"
                />
                <Path
                  data-name="Path 49"
                  d="M237.639 56.359a5.05 5.05 0 105.05 5.05 5.05 5.05 0 00-5.05-5.05"
                  transform="translate(0 -.001) translate(0 .001) translate(-55.723 -13.503)"
                />
                <Path
                  data-name="Path 50"
                  d="M262.068 39.641l-2.422-8.235q-.617-2.1-1.234-4.191a.876.876 0 00-.065-.135v-.022a1.4 1.4 0 01.151.028l4.347 1.279 6.023 1.772.38.112a48.9 48.9 0 00.318-5.8 34.982 34.982 0 00-1.157-9.125 20.6 20.6 0 00-3.726-7.55 16.789 16.789 0 00-6.507-4.98 25.884 25.884 0 00-10.33-1.736h-2.839v10.686c3.452.1 5.959 1 7.5 2.744q2.442 2.763 2.442 10.249 0 5.655-1.092 8.178a6.859 6.859 0 01-3.02 3.534q-1.928 1.013-6.49 1.013H235V1.057h-29.5V13.9h14.944v34.261h3.808a6.973 6.973 0 1113.946 0h6.805a6.974 6.974 0 0113.639-2.05 16.618 16.618 0 004.43-2.978l.014-.015-1.022-3.477"
                  transform="translate(0 -.001) translate(0 .001) translate(-49.234 -.254)"
                />
                <Path
                  data-name="Path 51"
                  d="M280.54 40.784c.032.006.064.009.1.018l2.731.8 3.784 1.113 4.923 1.448 2.119.624.073.022c-.189.155-.374.3-.557.447l-.56.448-.554.443-.56.447-.554.443-.559.447-.559.448 4.424 4.423-2.649 2.648-4.423-4.423c-.157.19-.3.376-.449.559s-.3.373-.448.559l-.443.554-.447.559-.443.554-.448.56-.449.561c-.011-.031-.019-.049-.024-.068l-1.686-5.733-1.522-5.173-.776-2.633a.565.565 0 00-.04-.084z"
                  transform="translate(0 -.001) translate(0 .001) translate(-67.211 -9.772)"
                />
              </G>
            </G>
          </G>
        </Svg>
        <View style={styles.overView}>
          <View style={{ position: "relative" }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={189.265}
              height={89.028}
              viewBox="0 0 189.265 89.028"
            >
              <Rect
                data-name="Rectangle 5"
                width={181.911}
                height={61.326}
                rx={17}
                transform="rotate(-9 180.79 14.228)"
                fill="#0F2573"
              />
            </Svg>
            <View style={{ position: "absolute", top: 20, left: 20 }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={140.055}
                height={45.292}
                viewBox="0 0 140.055 45.292"
              >
                <Textsvg
                  data-name="ONE CLICK WAY!"
                  transform="rotate(-9 223.36 -437.072)"
                  fill="#fff"
                  fontSize={18}
                  fontFamily="CoolveticaRg-Regular, Coolvetica"
                >
                  <TSpan x={-68} y={0}>
                    {"ONE CLICK WAY!"}
                  </TSpan>
                </Textsvg>
              </Svg>
            </View>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.text1}>Trendy Online Supermarket </Text>
          <Text style={styles.text}>To Save Your Time and Money</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain", // or 'contain' if you want to contain the image within the view
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  overView: {
    top: "0%",
    left: "30%",
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  text1: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  secondContainer: {
    marginTop: "15%",
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
});

export default Splash;
