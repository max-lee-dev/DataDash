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
  Divider,
} from "@chakra-ui/react";
import Statistics from "./Statistics";
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
import NumberChart from "./NumberChart";
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
  const [showBoolean, setShowBoolean] = useState(true);
  const [showNumber, setShowNumber] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [showDate, setShowTime] = useState(true);
  const [activeElements, setActiveElements] = useState(1);
  const [numEntries, setNumEntries] = useState(0);
  useEffect(() => {
    async function countSubmissions() {
      let amount = 0;
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", tracker.trackerUID)
      );
      const recentQuerySnapshot = await getDocs(q);
      const tempArray = [];
      const tempTimeArray = [];
      recentQuerySnapshot.forEach((doc) => {
        amount++;
      });
      setNumEntries(amount);
    }
    countSubmissions();
  }, [tracker]);
  let numDataValues = 0;
  if (tracker.isBoolean) {
    numDataValues++;
  }
  if (tracker.isNumber) {
    numDataValues++;
  }
  if (tracker.isNotes) {
    numDataValues++;
  }
  if (tracker.isTime) {
    numDataValues++;
  }

  useEffect(() => {
    let active = 0;
    if (showBoolean && tracker.isBoolean) {
      active++;
    }
    if (showNumber && tracker.isNumber) {
      active++;
    }
    if (showNotes && tracker.isNotes) {
      active++;
    }
    if (showDate && tracker.isTime) {
      active++;
    }
    setActiveElements(active);
  }, [showBoolean, showNumber, showNotes, showDate]);
  const sizing = 100 / activeElements;

  return (
    <Box alignItems={"flex-start"} width="100%">
      <HStack alignItems={"flex-start"} spacing="5">
        <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="72%">
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
            <HStack alignItems={"flex-start"}>
              {tracker.isNumber && (
                <Box width={showNumber ? `${sizing}%` : ""}>
                  <Button
                    height="25px"
                    width="25px"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    onClick={() => setShowNumber(!showNumber)}
                  >
                    <Box fontSize="25px">
                      {showNumber ? (
                        <Box>
                          <ion-icon name="eye-sharp"></ion-icon>
                        </Box>
                      ) : (
                        <ion-icon name="eye-off-sharp"></ion-icon>
                      )}
                    </Box>
                  </Button>

                  {showNumber && (
                    <Box
                      alignSelf={"center"}
                      display="flex"
                      overflowWrap={"normal"}
                      width={`${sizing}%`}
                    >
                      <NumberChart uid={tracker.trackerUID} />
                    </Box>
                  )}
                </Box>
              )}
              {tracker.isBoolean && (
                <Box width={showBoolean ? `${sizing}%` : ""}>
                  <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    onClick={() => setShowBoolean(!showBoolean)}
                  >
                    <Box fontSize="25px">
                      {showBoolean ? (
                        <ion-icon name="eye-sharp"></ion-icon>
                      ) : (
                        <ion-icon name="eye-off-sharp"></ion-icon>
                      )}
                    </Box>
                  </Button>
                  <Box display="flex" overflowWrap={"normal"}>
                    {showBoolean && <BooleanChart uid={tracker.trackerUID} />}
                  </Box>
                </Box>
              )}
            </HStack>
          </Box>
        </Box>
        <Statistics tracker={tracker} numEntries={numEntries} />
      </HStack>
      <NewDataEntryModal
        isAddEntryOpen={isAddEntryOpen}
        onAddEntryClose={onAddEntryClose}
        tracker={tracker}
      />
    </Box>
  );
}
