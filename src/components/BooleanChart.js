import React, { useEffect, useState } from "react";
import { Box, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export default function BooleanChart({ uid }) {
  const dataEntriesCollectionRef = collection(db, "dataEntries");
  const [booleanArray, setBooleanArray] = useState([]);
  useEffect(() => {
    async function findBooleanValues() {
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", uid)
      );
      const top = query(q, orderBy("when", "asc"));
      const recentQuerySnapshot = await getDocs(top);
      const tempArray = [];
      recentQuerySnapshot.forEach((doc) => {
        tempArray.push(doc.data().booleanValue);
      });
      setBooleanArray(tempArray);
    }
    findBooleanValues();
  }, []);
  console.log(booleanArray);

  return (
    <Box bgColor="#e6e2c1">
      <Box display="flex" minWidth="100%">
        {booleanArray.map((value) => (
          <Box
            marginLeft="10px"
            bg={value ? "green" : "red"}
            minH="20px"
            width="20px"
          ></Box>
        ))}
      </Box>
    </Box>
  );
}
