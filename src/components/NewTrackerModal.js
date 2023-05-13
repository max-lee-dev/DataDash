import React, { useState } from "react";
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
  Checkbox,
} from "@chakra-ui/react";

export default function NewTrackerModal({
  isAddTrackerOpen,
  onAddTrackerClose,
}) {
  const [trackerName, setTrackerName] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isBoolean, setIsBoolean] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log(isNumber);
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
        <ModalContent bgColor={"#D4D4D4"} minHeight={"500px"} width="500px">
          <ModalHeader>
            <Box className="searchModal">
              <Text color="#424DB6" fontSize="32px">
                Add a new tracker
              </Text>
              <ModalCloseButton />
            </Box>
          </ModalHeader>

          <ModalBody>
            <Box
              paddingRight="30px"
              height="520px"
              overflow="auto"
              className="scroll"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack alignItems={"flex-start"}>
                  <Input
                    fontSize="24px"
                    placeholder="My sleeping log"
                    onChange={(e) => setTrackerName(e.target.value)}
                    width="90%"
                    type="text"
                  />

                  <Box paddingLeft="5px">
                    <VStack alignItems={"flex-start"}>
                      <Text>select desired value(s)</Text>

                      <Checkbox
                        fontSize="24px"
                        size={"lg"}
                        colorScheme="green"
                        onChange={(e) => setIsNumber(e.target.checked)}
                      />
                      <Box fontSize="5px">
                        <Checkbox
                          colorScheme="green"
                          onChange={(e) => setIsBoolean(e.target.checked)}
                        />
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            {" "}
            <Button colorScheme="blue" onClick={onAddTrackerClose}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
