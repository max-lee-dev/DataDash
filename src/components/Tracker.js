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
import {
  doc,
  getDoc,
  query,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import BooleanChart from "./BooleanChart";

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

  const dataEntriesCollectionRef = collection(db, "dataEntries");
  const [numEntries, setNumEntries] = useState(0);
  useEffect(() => {
    async function countSubmissions() {
      console.log(tracker.trackerUID);
      let amount = 0;
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", tracker.trackerUID)
      );
      const recentQuerySnapshot = await getDocs(q);
      const tempArray = [];
      recentQuerySnapshot.forEach((doc) => {
        amount++;
      });
      setNumEntries(amount);
    }
    countSubmissions();
  }, [tracker]);

  return (
    <Box alignItems={"flex-start"} width="100%">
      <HStack alignItems={"flex-start"} spacing="5">
        <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="70%">
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
              <Tooltip label="Add new entry">
                <Button
                  bgColor="transparent"
                  paddingBottom="8px"
                  _hover={{ bgColor: "transparent" }}
                  borderRadius="12px"
                  onClick={onAddEntryOpen}
                >
                  <ion-icon name="add-outline"></ion-icon>
                </Button>
              </Tooltip>
            </Box>
          </Box>
          <Text paddingLeft="10px">{tracker.trackerDescription}</Text>
          <Box>
            <BooleanChart uid={tracker.trackerUID} />
          </Box>
        </Box>
        <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="20%">
          <Text paddingLeft="10px" fontSize="22px">
            Statistics
          </Text>
          <Text paddingLeft="10px" fontSize="18px">
            {numEntries} entries
          </Text>
        </Box>
      </HStack>
      <NewDataEntryModal
        isAddEntryOpen={isAddEntryOpen}
        onAddEntryClose={onAddEntryClose}
        tracker={tracker}
      />
    </Box>
  );
}
