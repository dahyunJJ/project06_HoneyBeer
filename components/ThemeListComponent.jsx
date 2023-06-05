import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, Text, HStack, VStack, Image } from "native-base";

import { AntDesign, Entypo } from "@expo/vector-icons";

export default function ThemeListComponent({ item, navigation }) {
  // console.log("핫한맥주", item);

  const goDetail = () => {
    navigation.navigate("DetailPage", { item: item });
  };

  return (
    <View
      alignItems="center"
      width={"100%"}
      height={120}
      backgroundColor={"#fff"}
      borderBottomWidth={1}
      borderBottomColor={"gray"}
    >
      <TouchableOpacity onPress={() => goDetail()}>
        <HStack
          w={"90%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          py={2}
          onP
        >
          <Box w={"100px"} h={"100px"}>
            <Image
              source={{ uri: item.img }}
              alt="image"
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </Box>
          <VStack px={2} w={"240px"}>
            <Text
              w={"100%"}
              numberOfLines={1}
              fontSize={18}
              textAlign={"center"}
              fontFamily={"Gamja-Flower"}
            >
              {item.korProduct}
            </Text>
            <Text
              w={"100%"}
              numberOfLines={1}
              fontSize={12}
              textAlign={"center"}
              // fontFamily={"Gamja-Flower"}
            >
              {item.product}
            </Text>
            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={4}
            >
              <Text fontSize={12}>타입 : {item.category}</Text>
              <HStack>
                <HStack mr={4}>
                  <AntDesign name="star" size={14} color="#FFB000" />
                  <Text paddingLeft={1} fontSize={12}>
                    {item.rating}
                  </Text>
                </HStack>
                <Entypo name="heart-outlined" size={16} color="gray" />
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
