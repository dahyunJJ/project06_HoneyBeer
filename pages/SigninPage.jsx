import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Center, Text, Button, FormControl, Icon, HStack } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ItemInput from "../components/ItemInput";

export default function SigninPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const goSignUp = () => {
    navigation.navigate("SignupPage");
  };

  const doSignIn = () => {
    if (email === "") {
      setEmailError("이메일을 입력해주세요");
      return false;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요");
      return false;
    } else {
      setPasswordError("");
    }
    navigation.navigate("TabNavigator");
  };

  return (
    <Center safeAreaTop mt={20}>
      <Text fontSize={32}>Welcome!</Text>
      <Text fontFamily={"Gamja-Flower"} fontSize={24} color={"#666"}>
        sign in to continue
      </Text>
      <FormControl w={"80%"} mt={8}>
        <ItemInput
          title={"이메일"}
          type={"email"}
          setFunc={setEmail}
          icon={
            <Icon
              as={
                <MaterialIcons
                  name="alternate-email"
                  style={styles.inputIcons}
                />
              }
            />
          }
          error={emailError}
        />
        <ItemInput
          title={"비밀번호"}
          type={"password"}
          setFunc={setPassword}
          icon={
            <Icon
              as={
                <Ionicons
                  name="lock-closed-outline"
                  style={styles.inputIcons}
                />
              }
            />
          }
          error={passwordError}
        />

        <TouchableOpacity>
          <Text
            fontSize={12}
            color="gray.600"
            textAlign={"right"}
            mt={-2}
            pr={4}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <Button backgroundColor="black" borderRadius={30} my={8}>
          <Text
            color="#fff"
            fontSize={16}
            fontFamily={"Gamja-Flower"}
            onPress={() => {
              doSignIn();
            }}
          >
            로그인
          </Text>
        </Button>
        <HStack margin={"auto"}>
          <Text>Create new Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              goSignUp();
            }}
          >
            <Text pl={2} color="gray.600">
              Sign Up
            </Text>
          </TouchableOpacity>
        </HStack>
      </FormControl>
    </Center>
  );
}

const styles = StyleSheet.create({
  inputIcons: {
    margin: 8,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#FFB000",
    fontSize: 20,
    color: "#fff",
  },
});
