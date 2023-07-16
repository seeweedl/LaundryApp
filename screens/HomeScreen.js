import { View, Text, ScrollView, Alert, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Carousel from "../components/Carousel";
import Services from "../components/services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../ProductReducer";
import { current } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";

// products data
const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
    name: "shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
    name: "T-shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
    name: "dresses",
    quantity: 0,
    price: 10,
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
    name: "jeans",
    quantity: 0,
    price: 10,
  },
  {
    id: "14",
    image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
    name: "Sweater",
    quantity: 0,
    price: 10,
  },
  {
    id: "15",
    image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
    name: "shorts",
    quantity: 0,
    price: 10,
  },
  {
    id: "16",
    image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
    name: "Sleeveless",
    quantity: 0,
    price: 10,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation()
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your location"
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.isLocationEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services not Enabled",
        "Please enabled the location services",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel");
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `You need to grant permission for us to access your current position`,
        [
          {
            text: "Okay",
            onPress: () => {
              console.log("OK");
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel");
            },
          },
        ],
        { cancelable: false }
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response);
      for (let item of response) {
        let address = `${item.name}, ${item.city}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProduct = () => {
      services.map((service) => dispatch(getProduct(service)));
    };
    fetchProduct();
  }, []);

  console.log(product);
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 40 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <EvilIcons name="location" size={28} color="#fd5c63" />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable style={{ marginLeft: "auto" }} onPress={()=> navigation.navigate("Profile")}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 30 }}
              source={{
                uri: `https://instagram.fdad1-4.fna.fbcdn.net/v/t51.2885-15/353652539_1197737680913021_6261424398050508049_n.jpg?stp=c0.180.1440.1440a_dst-jpg_e35_s480x480&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=105&_nc_ohc=CQN55lZ6ByAAX9KMHXH&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBMmrMcvO5vSTxgtmcPjeTFbb0YdTpNlv_F0RCYl8NqoA&oe=64AFD806&_nc_sid=8b3546`,
              }}
            />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 4,
            margin: 18,
            borderWidth: 0.7,
            borderColor: "#C0C0C0",
          }}
        >
          <TextInput placeholder="Search for item or more" />
          <EvilIcons name="search" size={24} color="#fd5c63" />
        </View>

        <Carousel />

        <Services />

        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            borderRadius: 8,
            flexDirection: "row",
            padding: 10,
            marginBottom: 10,
            margin: 15,
            alignItems:'center',
            justifyContent:'space-between'
          }}
        >
          <View>
            <Text style={{color:'white', fontWeight:'bold', fontSize:18, }}>
              {cart.length} items | $ {total}
            </Text>
            <Text style ={{color: 'white', }}>extra charges might apply</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>Proceeds to pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;
