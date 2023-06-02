import React from "react";
import { Input, Text, Stack } from "native-base";

export default function ItemInput({ type, setFunc, error, icon }) {
  return (
    <Stack>
      <Input
        variant="rounded"
        placeholder={type}
        type={type}
        InputLeftElement={icon}
        secureTextEntry={type === "password" ? true : false}
        onChangeText={(text) => {
          text = text.trim();
          setFunc(text);
        }}
      />
      <Text color={"yellow.400"} fontSize={12} ml={16}>
        {error}
      </Text>
    </Stack>
  );
}
