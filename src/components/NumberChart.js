import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import Chart from "chart.js/auto";

export default function NumberChart({ uid }) {
  const [loading, setLoading] = useState(true);
  const [numberArray, setNumbersArray] = useState([]);
  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    setLoading(true);
    const tempArray = [];

    async function findBooleanValues() {
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", uid)
      );
      const top = query(q, orderBy("when", "asc"));
      const recentQuerySnapshot = await getDocs(top);
      recentQuerySnapshot.forEach((doc) => {
        tempArray.push(doc.data().numberValue);
      });
      setNumbersArray(tempArray);
    }
    findBooleanValues();
  }, []);
  console.log(numberArray);

  useEffect(() => {
    try {
      setGraphData({
        datasets: [
          {
            label: "WPM",
            data: numberArray.map((data) => data),
            backgroundColor: "white",
            scaleShowLabels: false,
            pointBackgroundColor: "#FFCD29",
            pointRadius: 1,
            pointHitRadius: 100,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [numberArray]);
  const dataEntriesCollectionRef = collection(db, "dataEntries");

  if (!loading)
    return (
      <Line
        data={graphData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 50,
              },
              gridLines: {
                display: false,
                width: 0,
              },
            },
            x: {
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    );
}
