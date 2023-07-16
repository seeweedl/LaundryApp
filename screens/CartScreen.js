import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const route = useRoute();
  const userUid = auth.currentUser.uid

  const placeOrder = async()=>{
    navigation.navigate("Order")
    await setDoc(doc(db, `users`, `${userUid}`),{
      orders:{...cart},
      pickUpDetails: route.params
    },
    {merge: true})
  }
  return (
    <>
      <ScrollView style={{ paddingVertical: 47, paddingHorizontal: 20 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
              <Text style={{ fontSize: 16, marginLeft: 6 }}>Your Bucket</Text>
            </View>
            {cart.map((item) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: 16,
                  backgroundColor: "white",
                  marginBottom: 8,
                  borderRadius: 4,
                  borderWidth: 0.5,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#088F8F" }}
                >
                  {item.quantity}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.quantity * item.price}$
                </Text>
              </View>
            ))}

            <Text style={{ fontWeight: "bold", marginTop: 12 }}>
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 4,
                marginTop: 20,
                borderWidth: 0.3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>Item Total</Text>
                <Text style={{ fontWeight: "bold", color: "#088F8F" }}>
                  {total}$
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>Delivery Fee | 1.2KM</Text>
                <Text style={{ fontWeight: "bold", color: "#088F8F" }}>
                  FREE
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>Free Delivery on Your Order</Text>
              </View>

              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>Selected Day</Text>
                {/* <Text style={{fontWeight:'bold', color:'#088F8F'}}>{route.params.pickUpDate.}</Text> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>Np Of Days</Text>
                <Text style={{ fontWeight: "bold", color: "#088F8F" }}>
                  {route.params.no_Of_days}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>Select Pick Up Time</Text>
                <Text style={{ fontWeight: "bold", color: "#088F8F" }}>
                  {route.params.selectedTime}
                </Text>
              </View>

              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>To Pay</Text>
                <Text style={{ fontWeight: "bold", color: "#088F8F" }}>
                  {total + 95}$
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={(placeOrder)}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
