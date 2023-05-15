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
  const map = new Map();
  dataEntries.forEach((value) => {
    map.set(
      value.date.toDate().getMonth() +
        1 +
        "/" +
        value.date.toDate().getDate() +
        " ",
      value.booleanValue
    );
  });
  const arr = Array.from(map.values());
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
