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
  const arr = [];
  dataEntries.forEach((value) => {
    arr.push(value.notesValue);
  });
  return (
    <Box marginBottom="3px">
      {arr.map((entry) => (
        <Box>{entry}</Box>
      ))}
    </Box>
  );
}
