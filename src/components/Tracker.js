import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Tracker({ tracker }) {
  return (
    <Box alignItems={"flex-start"} width="80%">
      <HStack alignItems={"flex-start"} spacing="5">
        <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="60%">
          <Box>
            <HStack>
              <Text paddingLeft="10px" fontSize="25px">
                {tracker.trackerName}
              </Text>
              <Box paddingTop="5px" fontSize="16px" cursor={"pointer"}>
                <Tooltip label="Edit tracker">
                  <ion-icon name="pencil-sharp"></ion-icon>
                </Tooltip>
              </Box>
            </HStack>
          </Box>
          <Text paddingLeft="10px">{tracker.trackerDescription}</Text>
        </Box>
        <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="20%">
          <Text paddingLeft="10px" fontSize="22px">
            Statistics
          </Text>
        </Box>
        <Tooltip label="Add new entry">
          <Button
            bgColor="#FAFAF5"
            borderRadius="12px"
            minH="200px"
            width="10%"
          >
            <ion-icon name="add-outline"></ion-icon>
          </Button>
        </Tooltip>
      </HStack>
    </Box>
  );
}
