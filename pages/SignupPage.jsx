import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import {
  Center,
  Text,
  Button,
  FormControl,
  ScrollView,
  KeyboardAvoidingView,
  Icon,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ItemInput from "../components/ItemInput";

export default function SigninPage({ navigation, route }) {
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  return (
    <ScrollView>
      <Center safeAreaTop mt={20}>
        <Text fontSize={32}>Welcome!</Text>
        <Text fontFamily={"GamjaFlower"} fontSize={24} color={"#666"}>
          sign in to continue
        </Text>
        <FormControl w={"80%"} mt={10}>
          <ItemInput
            type={"닉네임을 입력하세요"}
            setFunc={setNickName}
            icon={
              <Icon
                as={
                  <MaterialIcons
                    name="person"
                    style={{
                      margin: 8,
                      padding: 8,
                      borderRadius: 50,
                      backgroundColor: "#FFB000",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  />
                }
              />
            }
            error={nickNameError}
          />
          <ItemInput
            type={"abc@beer.com"}
            setFunc={setNickName}
            icon={
              <Icon
                as={
                  <MaterialIcons
                    name="alternate-email"
                    style={{
                      margin: 8,
                      padding: 8,
                      borderRadius: 50,
                      backgroundColor: "#FFB000",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  />
                }
              />
            }
            error={nickNameError}
          />
          <ItemInput
            type={"비밀번호를 입력하세요"}
            setFunc={setNickName}
            icon={
              <Icon
                as={
                  <Ionicons
                    name="lock-closed-outline"
                    style={{
                      margin: 8,
                      padding: 8,
                      borderRadius: 50,
                      backgroundColor: "#FFB000",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  />
                }
              />
            }
            error={nickNameError}
          />
          <ItemInput
            type={"비밀번호 확인"}
            setFunc={setNickName}
            icon={
              <Icon
                as={
                  <Ionicons
                    name="lock-closed"
                    style={{
                      margin: 8,
                      padding: 8,
                      borderRadius: 50,
                      backgroundColor: "#FFB000",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  />
                }
              />
            }
            error={nickNameError}
          />
        </FormControl>
      </Center>
    </ScrollView>
  );
}
