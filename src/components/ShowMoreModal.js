import React from "react";
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
import NumberChart from "./NumberChart";
import BooleanChart from "./BooleanChart";
import { auth } from "./firebase";
import { useState, useEffect } from "react";

export default function ShowMoreModal({
  isShowMoreOpen,
  onShowMoreClose,
  tracker,
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [showBoolean, setShowBoolean] = useState(true);
  const [showNumber, setShowNumber] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [showDate, setShowTime] = useState(true);
  const sizing = 100;
  return (
    <>
      <Modal
        isOpen={isShowMoreOpen}
        onClose={onShowMoreClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent bgColor={"#FAFAF5"} width="1000px">
          <ModalHeader>
            <Text fontSize="30px" fontWeight="600">
              {tracker.trackerName}
            </Text>

            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Box paddingLeft="1px" className="mainFont">
              <VStack alignItems={"flex-start"}>
                {tracker.isNumber && (
                  <Box width={showNumber ? `${sizing}%` : ""}>
                    <Button
                      height="25px"
                      width="25px"
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      onClick={() => setShowNumber(!showNumber)}
                    >
                      <Box paddingLeft="100px" fontSize="25px">
                        <HStack>
                          {showNumber ? (
                            <Box>
                              <ion-icon name="eye-sharp"></ion-icon>
                            </Box>
                          ) : (
                            <ion-icon name="eye-off-sharp"></ion-icon>
                          )}
                          <Text fontSize="20px" paddingBottom="5px">
                            Value
                          </Text>
                        </HStack>
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
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            {" "}
            <Button
              colorScheme="blue"
              onClick={onShowMoreClose}
              className="mainFont"
            >
              cool
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}