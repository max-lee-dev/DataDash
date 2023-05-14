import React from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Center,
  Tooltip,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";

export default function RenderValues({ dataEntries }) {
  console.log(dataEntries);
  const arr = [];
  dataEntries.forEach((value) => {
    arr.push(value.numberValue);
  });
  return (
    <Box>
      {arr.map((entry) => (
        <Text>{`${entry}`}</Text>
      ))}
    </Box>
  );
}
