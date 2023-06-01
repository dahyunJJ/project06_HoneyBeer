import React from "react";
import { FormControl, Input, Text, Box, Icon, Stack } from "native-base";

export default function ItemInput({ title, type, setFunc, error, icon }) {
  return (
    <Stack space={8}>
      <Input
        variant="rounded"
        placeholder={type}
        secureTextEntry={true}
        InputLeftElement={icon}
      />
    </Stack>
  );
}
