import React, { useEffect, useState } from "react";
import { Box, Text, HStack, VStack, Button, Tooltip } from "@chakra-ui/react";
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
        tempArray.push(doc.data());
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
        <Box marginLeft="10px">
          <Tooltip
            label={
              value.date.toDate().getMonth() +
              1 +
              "/" +
              value.date.toDate().getDate() +
              " " +
              value.booleanValue
            }
          >
            <Box
              bg={value.booleanValue ? "green" : "red"}
              height="20px"
              width="20px"
            ></Box>
          </Tooltip>

          <Text fontSize="12px">
            {value.date.toDate().getMonth() +
              1 +
              "/" +
              value.date.toDate().getDate()}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
