import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || passWord === "" || phoneNumber === "") {
      Alert.alert("Invaild Details", "Please Fill all Details", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      
      {cancelable:false});
    }

    createUserWithEmailAndPassword(auth,email,passWord).then((userCredential) => {
      console.log("user credential",userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db,"users",`${myUserUid}`),{
        email:user,
        phone:phoneNumber
      })
    })
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
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Register
          </Text>
          <Text>Create a new Account</Text>
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <AntDesign name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="black"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={{
                borderBottomWidth: 1,
                width: 260,
                borderColor: "gray",
                marginLeft: 8,
              }}
            />
          </View>

          <Pressable
            onPress={register}
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
              Register
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
            <Text>Have you a Account? </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
