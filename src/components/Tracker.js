import React, { useEffect, useState } from "react";
import { Box, Text, Button, HStack, VStack, Center } from "@chakra-ui/react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Tracker({ tracker }) {
  return (
    <Box
      alignItems={"flex-start"}
      bgColor="#FAFAF5"
      borderRadius="12px"
      width="80%"
      minH="200px"
    >
      <HStack alignItems={"flex-start"}>
        <Box width="60%">
          <Text fontSize="25px">{tracker.trackerName}</Text>
          <Text>{tracker.trackerDescription}</Text>
        </Box>
        <Box>s</Box>
      </HStack>
    </Box>
  );
}
