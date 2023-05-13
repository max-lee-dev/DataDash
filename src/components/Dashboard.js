import React, { useEffect, useState } from "react";
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

import { auth } from "./firebase";
const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);
  const {
    isOpen: isAddTrackerOpen,
    onClose: onAddTrackerClose,
    onOpen: onAddTrackerOpen,
  } = useDisclosure();
  console.log(isAddTrackerOpen);

  return (
    <Box paddingTop="50px" minHeight="60vh" className="mainFont">
      {loading && (
        <Center>
          <Text>Loading...</Text>
        </Center>
      )}
      {!loading && (
        <Box>
          <Text fontSize="24px">Dashboard</Text>

          <Box className="floating">
            <AddTrackerButton
              isAddTrackerOpen={isAddTrackerOpen}
              onAddTrackerOpen={onAddTrackerOpen}
              onAddTrackerClose={onAddTrackerClose}
              user={user}
            />
          </Box>
          <Text>
            {isAddTrackerOpen} {user?.displayName}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
