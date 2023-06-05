import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Center,
  HStack,
  ScrollView,
  Text,
  Box,
  Flex,
  VStack,
} from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";
import { AntDesign, Entypo } from "@expo/vector-icons";

import FoodListComponent from "../components/FoodListComponent";
import beers from "../assets/image/beers.png";

export default function DetailPage({ navigation, route }) {
  const content = route.params.item;
  // console.log(content);

  // 속성 이름을 인자로 받아 해당하는 배열을 반환하는 함수
  const beerArray = (item) => {
    const removeBrackets = content[item].slice(1, -1).replace(/'/g, ""); // 대괄호와 작은 따옴표 제거
    const beerInfo = removeBrackets.split(","); // 쉼표를 기준으로 분할하여 배열 생성
    // console.log("생성 결과----", beerInfo);
    return beerInfo;
  };

  const aroma = beerArray("Aroma");
  const balance = beerArray("Balance");
  const body = beerArray("Body");
  const flavor = beerArray("Flavor");
  const food = beerArray("paringFood");
  // console.log(Food);

  useEffect(() => {
    navigation.setOptions({
      title: content.korProduct,
      headerStyle: {
        backgroundColor: "#131518",
        height: 80,
        shadowColor: "transparent",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        // fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Gamja-Flower",
      },
      headerShown: true,
    });
  });
  return (
    <ScrollView backgroundColor={"#fff"}>
      <HStack safeAreaTop mt={8} alignItems={"center"}>
        <Box w={"160px"} h={"160px"}>
          <ImageBlurLoading
            withIndicator
            thumbnailSource={{ uri: content.img }}
            source={{ uri: content.img }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </Box>
        <Flex ml={-4}>
          <Text fontSize={20} w={"200px"}>
            {content.korProduct}
          </Text>
          <Text fontFamily={"Gamja-Flower"} fontSize={16}>
            {content.product}
          </Text>
          <HStack mt={4} justifyContent={"space-between"}>
            <Text fontSize={12}>타입 : {content.category}</Text>
            <HStack>
              <AntDesign name="star" size={14} color="#FFB000" />
              <Text paddingLeft={1} fontSize={12}>
                {content.rating}
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </HStack>
      <Box
        w={"360px"}
        // h={"330px"}
        borderWidth={1}
        borderRadius={16}
        // position={"absolute"}
        // top={180}
        // left={"25px"}
        // zIndex={-1}
        marginX={"auto"}
        mt={6}
      >
        <VStack
          w={"320px"}
          margin={"auto"}
          mt={4}
          space={3}
          alignItems={"center"}
        >
          <Text style={styles.infoTxt}>아로마</Text>
          <HStack flexWrap={"wrap"} justifyContent={"center"}>
            {aroma.map((item, i) => (
              // React.Fragment: 리액트에서 여러 개의 컴포넌트를 하나의 노드로 그룹화하는 데 사용되는 빈 컨테이너 역할
              <React.Fragment key={i}>
                <Text>{item}</Text>
                {i !== aroma.length - 1 && <Text>,</Text>}
                {/* 배열의 마지막 단어에는 , 를 붙이지 않는다 */}
              </React.Fragment>
            ))}
          </HStack>
          <Text style={styles.infoTxt}>맛</Text>
          <HStack flexWrap={"wrap"} justifyContent={"center"}>
            {flavor.map((item, i) => (
              <React.Fragment key={i}>
                <Text>{item}</Text>
                {i !== flavor.length - 1 && <Text>,</Text>}
              </React.Fragment>
            ))}
          </HStack>
          <Text style={styles.infoTxt}>밸런스</Text>
          <HStack flexWrap={"wrap"} justifyContent={"center"}>
            {balance.map((item, i) => (
              <React.Fragment key={i}>
                <Text>{item}</Text>
                {i !== balance.length - 1 && <Text>,</Text>}
              </React.Fragment>
            ))}
          </HStack>
          <Text style={styles.infoTxt}>바디감</Text>
          <HStack flexWrap={"wrap"} justifyContent={"center"} mb={4}>
            {body.map((item, i) => (
              <React.Fragment key={i}>
                <Text>{item}</Text>
                {i !== body.length - 1 && <Text>,</Text>}
              </React.Fragment>
            ))}
          </HStack>
        </VStack>
      </Box>
      <Text
        fontFamily={"Gamja-Flower"}
        mt={6}
        mb={2}
        ml={4}
        fontSize={20}
        borderBottomWidth={2}
        borderBottomColor={"#FFB000"}
        w={"180px"}
      >
        함께하면 좋은 추천 요리
      </Text>
      <FoodListComponent item={food} />
      <Box
        w={"360px"}
        borderWidth={1}
        borderRadius={16}
        marginX={"auto"}
        my={6}
      >
        <HStack flexWrap={"wrap"} justifyContent={"space-evenly"} py={2} px={4}>
          {food.map((item, i) => (
            <React.Fragment key={i}>
              <Text py={2}>{item}</Text>
            </React.Fragment>
          ))}
        </HStack>
      </Box>
      <Box w={"360px"} h={"100px"} margin={"auto"}>
        <ImageBlurLoading
          withIndicator
          thumbnailSource={beers}
          source={beers}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoTxt: {
    backgroundColor: "black",
    width: 120,
    color: "#fff",
    borderRadius: 20,
    textAlign: "center",
    fontFamily: "Gamja-Flower",
  },
});
