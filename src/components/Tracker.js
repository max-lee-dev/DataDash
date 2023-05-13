import React, { useEffect, useState } from "react";
import { Box, Text, Button, HStack, VStack, Center } from "@chakra-ui/react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Tracker({ tracker }) {
  return (
    <Box alignItems={"flex-start"}>
      <HStack alignItems={"flex-start"}>
        <Box>
          <Text>{tracker?.trackerName}</Text>
          <Text>{tracker?.isNumber}</Text>
        </Box>
        <Box>s</Box>
      </HStack>
    </Box>
  );
}
