import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Center,
  Text,
  Button,
  FormControl,
  ScrollView,
  KeyboardAvoidingView,
  Icon,
  HStack,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ItemInput from "../components/ItemInput";

// 회원인증을 통한 가입
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// firestore에 데이터 저장
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
// 사용자 정보 저장
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupPage({ navigation, route }) {
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const goSignIn = () => {
    navigation.navigate("SigninPage");
  };

  const doSignUp = () => {
    if (nickName === "") {
      setNickNameError("닉네임을 입력해주세요");
      return false;
    } else {
      setNickNameError("");
    }
    if (email === "") {
      setEmailError("이메일을 입력해주세요");
      return false;
    } else {
      setEmailError("");
    }
    if (password === "" || password.length < 6) {
      setPasswordError("비밀번호를 6자리 이상 입력해주세요");
      return false;
    } else {
      setPasswordError("");
    }
    if (passwordConfirm === "") {
      setPasswordConfirmError("비밀번호를 입력해주세요");
      return false;
    } else {
      setPasswordConfirmError("");
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      setPasswordConfirmError("");
    }

    // 회원가입 처리
    createUserWithEmailAndPassword(auth, email, password, nickName)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("가입성공", user);

        // 가입과 동시에 AsyncStorage에 사용자 정보 저장
        AsyncStorage.setItem("session", email);

        // 사용자 정보 firestore에 저장
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          uid: user.uid, //Authentication - uid
          email: user.email, //Authentication - email
          nickName: nickName, // 가입창에서 입력한 닉네임
        });

        navigation.replace("SigninPage"); // replace : 뒤로가기 막기
        // 가입 성공하면 로그인 페이지로 이동한다.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("가입실패", errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Center safeAreaTop mt={20}>
          <Text fontSize={32}>Sign Up</Text>
          <Text fontFamily={"Gamja-Flower"} fontSize={24} color={"#666"}>
            creaate new an account
          </Text>
          <FormControl w={"80%"} mt={8}>
            <ItemInput
              title={"닉네임"}
              type={"nickName"}
              setFunc={setNickName}
              icon={
                <Icon
                  as={<MaterialIcons name="person" style={styles.inputIcons} />}
                />
              }
              error={nickNameError}
            />
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
            <ItemInput
              title={"비밀번호 확인"}
              type={"password"}
              setFunc={setPasswordConfirm}
              icon={
                <Icon
                  as={<Ionicons name="lock-closed" style={styles.inputIcons} />}
                />
              }
              error={passwordConfirmError}
            />

            <Button backgroundColor="black" borderRadius={30} my={8}>
              <Text
                color="#fff"
                fontFamily={"Gamja-Flower"}
                fontSize={16}
                onPress={() => doSignUp()}
              >
                회원가입
              </Text>
            </Button>
            <HStack margin={"auto"}>
              <Text>Do you have an account ?</Text>
              <TouchableOpacity
                onPress={() => {
                  goSignIn();
                }}
              >
                <Text pl={2} color="gray.600">
                  Sign In
                </Text>
              </TouchableOpacity>
            </HStack>
          </FormControl>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
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
