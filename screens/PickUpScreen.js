import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable, View, Alert  
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const deliveryTime = [
  {
    id: "0",
    name: "2-3 Days",
  },
  {
    id: "1",
    name: "3-4 Days",
  },
  {
    id: "2",
    name: "4-5 Days",
  },
  {
    id: "3",
    name: "5-6 Days",
  },
  {
    id: "4",
    name: "Tommorrow",
  },
];

const times = [
  {
    id: "0",
    time: "11:00 PM",
  },
  {
    id: "1",
    time: "12:00 PM",
  },
  {
    id: "2",
    time: "1:00 PM",
  },
  {
    id: "2",
    time: "2:00 PM",
  },
  {
    id: "4",
    time: "3:00 PM",
  },
  {
    id: "5",
    time: "4:00 PM",
  },
];
const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation()
  const proceedToCart = () => {
    if(!selectedDate || !selectedTime || !delivery){
      
      Alert.alert(
          "Empty or invalid",
          "Please select all the fields",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
    }
    if(selectedDate && selectedTime && delivery){
      console.log(new Date(selectedDate))
      navigation.replace("Cart",{
          pickUpDate:selectedDate,
          selectedTime:selectedTime,
          no_Of_days:delivery,

      })
    }
}

  return (
    <>
      <SafeAreaView style={{ marginVertical: 40, marginHorizontal: 18 }}>
        <Text style={{ fontWeight: "bold", paddingBottom: 8 }}>
          Enter Address
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 40,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontWeight: "bold", paddingBottom: 8 }}>
          Pick Up Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={Date.now()}
          endDate={new Date("2023-07-20")}
          initialSelectedDate={Date.now()}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontWeight: "bold" }}>Select Time</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator>
          {times.map((time) => (
            <TouchableOpacity
              
              onPress={() => setSelectedTime(time.time)}
            >
              <Text
                style={
                  selectedTime.includes(time.time)
                    ? {
                        padding: 6,
                        fontSize: 14,
                        margin: 8,
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: "red",
                      }
                    : {
                        padding: 6,
                        fontSize: 14,
                        margin: 8,
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: "gray",
                      }
                }
              >
                {time.time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={{ fontWeight: "bold" }}>Select Delivery Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          {deliveryTime.map((item, id) => (
            <TouchableOpacity key={id} onPress={() => setDelivery(item.name)}>
              <Text
                style={
                  delivery.includes(item.name)
                    ? {
                        padding: 6,
                        fontSize: 14,
                        margin: 8,
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: "red",
                      }
                    : {
                        padding: 6,
                        fontSize: 14,
                        margin: 8,
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: "gray",
                      }
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
        {total === 0 ? null : (
          <Pressable
            style={{
              backgroundColor: "#088F8F",
              marginTop:"auto",
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
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                {cart.length} items | $ {total}
              </Text>
              <Text style={{ color: "white" }}>extra charges might apply</Text>
            </View>

            <Pressable onPress={proceedToCart}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Proceeds to pickup
              </Text>
            </Pressable>
          </Pressable>
        )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
