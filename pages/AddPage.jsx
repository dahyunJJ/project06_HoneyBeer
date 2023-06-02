import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Center,
  Pressable,
  Text,
  Input,
  ScrollView,
  FormControl,
  Select,
  Button,
  CheckIcon,
  KeyboardAvoidingView,
} from "native-base";

import ImageBlurLoading from "react-native-image-blur-loading";

export default function AddPage({ navigation }) {
  const [type, setType] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "맛있는 맥주를 추천해 주세요:D",
      headerStyle: {
        backgroundColor: "#131518",
        height: 80,
        shadowColor: "transparent",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        // fontWeight: "bold",
        fontSize: 20,
        fontFamily: "GamjaFlower",
      },
      headerShown: true,
    });
  });

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView>
        <Center px={4}>
          <Pressable style={styles.addImage}>
            <Text fontSize={40} color="#666">
              +
            </Text>
          </Pressable>
          <FormControl w="100%" isRequired>
            <FormControl.Label>
              <Text fontFamily={"GamjaFlower"} fontSize={16}>
                맥주 이름
              </Text>
            </FormControl.Label>
            <Input
              placeholder="맥주 이름을 입력하세요"
              variant={"underlined"}
              mb={2}
            />
            <FormControl.Label>
              <Text fontFamily={"GamjaFlower"} fontSize={16}>
                맥주 타입
              </Text>
            </FormControl.Label>
            <Select
              selectedValue={type}
              // minWidth="200"
              w={"100%"}
              accessibilityLabel="Choose type"
              placeholder="맥주 타입을 골라주세요"
              _selectedItem={{
                bg: "#FFB000",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Select.Item label="라거" value="lager" />
              <Select.Item label="에일" value="ale" />
              <Select.Item label="IPA 맥주" value="IPA" />
              <Select.Item label="흑맥주" value="darkbeer" />
              <Select.Item label="크래프트" value="craft" />
            </Select>
            <FormControl.Label>
              <Text fontFamily={"GamjaFlower"} fontSize={16} mt={2}>
                Aroma (향)
              </Text>
            </FormControl.Label>
            <Input
              placeholder="맥주의 향이 어땠는지 적어주세요(ex. 과일향, 맥아향)"
              variant={"underlined"}
              mb={2}
            />
            <FormControl.Label>
              <Text fontFamily={"GamjaFlower"} fontSize={16}>
                Flavor (맛)
              </Text>
            </FormControl.Label>
            <Input
              placeholder="맥주의 맛이 어땠는지 적어주세요(ex. 쓴맛, 캐러멜, 깔끔함)"
              variant={"underlined"}
              mb={2}
            />
            <FormControl.Label>
              <Text fontFamily={"GamjaFlower"} fontSize={16}>
                Balance (밸런스)
              </Text>
            </FormControl.Label>
            <Input
              placeholder="밸런스를 적어주세요 (ex. 드라이, 미디엄, 크리미)"
              variant={"underlined"}
              mb={2}
            />
            <Button
              // onPress={upload}
              w={"100%"}
              backgroundColor="#FFB000"
              borderRadius={30}
              my={8}
            >
              <Text color="#fff" fontFamily={"GamjaFlower"} fontSize={16}>
                등록
              </Text>
            </Button>
          </FormControl>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  addImage: {
    borderWidth: 1,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 16,
    width: "100%",
    height: 150,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
