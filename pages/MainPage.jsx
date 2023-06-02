import { HStack, Text, Input, Icon, VStack, Box, View } from "native-base";
import { StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

import MainBannerComponent from "../components/MainBannerComponent";
import HotListComponent from "../components/HotListComponent";

import data from "../data/mackjooData.json";
import beerIcon from "../assets/image/1684389058446.png";

export default function MainPage({ navigation }) {
  const [list, setList] = useState(data);
  // console.log(list);

  useEffect(() => {
    setList(list);
  }, []);

  // 평점 3.5점 이상인 상품 오름차순으로 정리
  const ratingList = list
    .filter((item) => item.rating >= 3.5)
    .sort((a, b) => b.rating - a.rating);
  // console.log(ratingList);

  const goTheme = () => {
    navigation.navigate("ThemePage");
  };

  return (
    <ScrollView backgroundColor={"#fff"}>
      <Box safeAreaTop paddingX={4}>
        <MainBannerComponent navigation={navigation} />
        <VStack>
          <Text fontFamily={"GamjaFlower"} mt={6} mb={2} fontSize={20}>
            맥주 이름을 검색하세요
          </Text>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Input
              placeholder="맥주 이름을 검색하세요"
              variant="filled"
              width="100%"
              borderRadius="10"
              py="1"
              px="2"
              w={"80%"}
              focusOutlineColor={"#FFB000"}
              InputLeftElement={
                <Icon
                  ml="2"
                  size="6"
                  color="gray.400"
                  as={<AntDesign name="search1" />}
                />
              }
            />
            <TouchableOpacity style={styles.search}>
              <Text textAlign={"center"}>검색</Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <Text fontFamily={"GamjaFlower"} mt={6} mb={2} fontSize={20}>
          요즘 핫한 맥주
        </Text>
        <ScrollView
          style={styles.listCon}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {ratingList.map((item, i) => {
            return (
              <HotListComponent item={item} key={i} navigation={navigation} />
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            goTheme();
          }}
        >
          <Box h={100}>
            <View style={styles.themeImgCon}>
              <Image source={beerIcon} style={styles.themeImg} />
            </View>
            <Box width={"100%"} position={"absolute"} bottom={0} right={0}>
              <HStack
                alignItems={"center"}
                mt={4}
                justifyContent={"flex-end"}
                py={2}
              >
                <Text fontFamily={"GamjaFlower"} fontSize={20}>
                  테마별 맥주 추천
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={20}
                  color="black"
                  marginLeft={64}
                  marginRight={24}
                />
              </HStack>
              <Text style={styles.themeTxt}>
                기분 따라, 분위기 따라 골라보세요!
              </Text>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#FFB000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  listCon: {
    // borderWidth: 1,
    height: 240,
  },
  themeImgCon: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  themeImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  themeTxt: {
    fontSize: 13,
    backgroundColor: "black",
    borderRadius: 8,
    color: "white",
    textAlign: "right",
    paddingHorizontal: 40,
    paddingVertical: 8,
  },
});
