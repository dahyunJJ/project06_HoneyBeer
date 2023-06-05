import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Center, Text, Button, FormControl, Icon, HStack } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ItemInput from "../components/ItemInput";

// 로그인하기
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// 사용자 정보 저장
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SigninPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // 로딩 완료 여부
  const [ready, setReady] = useState(true);

  // beforeRemove : 뒤로가기 방지 기능
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("경고", "로그인페이지에서는 뒤로 갈 수 없습니다");
    });

    // 로딩화면 보여줄 때 session 값 확인해서 메인페이지로 이동
    setTimeout(() => {
      AsyncStorage.getItem("session", (err, result) => {
        console.log("로그인페이지 session ------", result);
        if (result) {
          // 가입정보가 있다면 바로 메인페이지로 이동
          console.log("있다", result);
          navigation.navigate("TabNavigator");
        } else {
          // 가입정보가 없다면 로그인 페이지를 보여줌
          setReady(false);
        }
      });
      setReady(false);
    }, 1000);
  }, []);

  const goSignUp = () => {
    navigation.push("SignupPage", { title: "로그인 페이지에서 옴" });
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

    // Authentication 로그인 처리
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("로그인 성공", user.email);
        navigation.push("TabNavigator");
        // 로그인 성공하면 MainPage로 이동한다
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("로그인 실패", errorCode, errorMessage);
      });
  };

  // Input 상태관리 함수 생성하기
  const setEmailFunc = (itemInputEmail) => {
    // 이메일 상태값을 관리하는 함수
    setEmail(itemInputEmail);
  };
  const setPasswordFunc = (itemInputPassword) => {
    // 비밀번호 상태값을 관리하는 함수
    setPassword(itemInputPassword);
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
          setFunc={setEmailFunc}
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
          setFunc={setPasswordFunc}
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
