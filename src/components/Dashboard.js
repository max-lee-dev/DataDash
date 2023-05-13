import React, { useEffect, useState } from "react";
import AddTrackerButton from "./AddTrackerButton";
import NewTrackerModal from "./NewTrackerModal";
import Tracker from "./Tracker";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

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
      console.log("FINDING TRACKERS");
      const q = query(trackersCollectionRef, where("userUID", "==", user?.uid));
      const trackersSnapshot = await getDocs(q);
      const trackersList = trackersSnapshot.docs.map((doc) => doc.data());
      setMyTrackers(trackersList);
    }
    if (!loading) getTrackers();
  }, [user]);
  const {
    isOpen: isAddTrackerOpen,
    onClose: onAddTrackerClose,
    onOpen: onAddTrackerOpen,
  } = useDisclosure();
  console.log(myTrackers);

  return (
    <Box paddingTop="50px" minHeight="60vh" className="mainFont">
      {loading && (
        <Center>
          <Text>Loading...</Text>
        </Center>
      )}
      {!loading && (
        <Box>
          <Text fontSize="24px">Welcome {user?.displayName} </Text>

          <Box className="floating">
            <AddTrackerButton
              isAddTrackerOpen={isAddTrackerOpen}
              onAddTrackerOpen={onAddTrackerOpen}
              onAddTrackerClose={onAddTrackerClose}
              user={user}
            />
          </Box>
          <Text>
            {myTrackers.length > 0 && (
              <Box>
                <Text fontSize="18px">My Trackers</Text>
                <VStack>
                  {myTrackers.map((tracker) => (
                    <Tracker key={tracker.trackerName} tracker={tracker} />
                  ))}
                </VStack>
              </Box>
            )}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
