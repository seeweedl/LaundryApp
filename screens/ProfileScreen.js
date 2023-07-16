import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ marginVertical: 48, marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AntDesign name="home" size={24} color="blue" />
        <Text style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}>
          PROFILE
        </Text>
        <MaterialCommunityIcons
          name="bell-ring-outline"
          size={24}
          color="blue"
        />
      </View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          borderRadius: 12,
          borderWidth: 0.7,
          borderColor: "blue",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <Foundation name="telephone" size={28} color="blue" />
        <Text style={{ paddingLeft: 12, fontSize: 16 }}>Contact Info</Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          borderRadius: 12,
          borderWidth: 0.7,
          borderColor: "blue",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <Ionicons name="wallet-outline" size={26} color="blue" />
        <Text style={{ paddingLeft: 12, fontSize: 16 }}>My Wallet</Text>
      </Pressable>

      <Pressable
        onPress={logout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          borderRadius: 12,
          borderWidth: 0.7,
          borderColor: "blue",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <SimpleLineIcons name="logout" size={26} color="blue" />
        <Text style={{ paddingLeft: 12, fontSize: 16 }}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
