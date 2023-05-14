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
  Checkbox,
} from "@chakra-ui/react";

export default function RenderTimes({ dataEntries }) {
  console.log(dataEntries);
  const arr = [];
  dataEntries.forEach((value) => {
    arr.push(value.timeValue);
  });
  return (
    <Box>
      {arr.map((entry) => (
        <Box>{entry}</Box>
      ))}
    </Box>
  );
}
