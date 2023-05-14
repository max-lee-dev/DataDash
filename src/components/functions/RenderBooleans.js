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

export default function RenderBooleans({ dataEntries }) {
  console.log(dataEntries);
  const arr = [];
  dataEntries.forEach((value) => {
    arr.push(value.booleanValue);
  });
  return (
    <Box>
      {arr.map((entry) => (
        <Box>
          {entry ? (
            <Box color={"green"}>
              <ion-icon name="checkbox"></ion-icon>
            </Box>
          ) : (
            <Box color={"red"}>
              <ion-icon name="close-circle"></ion-icon>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
