import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Center,
  Tooltip,
  useDisclosure,
  Divider,
  Checkbox,
} from "@chakra-ui/react";

export default function NotesDisplay({ uid }) {
  const map = new Map();
  const [loading, setLoading] = useState(true);
  const [dataEntries, setDataEntries] = useState([]);
  const [dateArray, setDateArray] = useState([]);
  const [notesArray, setNotesArray] = useState([]);
  const dataEntriesCollectionRef = collection(db, "dataEntries");

  useEffect(() => {
    setLoading(true);
    const tempDatesArray = [];
    const map = new Map();

    async function findBooleanValues() {
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", uid)
      );
      const top = query(q, orderBy("when", "desc"));
      const recentQuerySnapshot = await getDocs(top);
      recentQuerySnapshot.forEach((doc) => {
        const date = doc.data().date.toDate();
        const month = date.getMonth() + 1 + "/" + date.getDate();

        map.set(month, doc.data().notesValue);
      });
      const tempArray = Array.from(map.values());
      const tempDateArray = Array.from(map.keys());
      setDateArray(tempDateArray);
      setNotesArray(tempArray);
    }
    findBooleanValues();
  }, []);

  const arr = Array.from(map.values());
  return (
    <Box marginBottom="3px">
      {notesArray.map((entry, i) => (
        <Box>
          <Text fontSize="sm" color="gray.500">
            {dateArray[i]}
          </Text>
          <Text fontSize="md">{entry}</Text>
        </Box>
      ))}
    </Box>
  );
}
