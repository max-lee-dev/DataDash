import React, { useEffect, useState } from "react";
import AddTrackerButton from "./AddTrackerButton";
import NewTrackerModal from "./NewTrackerModal";
import Tracker from "./Tracker";
import { db } from "./firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

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
  const [myTrackers, setMyTrackers] = useState([]);

  const trackersCollectionRef = collection(db, "trackers");

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
    async function getTrackers() {
      const q = query(trackersCollectionRef, where("userUID", "==", user?.uid));
      const order = query(q, orderBy("when", "desc"));
      const trackersSnapshot = await getDocs(order);
      const trackersList = trackersSnapshot.docs.map((doc) => doc.data());
      setMyTrackers(trackersList);
    }
    if (!loading && user) getTrackers();
  }, [user]);
  const {
    isOpen: isAddTrackerOpen,
    onClose: onAddTrackerClose,
    onOpen: onAddTrackerOpen,
  } = useDisclosure();

  return (
    <Box paddingTop="50px" minHeight="60vh" className="mainFont">
      {loading && (
        <Center>
          <Text>Loading...</Text>
        </Center>
      )}
      {!loading && !user && (
        <Box>
          <Center>
            <Box width="80%">
              <VStack alignItems="flex-start" spacing="-8">
                <Text
                  paddingBottom="20px"
                  fontWeight="700"
                  color="#424DB6"
                  fontSize="60px"
                >
                  DataDash
                </Text>
                <Text paddingBottom="20px" fontSize="24px">
                  Track and analyze your daily data
                </Text>
              </VStack>
            </Box>
          </Center>
          <Center>
            <Box>
              <Button
                as="a"
                fontSize="60px"
                color="white"
                bgColor="#424DB6"
                width="400px"
                height="100px"
                marginTop="50px"
              >
                <a href="/login"> Get Started</a>
              </Button>
            </Box>
          </Center>
        </Box>
      )}

      {!loading && user && (
        <Center>
          <Box width="80%">
            <Text paddingBottom="20px" fontWeight="600" fontSize="24px">
              Welcome, {user?.displayName}
              {user ? "" : "Guest"}
            </Text>
            <Text paddingBottom="20px" fontSize="24px">
              {user ? "" : "Please log in to view your trackers."}
            </Text>

            <Text paddingBottom="20px" fontSize="24px"></Text>

            <Box className="floating">
              <AddTrackerButton
                isAddTrackerOpen={isAddTrackerOpen}
                onAddTrackerOpen={onAddTrackerOpen}
                onAddTrackerClose={onAddTrackerClose}
                user={user}
              />
            </Box>
            <Box></Box>
            <Text>
              {myTrackers.length > 0 && (
                <Box>
                  <VStack>
                    {myTrackers.map((tracker) => (
                      <Tracker key={tracker.trackerName} tracker={tracker} />
                    ))}
                  </VStack>
                </Box>
              )}
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Dashboard;
