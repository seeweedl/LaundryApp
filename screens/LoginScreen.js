import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unSubcriber = auth.onAuthStateChanged((user) => {
      if (user) navigation.navigate("Home");
      if (!user) setLoading(false);
    });
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, passWord).then((userCredential) => {
      const user = userCredential.user;
      console.log("user details", user);
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 50,
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text style={{ marginRight: 10 }}>Loading</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}
            >
              Sign In
            </Text>
            <Text>Sign In to your Account</Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  borderBottomWidth: 1,
                  width: 260,
                  borderColor: "gray",
                  marginLeft: 8,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Octicons name="key" size={24} color="black" />
              <TextInput
                placeholder="PassWord"
                placeholderTextColor="black"
                value={passWord}
                onChangeText={(text) => setPassWord(text)}
                secureTextEntry={true}
                style={{
                  borderBottomWidth: 1,
                  width: 260,
                  borderColor: "gray",
                  marginLeft: 8,
                }}
              />
            </View>

            <Pressable
              onPress={login}
              style={{
                marginTop: 40,
                backgroundColor: "#318CE7",
                width: 100,
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Login
              </Text>
            </Pressable>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: 12,
              }}
            >
              <Text>Don't have a account? </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
