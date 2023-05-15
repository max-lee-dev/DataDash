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

export default function RenderDates({ dataEntries }) {
  console.log(dataEntries);
  const map = new Map();
  dataEntries.forEach((value) => {
    map.set(
      value.date.toDate().getMonth() +
        1 +
        "/" +
        value.date.toDate().getDate() +
        " "
    );
  });
  const arr = Array.from(map.keys());
  return (
    <Box>
      {arr.map((entry) => (
        <Text>{`${entry}`}</Text>
      ))}
    </Box>
  );
}
