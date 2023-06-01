import { View } from "react-native";
import ImageBlurLoading from "react-native-image-blur-loading";

const LoadingImg = require("../assets/image/LoadingImg.jpg");

export default function LoadingPage() {
  return (
    <View>
      <ImageBlurLoading
        withIndicator
        thumbnailSource={LoadingImg}
        source={LoadingImg}
        style={{
          width: "100%",
          // alignSelf: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
}
