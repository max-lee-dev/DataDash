import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Center,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import NewDataEntryModal from "./NewDataEntryModal";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Tracker({ tracker }) {
  const {
    isOpen: isEditTrackerOpen,
    onOpen: onEditTrackerOpen,
    onClose: onEditTrackerClose,
  } = useDisclosure();
  const {
    isOpen: isAddEntryOpen,
    onOpen: onAddEntryOpen,
    onClose: onAddEntryClose,
  } = useDisclosure();
  return (
    <Box alignItems={"flex-start"} width="80%">
      <HStack alignItems={"flex-start"} spacing="5">
        <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="60%">
          <Box display="flex" justifyContent={"space-between"}>
            <Text paddingLeft="10px" fontSize="25px">
              {tracker.trackerName}
            </Text>
            <Box
              paddingTop="5px"
              paddingRight="10px"
              fontSize="16px"
              cursor={"pointer"}
            >
              <Tooltip label="Edit tracker">
                <ion-icon name="ellipsis-horizontal-sharp"></ion-icon>
              </Tooltip>
            </Box>
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
            onClick={onAddEntryOpen}
          >
            <ion-icon name="add-outline"></ion-icon>
          </Button>
        </Tooltip>
      </HStack>
      <NewDataEntryModal
        isAddEntryOpen={isAddEntryOpen}
        onAddEntryClose={onAddEntryClose}
        tracker={tracker}
      />
    </Box>
  );
}
