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
  TextArea,
} from "native-base";
import ImageBlurLoading from "react-native-image-blur-loading";

import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { storage } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

// 등록을 위한 임시이미지
const tempImage =
  "https://firebasestorage.googleapis.com/v0/b/beebeer-d4f0d.appspot.com/o/SampleImg.jpg?alt=media&token=c8455f4c-4a12-409c-8960-17edf2779984&_gl=1*1ez26b2*_ga*NjgzOTE0MzA1LjE2ODYxMDQ5OTI.*_ga_CW55HF8NVT*MTY4NjEwNzQwNi4yLjEuMTY4NjEwNzc2MS4wLjAuMA..";

// 이미지-피커 라이브러리
import * as ImagePicker from "expo-image-picker";

export default function AddPage({ navigation }) {
  const [image, setImage] = useState(tempImage); // 게시글 이미지
  const [imageUri, setImageUri] = useState(""); // 업로드할 이미지 uri
  const [title, setTitle] = useState(""); // 게시글 제목
  const [content, setContent] = useState(""); // 게시글 내용
  const [type, setType] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "최애 맥주를 소개해 주세요:D",
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

    // 이미지-피커 함수
    getPermission();
  }, []);

  //현재 유저 정보 가져오기
  const user = auth.currentUser;
  if (user) {
    console.log("현재 유저 정보", user.uid);
  } else {
    console.log("현재 유저 정보 없음");
  }

  // 등록버튼 클릭 시 실행 함수
  const upload = async () => {
    console.log("업로드 준비중!!");
    // console.log("제목", title);
    // console.log("내용", content);
    // console.log("유저", user);
    // console.log("입력시간", date);

    let date = new Date(); // 현재 시간 저장
    let getTime = date.getTime().toString(); // 현재 시간을 밀리세컨드로 변환
    let data = {
      // 게시글 정보
      image: image,
      title: title,
      desc: content,
      type: type,
      date: getTime,
      author: user.email,
      uid: user.uid,
    };

    // 이미지 업로드 함수 실행
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;
    console.log("업로드 데이터자료 --", data);

    let result = addDiary(data); // 게시글 등록 함수 실행
    if (result) {
      // Alert('게시글 등록 완료');
      console.log("게시글 등록 완료");
      setTitle("");
      setContent("");
      setType("");
      setImage(tempImage);
      setImageUri("");
      navigation.navigate("MyPage");
    }
  };

  // storage에 이미지 업로드 함수
  async function imageUpload(blob, date) {
    const storageRef = ref(storage, "diary/" + date);
    const snapshot = await uploadBytes(storageRef, blob);
    const imageUrl = await getDownloadURL(snapshot.ref);
    blob.close();
    return imageUrl;
  }

  // user 정보와 storage에 등록된 이미지를 함께 등록하는 함수
  async function addDiary(content) {
    console.log("현재 유저 정보", content.uid);
    try {
      const userRef = doc(db, "users", content.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        //해당 사용자 문서가 존재하면
        const userData = userDoc.data();
        console.log("입력될 닉네임 ", userData.nickName);
        content.author = userData.nickName; // content.author = data.author
        await setDoc(doc(db, "diary", `${content.date}D`), content);
        return true;
      } else {
        console.log("해당 사용자 문서가 존재하지 않습니다.");
        return false;
      }
    } catch (e) {
      console.log(err.message);
      alert("글 작성에 문제가 있습니다!", err.message);
      return false;
    }
  }

  // 이미지-피커 함수 : 카메라 권한 허용
  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("카메라 권한을 허용해주세요!");
      }
    }
  };

  const getImageUri = async (imageData) => {
    setImageUri(imageData.uri);
  };

  // + 버튼 클릭 시 이미지-피커 실행
  const pickImage = async () => {
    try {
      console.log("이미지 선택 함수 실행");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // 이미지 타입
        allowsEditing: true, // 편집 여부
        aspect: [16, 9], //이미지 비율
        quality: 0, //이미지 퀄리티(0: 퀄리티 낮춰줌, 1: 이미지 퀄리티 그대로 유지)
      });
      // console.log(result.assets[0]?.uri); // 선택한 이미지 경로
      // setImageUri(imageData.assets[0].uri); // 미리보기 이미지 경로

      if (!result.canceled && result !== null) {
        // 이미지 선택 취소가 아닐 경우
        const imageData = result.assets[0];
        getImageUri(imageData);
      } else {
        // 이미지 선택 취소일 경우
        setImage(tempImage);
        setImageUri("");
      }
    } catch (error) {
      console.error("오류발생", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView>
        <Center px={4}>
          {imageUri == "" ? (
            <Pressable style={styles.addImage} onPress={() => pickImage()}>
              <Text fontSize={40} color="#666">
                +
              </Text>
            </Pressable>
          ) : (
            <ImageBlurLoading
              withIndicator
              thumbnailSource={{ uri: imageUri }}
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: 150,
                borderRadius: 10,
                marginBottom: 20,
                marginTop: 20,
                alignSelf: "center",
              }}
            />
          )}
          <FormControl w="100%" isRequired>
            <FormControl.Label>
              <Text fontFamily={"Gamja-Flower"} fontSize={16}>
                맥주 이름
              </Text>
            </FormControl.Label>
            <Input
              placeholder="맥주 이름을 입력하세요"
              variant={"underlined"}
              mb={2}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            <FormControl.Label>
              <Text fontFamily={"Gamja-Flower"} fontSize={16} mt={2}>
                맥주에 대한 설명
              </Text>
            </FormControl.Label>
            <TextArea
              placeholder="추천하시는 이유를 설명해주세요! (ex. 맛, 향, 밸런스 등)"
              borderRadius={10}
              h={150}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            {/* <Input
              placeholder="맥주의 향이 어땠는지 적어주세요(ex. 과일향, 맥아향)"
              variant={"underlined"}
              mb={2}
            /> */}
            {/* <FormControl.Label>
              <Text fontFamily={"Gamja-Flower"} fontSize={16}>
                Flavor (맛)
              </Text>
            </FormControl.Label>
            <Input
              placeholder="맥주의 맛이 어땠는지 적어주세요(ex. 쓴맛, 캐러멜, 깔끔함)"
              variant={"underlined"}
              mb={2}
            />
            <FormControl.Label>
              <Text fontFamily={"Gamja-Flower"} fontSize={16}>
                Balance (밸런스)
              </Text>
            </FormControl.Label>
            <Input
              placeholder="밸런스를 적어주세요 (ex. 드라이, 미디엄, 크리미)"
              variant={"underlined"}
              mb={2}
            /> */}
          </FormControl>
          <Text fontFamily={"Gamja-Flower"} fontSize={16} w={"100%"} my={2}>
            맥주 타입
          </Text>
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
            value={type}
            onValueChange={(value) => setType(value)}
          >
            <Select.Item label="라거" value="lager" />
            <Select.Item label="에일" value="ale" />
            <Select.Item label="IPA 맥주" value="IPA" />
            <Select.Item label="흑맥주" value="darkbeer" />
            <Select.Item label="크래프트" value="craft" />
          </Select>
          <Button
            // onPress={upload}
            w={"100%"}
            backgroundColor="#FFB000"
            borderRadius={30}
            my={8}
          >
            <Text
              color="#fff"
              fontFamily={"Gamja-Flower"}
              fontSize={16}
              onPress={() => upload()}
            >
              등록
            </Text>
          </Button>
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
