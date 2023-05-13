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
  HStack,
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
        <ModalContent bgColor={"#D4D4D4"} width="500px">
          <ModalHeader>
            <Box className="searchModal">
              <Input
                fontSize="24px"
                placeholder="My sleeping log"
                onChange={(e) => setTrackerName(e.target.value)}
                width="90%"
                borderColor="transparent"
                type="text"
              />
              <ModalCloseButton />
            </Box>
          </ModalHeader>

          <ModalBody>
            <Box paddingLeft="15px">
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack alignItems={"flex-start"}>
                  <Box paddingLeft="5px">
                    <VStack alignItems={"flex-start"}>
                      <Text>select desired value(s)</Text>
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
                            onChange={(e) => setIsBoolean(e.target.checked)}
                          />
                          <Text>Time</Text>
                        </HStack>
                      </Box>
                      <Box>
                        <HStack>
                          <Checkbox
                            size={"lg"}
                            colorScheme="green"
                            onChange={(e) => setIsBoolean(e.target.checked)}
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
            <Button colorScheme="blue" onClick={onAddTrackerClose}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
