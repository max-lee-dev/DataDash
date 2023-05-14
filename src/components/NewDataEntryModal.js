import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import AddEntry from "./functions/AddEntry";

export default function NewDataEntryModal({
  isAddEntryOpen,
  onAddEntryClose,
  tracker,
}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const [numberValue, setNumberValue] = useState(0);
  const [booleanValue, setBooleanValue] = useState(false);
  const [timeValue, setTimeValue] = useState("");
  const [notesValue, setNotesValue] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  useEffect(() => {
    if (!tracker.isNumber) setNumberValue(null);
    if (!tracker.isBoolean) setBooleanValue(null);
    if (!tracker.isTime) setTimeValue(null);
    if (!tracker.isNotes) setNotesValue(null);
  }, []);

  return (
    <>
      <Modal
        isOpen={isAddEntryOpen}
        onClose={onAddEntryClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent bgColor={"#FAFAF5"} width="500px">
          <ModalHeader>
            <Box className="mainFont">
              <Text>{tracker.trackerName}</Text>
              <ModalCloseButton />
            </Box>
          </ModalHeader>

          <ModalBody>
            <Box paddingLeft="15px" className="mainFont">
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack alignItems={"flex-start"}>
                  {tracker.isNumber && (
                    <Input
                      placeholder="number"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
                      width="100%"
                      maxWidth="100px"
                      height="30px"
                      fontSize="15px"
                      marginBottom="10px"
                      ref={initialRef}
                    />
                  )}
                  {tracker.isBoolean && (
                    <HStack>
                      <Checkbox
                        onChange={(e) => setBooleanValue(e.target.checked)}
                        width="100%"
                        maxWidth="500px"
                        height="50px"
                        fontSize="24px"
                        marginBottom="10px"
                        colorScheme="green"
                        ref={initialRef}
                      >
                        Yes
                      </Checkbox>
                    </HStack>
                  )}
                  {tracker.isTime && (
                    <HStack>
                      <Input
                        placeholder="time"
                        onChange={(e) => setTimeValue(e.target.value)}
                        width="100%"
                        maxWidth="500px"
                        height="50px"
                        fontSize="24px"
                        marginBottom="10px"
                        type="text"
                        ref={initialRef}
                      />
                    </HStack>
                  )}
                  {tracker.isNotes && (
                    <HStack>
                      <Input
                        placeholder="notes"
                        onChange={(e) => setNotesValue(e.target.value)}
                        width="100%"
                        maxWidth="500px"
                        height="50px"
                        fontSize="24px"
                        marginBottom="10px"
                        type="text"
                        ref={initialRef}
                      />
                    </HStack>
                  )}
                </VStack>
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() =>
                AddEntry(
                  tracker.trackerUID,
                  numberValue,
                  booleanValue,
                  timeValue,
                  notesValue
                )
              }
            >
              Add new entry
            </Button>{" "}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
