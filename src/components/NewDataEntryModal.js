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

export default function NewDataEntryModal({
  isAddEntryOpen,
  onAddEntryClose,
  Entry,
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
  const [EntryName, setEntryName] = useState("");
  const [description, setDescription] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [isNotes, setIsNotes] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log(EntryName, isNumber, isBoolean, isTime, isNotes);
  useEffect(() => {
    setEntryName("");
    setIsNumber(false);
    setIsBoolean(false);
    setIsTime(false);
    setIsNotes(false);
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
              <Input
                fontSize="24px"
                placeholder="My sleeping log"
                onChange={(e) => setEntryName(e.target.value)}
                width="auto"
                type="text"
              />
              <Box paddingBottom="10px">
                <Input
                  type="text"
                  fontSize="16px"
                  height="40px"
                  borderColor="transparent"
                  placeholder="tracking if i slept before 12 AM"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <ModalCloseButton />
            </Box>
          </ModalHeader>

          <ModalBody>
            <Box paddingLeft="15px" className="mainFont">
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack alignItems={"flex-start"}>
                  <Box paddingLeft="5px">hi</Box>
                </VStack>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter> </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
