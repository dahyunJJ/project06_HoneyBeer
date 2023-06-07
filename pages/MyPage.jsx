import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Center, HStack, Text, VStack, Flex, Box } from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";
import my from "../assets/image/beeB.png";

import ImageComponent from "../components/ImageComponent";

// firebase 로그아웃 기능
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// 사용자 정보 저장
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default function MyPage({ navigation }) {
  const [data, setData] = useState([]); // 데이터 저장 변수
  const [nickName, setNickName] = useState(""); // 닉네임 저장 변수
  const [email, setEmail] = useState(""); // 이메일 저장 변수
  const [uid, setUid] = useState(""); // uid 저장 변수

  useEffect(() => {
    navigation.setOptions({
      title: "마이페이지",
      headerStyle: {
        backgroundColor: "#131518",
        height: 80,
        shadowColor: "transparent",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: "Gamja-Flower",
      },
      headerShown: true,
    });

    // 초기에 한번 실행 되는 내용들. 이메일이나 닉네임 정보
    const fetchData = async () => {
      const email = await getSession();
      setEmail(email);

      //위에서 가져온 email 정보를 매개변수로 유저 정보 가져오기
      const userData = await getUser(email);
      setNickName(userData[0].nickName);
      setUid(userData[0].uid);
      getData(userData[0].uid);

      // 실시간  dairy 데이터 가져오기
      const dataList = onSnapshot(
        query(collection(db, "diary"), where("uid", "==", userData[0].uid)),
        (snapshot) => {
          const updateData = snapshot.docs.map((doc) => doc.data());
          setData(updateData);
        }
      );

      return dataList();
    };
    fetchData();
  }, []);

  // 로그아웃 기능 함수
  const logoutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃");
        // AsyncStorage에서 session 삭제
        AsyncStorage.removeItem("session", (err, result) => {
          console.log("저장통", result);
        });

        navigation.push("SigninPage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // email 정보를 가지고 있는 세션 가져오기
  const getSession = async () => {
    try {
      const value = await AsyncStorage.getItem("session");
      console.log("마이페이지 session ------", value);
      if (value) return value;
    } catch (err) {
      console.log("세션 가져오기 실패", err);
    }
  };

  // 유저 데이터(nickName 정보) 가져오기
  const getUser = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
    // 값이 하나밖에 없는 배열 구조로 담김
  };

  // diary 데이터 가져오기
  const getData = async (uid) => {
    const q = query(collection(db, "diary"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const diaryData = querySnapshot.docs.map((doc) => doc.data());
    setData(diaryData);
  };

  return (
    <ScrollView>
      <Center
        mt={4}
        borderBottomWidth={1}
        borderBottomColor={"gray.300"}
        pb={4}
      >
        <Box borderWidth={1} p={4} borderRadius={50} borderColor={"#FFB000"}>
          <ImageBlurLoading source={my} style={styles.thumbnail} />
        </Box>
        <Text mt={4}>닉네임 : {nickName}</Text>
        <Text>이메일 : {email}</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            logoutFunc();
          }}
        >
          <Text color={"white"} fontFamily={"Gamja-Flower"}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </Center>
      <Flex flexDirection={"row"} justifyContent={"center"} mt={4}>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>작성한 글</Text>
          <Text fontWeight={700} color={"orange.500"} fontSize={20}>
            {data.length}
          </Text>
        </VStack>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>좋아요 수</Text>
          <Text fontWeight={700} color={"orange.500"} fontSize={20}>
            12
          </Text>
        </VStack>
        <VStack w={"30%"} alignItems={"center"}>
          <Text>방문 횟수</Text>
          <Text fontWeight={700} color={"orange.500"} fontSize={20}>
            30
          </Text>
        </VStack>
      </Flex>
      <Flex mt={6} flexDirection={"row"} flexWrap={"wrap"} borderColor={"red"}>
        {data.reverse().map((content, i) => (
          <ImageComponent image={content.image} key={i} />
        ))}
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 70,
    height: 70,
    borderWidth: 1,
  },
  logout: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 10,
  },
});
