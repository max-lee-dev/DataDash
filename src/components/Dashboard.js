import React from "react";
import AddTrackerButton from "./AddTrackerButton";
import NewTrackerModal from "./NewTrackerModal";

import {
  Center,
  Box,
  HStack,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
const Dashboard = () => {
  const {
    isOpen: isAddTrackerOpen,
    onClose: onAddTrackerClose,
    onOpen: onAddTrackerOpen,
  } = useDisclosure();
  console.log(isAddTrackerOpen);

  return (
    <Box paddingTop="50px" minHeight="60vh">
      <Text fontSize="24px">Dashboard</Text>

      <Box className="floating">
        <AddTrackerButton
          isAddTrackerOpen={isAddTrackerOpen}
          onAddTrackerOpen={onAddTrackerOpen}
          onAddTrackerClose={onAddTrackerClose}
        />
      </Box>
      <Text>{isAddTrackerOpen} hi </Text>
    </Box>
  );
};

export default Dashboard;
