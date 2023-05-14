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

import AddTracker from "./functions/AddTracker";

export default function NewTrackerModal({
  isAddTrackerOpen,
  onAddTrackerClose,
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
  const [trackerName, setTrackerName] = useState("");
  const [description, setDescription] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [isNotes, setIsNotes] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log(trackerName, isNumber, isBoolean, isTime, isNotes);
  useEffect(() => {
    setTrackerName("");
    setIsNumber(false);
    setIsBoolean(false);
    setIsTime(false);
    setIsNotes(false);
  }, []);
  return (
    <>
      <Modal
        isOpen={isAddTrackerOpen}
        onClose={onAddTrackerClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent bgColor={"#FAFAF5"} width="500px">
          <ModalHeader>
            <Box className="mainFont">
              <Input
              marginTop = "20px"
              marginBottom = "10px"
                fontSize="24px"
                placeholder="Tracker Name..."
                _hover={{ bgColor: "white" }}
                variant="filled"
                onChange={(e) => setTrackerName(e.target.value)}
                width="fit-content"
                type="text"
              />
              <Box paddingBottom="1px">
                <Input
                _hover={{ bgColor: "white" }}
                variant="filled"
                  type="text"
                  fontSize="14px"
                  height="28px"
                  placeholder="Description... (optional)"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <ModalCloseButton />
            </Box>
          </ModalHeader>

          <ModalBody>
            <Box paddingLeft="1px" className="mainFont">
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack alignItems={"flex-start"}>
                  <Box paddingLeft="5px">
                    <VStack alignItems={"flex-start"}>
                      <Text>select tracking type</Text>
                      <Box>
                        <HStack>
                          <Checkbox
                            size={"lg"}
                            colorScheme="green"
                            onChange={(e) => setIsNumber(e.target.checked)}
                          />{" "}
                          <Text>Number</Text>
                        </HStack>
                      </Box>
                      <Box>
                        <HStack>
                          <Checkbox
                            size={"lg"}
                            colorScheme="green"
                            onChange={(e) => setIsBoolean(e.target.checked)}
                          />
                          <Text>True/False</Text>
                        </HStack>
                      </Box>
                      <Box>
                        <HStack>
                          <Checkbox
                            size={"lg"}
                            colorScheme="green"
                            onChange={(e) => setIsTime(e.target.checked)}
                          />
                          <Text>Time</Text>
                        </HStack>
                      </Box>
                      <Box>
                        <HStack>
                          <Checkbox
                            size={"lg"}
                            colorScheme="green"
                            onChange={(e) => setIsNotes(e.target.checked)}
                          />
                          <Text>Notes</Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            {" "}
            <Button
              colorScheme="blue"
              onClick={() =>
                AddTracker(
                  user?.uid,
                  trackerName,
                  isNumber,
                  isBoolean,
                  isTime,
                  isNotes,
                  description
                )
              }
            >
              Add new
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
