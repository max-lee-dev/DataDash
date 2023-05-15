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

export default function RenderNotes({ dataEntries }) {
  console.log(dataEntries);
  const map = new Map();
  dataEntries.forEach((value) => {
    map.set(
      value.date.toDate().getMonth() +
        1 +
        "/" +
        value.date.toDate().getDate() +
        " ",
      value.notesValue
    );
  });
  const arr = Array.from(map.values());
  return (
    <Box marginBottom="3px">
      {arr.map((entry) => (
        <Box>{entry}</Box>
      ))}
    </Box>
  );
}