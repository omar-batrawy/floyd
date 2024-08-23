import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from "react-native";
import FloyDLogoTab from "../Component/FloyDLogoTab";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ProductinShop from "../Component/ProductinShop";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../Redux/Product/ProductActions";
import { GetSubCategories } from "../Redux/Category/CategoryActions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Searchinput({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.passwordInput}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8BABC9"
        style={[styles.input, styles.textInputStyle]}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.eyeIcon}>
        <AntDesign name="search1" size={24} color="#8BABC9" />
      </View>
    </View>
  );
}

function CategoryProduct({ navigation, route }) {
  const id = route.params.id;
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(null);
  const [finalData, setFinalData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const [loadcount, setLoadcount] = useState(0);


  useEffect(() => {
    dispatch(GetSubCategories(id));
  }, [dispatch, id]);

  const productData = useSelector((state) => state.Product);
  const subcategory = useSelector((state) => state.Category);
  const [search, setSearch] = useState("");
  const sort = {
    Sortby: ["Default Sort", "Lowest Price", "Highest Price"],
  };
  const [open, setOpen] = useState(false);
  const [sortby, setSortby] = useState("Default Sort");

  const changeSort = (category) => {
    setCanScroll(true);
    setSortby(category);
    setOpen(false);
    setPage(1); // Reset page when sort changes
  };

  const fetchProducts = (pageToFetch) => {
    const filters = {
      category: [id, categoryId],
      order:
        sortby === "Default Sort"
          ? null
          : sortby === "Lowest Price"
          ? "asc"
          : sortby === "Highest Price"
          ? "desc"
          : null,
      orderby: sortby === "By Name(A-Z)" ? "title" : null,
      search: search,
      pagination: {
        page: pageToFetch,
        per_page: 10,
      },
    };
    if (!canScroll) return;
    dispatch(GetProduct(filters));
    setLoadcount(loadcount + 1);
    if (
      (productData?.count && productData?.count < filters.pagination.per_page) ||
      productData?.count === 0
    ) {
      setCanScroll(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);

  }, [sortby, search, categoryId, page]);

  useEffect(() => {
    if (productData?.Product) {
      setFinalData((prevData) => {
        const newData = productData.Product.filter(
          (newItem) => !prevData.some((item) => item.id === newItem.id)
        );
        return page === 1 ? newData : [...prevData, ...newData];
      });
      setLoadingMore(false);
    }

  }, [productData?.Product]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      if (
        (productData?.count && productData?.count < 1) ||
        productData?.count === 0 ||
        productData?.loading
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - layoutMeasurement.height * 0.3;
    if (isCloseToBottom && !loadingMore) {
      handleLoadMore();
    }
  };
  const isOdd = productData?.Product?.length % 2 !== 0;

  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log("finalData", finalData);
  return (
<View style={[styles.container, { alignItems: isOdd ? 'flex-start' : 'center' }]}>
<FloyDLogoTab  navigation={navigation}/>
      <Searchinput
        placeholder="Search items"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setCanScroll(true);
          setPage(1);
        }}
      />

      <View style={styles.startView}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.categories}
          contentContainerStyle={{ alignItems: "center" }}

        >
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory("All");
              setCategoryId(null);
              setCanScroll(true);
              setPage(1);
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === "All" && styles.selectedCategoryText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {subcategory?.subcategory?.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCategory(category);
                setCategoryId(category.id);
                setPage(1);
                setCanScroll(true);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.secondContainer}
      >
        <MaterialCommunityIcons name="sort-variant" size={34} color="#8BABC9" />
        <Text style={{ color: "#0F2573", fontSize: 15, marginLeft: 10 }}>
          {sortby}{" "}
        </Text>
      </TouchableOpacity>
<TouchableOpacity
        onPress={() => setOpen(false)}
        >

      <ScrollView
        contentContainerStyle={[styles.categoryContainer,{marginLeft: isOdd ? 20 : 0}]}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}

      >
        {finalData?.map((item, index) =>
          item ? (
            <ProductinShop
              key={index}
              navigation={navigation}
              prop={{
                productimage: item?.images[0]?.src,
                productname: item.name,
                price: item.price,
                loading: false,
                id: item.id,
                loading: false,
              }}
              navigateTo="ProductDetails"
            />
          ) : null
        )}

        {productData?.loading &&
          [...Array(finalData?.length % 2 === 1 ? 3 : 4)].map((_, index) => (
            <ProductinShop key={index} prop={{ loading: true }} />
          ))}
      </ScrollView>
      </TouchableOpacity>
      {open && (
        <ScrollView
          style={{
            width: "100%",
            height: 230,
            position: "absolute",
            backgroundColor: "#F7F7F7",
            bottom: 0,
            zIndex: 10,
            display: "flex",
            gap: 20,
            padding: "5%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
        
            // Elevation for Android
            elevation: 10,
        
            // Ensuring the shadow is visible on Android
            overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
          }}
        >
          <Text
            style={{
              color: "#3D6183",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Sort By
          </Text>
          {sort.Sortby.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => changeSort(category)}>
              <Text
                style={{
                  color: "#3D6183",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    position: "relative",

  },
  

  selectedCategoryText: {
    color: "#8BABC9",
  },
  input: {
    width: "100%",
    borderRadius: 9,
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#8BABC9",
  },
  startView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: 16,
    height: 50,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  textInputStyle: {
    fontSize: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 18,
  },
  secondContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 22,
  },
  shopDepartment: {
    fontSize: 15,
    color: "#4287C8",
    fontWeight: "bold",
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    
  },
  categoryText: {
    color: "#0F2573",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    gap: 10,
    width: "100%",
    paddingBottom: 350,    
  },
});

export default CategoryProduct;
