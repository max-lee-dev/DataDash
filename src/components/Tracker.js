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
  orderBy,
  query,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import NumberChart from "./NumberChart";
import BooleanChart from "./BooleanChart";
import ShowMoreModal from "./ShowMoreModal";
import RenderDates from "./functions/RenderDates";
import RenderBooleans from "./functions/RenderBooleans";
import RenderValues from "./functions/RenderValues";
import RenderTimes from "./functions/RenderTimes";
import RenderNotes from "./functions/RenderNotes";

export default function Tracker({ tracker }) {
  const {
    isOpen: isShowMoreOpen,
    onOpen: onShowMoreOpen,
    onClose: onShowMoreClose,
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
  const [showTime, setShowTime] = useState(true);
  const [activeElements, setActiveElements] = useState(1);
  const [dataEntries, setDataEntries] = useState([]);
  const [numEntries, setNumEntries] = useState(0);

  useEffect(() => {
    async function countSubmissions() {
      let amount = 0;
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", tracker.trackerUID)
      );
      const top = query(q, orderBy("when", "asc"));
      const recentQuerySnapshot = await getDocs(top);
      const tempArray = [];
      const tempTimeArray = [];
      recentQuerySnapshot.forEach((doc) => {
        tempArray.push(doc.data());
        amount++;
      });
      setNumEntries(amount);
      setDataEntries(tempArray);
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
    if (showTime && tracker.isTime) {
      active++;
    }
    setActiveElements(active);
  }, [showBoolean, showNumber, showNotes, showTime]);
  const sizing = 100 / activeElements;

  return (
    <Box fontWeight={400} alignItems={"flex-start"} width="100%">
      <HStack alignItems={"flex-start"} spacing="5">
        <Box
          bgColor="#FAFAF5"
          borderRadius="12px"
          minH="200px"
          width="72%"
          transition="margin .1s ease-in-out"
          _hover={{ mb: "2", mt: "-2", boxShadow: "lg" }}
        >
          <Box display="flex" justifyContent={"space-between"} color="#424DB6">
            <VStack alignItems={"flex-start"} spacing={-1}>
              <Text paddingLeft="10px" fontSize="25px" fontWeight={600}>
                {tracker.trackerName}
              </Text>
              <Text color="gray" paddingLeft="10px">
                {tracker.trackerDescription}
              </Text>
            </VStack>

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

          <Box>
            <Divider />
            <Box
              paddingTop="5px"
              onClick={onShowMoreOpen}
              cursor={"pointer"}
              height="150px"
            >
              <HStack fontWeight="400" fontSize="20px" color="gray">
                <Box paddingLeft="10px" width="10%">
                  Date
                </Box>
                {tracker.isNumber && (
                  <Box width={`${sizing}%`} height="100%">
                    <Text>Value</Text>
                  </Box>
                )}
                {tracker.isBoolean && (
                  <Box width={`${sizing}%`} height="100%">
                    <Text> True/False</Text>
                  </Box>
                )}
                {tracker.isTime && (
                  <Box width={`${sizing}%`} height="100%">
                    <Text>Time</Text>
                  </Box>
                )}
                {tracker.isNotes && (
                  <Box width={`${sizing}%`} height="100%">
                    <Text>Note</Text>
                  </Box>
                )}
              </HStack>
              <HStack>
                <Box paddingLeft="10px" width="10%">
                  <RenderDates dataEntries={dataEntries} />
                </Box>
                {tracker.isNumber && (
                  <Box width={`${sizing}%`} height="100%">
                    <RenderValues dataEntries={dataEntries} />
                  </Box>
                )}
                {tracker.isBoolean && showBoolean && (
                  <Box width={`${sizing}%`} height="100%">
                    <RenderBooleans dataEntries={dataEntries} />
                  </Box>
                )}
                {tracker.isTime && (
                  <Box width={`${sizing}%`} height="100%">
                    <RenderTimes dataEntries={dataEntries} />
                  </Box>
                )}
                {tracker.isNotes && (
                  <Box display="flex" width={`${sizing}%`} height="100%">
                    <RenderNotes dataEntries={dataEntries} />
                  </Box>
                )}
              </HStack>
            </Box>
          </Box>
        </Box>
        <Statistics tracker={tracker} numEntries={numEntries} />
      </HStack>
      <NewDataEntryModal
        isAddEntryOpen={isAddEntryOpen}
        onAddEntryClose={onAddEntryClose}
        tracker={tracker}
      />
      <ShowMoreModal
        isShowMoreOpen={isShowMoreOpen}
        onShowMoreClose={onShowMoreClose}
        tracker={tracker}
      />
    </Box>
  );
}
