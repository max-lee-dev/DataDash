import React, { useEffect, useState } from "react";
import { Box, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export default function BooleanChart({ uid }) {
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
  const dataEntriesCollectionRef = collection(db, "dataEntries");

  return (
    <Box display={"flex"}>
      {booleanArray.map((value) => (
        <Box display="flex">
          <Box
            marginLeft="10px"
            bg={value ? "green" : "red"}
            height="20px"
            width="20px"
          ></Box>
        </Box>
      ))}
    </Box>
  );
}
