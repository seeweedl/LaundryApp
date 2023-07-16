import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementProduct, incrementProduct } from "../ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); // cart
    dispatch(incrementProduct(item)); // product
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 18,
        backgroundColor: "white",
        padding: 12,
        borderRadius: 12,
      }}
    >
      <View>
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
      </View>

      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16, width: 80 }}>
          {item.name}
        </Text>
        <Text>{item.price}$</Text>
      </View>

      {cart.some((c) => c.id === item.id) ? (
        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 6,
            paddingVertical: 5,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(decrementProduct(item))
              dispatch(decrementQuantity(item))
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8F",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              -
            </Text>
          </Pressable>

          <Text
            style={{
              color: "#088F8F",
              fontSize: 20,
              fontWeight: 600,
              paddingHorizontal: 6,
            }}
          >
            {item.quantity}
          </Text>

          <Pressable
          onPress={() => {
            dispatch(incrementProduct(item))
            dispatch(incrementQuantity(item))
          }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8F",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              +
            </Text>
          </Pressable>
        </Pressable>
      ) : (
        <View>
          <TouchableOpacity
            style={{ borderRadius: 7, borderWidth: 0.6, borderColor: "gray" }}
            onPress={addItemToCart}
          >
            <Text
              style={{
                color: "#088F8F",
                fontSize: 16,
                fontWeight: "bold",
                marginHorizontal: 16,
                marginVertical: 6,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DressItem;
