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
  const [datesArray, setDatesArray] = useState([]);
  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    setLoading(true);
    const tempDatesArray = [];
    const map = new Map();

    async function findBooleanValues() {
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", uid)
      );
      const top = query(q, orderBy("when", "asc"));
      const recentQuerySnapshot = await getDocs(top);
      recentQuerySnapshot.forEach((doc) => {
        const date = doc.data().date.toDate();
        const month = date.getMonth() + 1 + "/" + date.getDate();
        if (!map.has(month)) map.set(month, parseInt(doc.data().numberValue));
        else {
          map.set(month, map.get(month) + parseInt(doc.data().numberValue));
        }
      });
      const tempArray = Array.from(map);
      setNumbersArray(tempArray);
      setDatesArray(tempDatesArray);
    }
    findBooleanValues();
  }, []);

  useEffect(() => {
    try {
      setGraphData({
        labels: datesArray.map((data) => data),
        datasets: [
          {
            color: "#6E77CF",
            data: numberArray.map((data) => data),
            backgroundColor: "white",
            borderColor: "#6E77CF",
            scaleShowLabels: false,
            pointBackgroundColor: "#6E77CF",
            pointRadius: 5,
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
                display: true,
              },
            },
          },
          plugins: {
            title: {
              display: false,
              text: "",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    );
}
