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
import ConvertMinutesToTime from "./functions/ConvertMinutesToTime";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import Chart from "chart.js/auto";

export default function TimeChart({ uid }) {
  const [loading, setLoading] = useState(true);
  const [timeArray, setTimeArray] = useState([]);
  const [dateArray, setDateArray] = useState([]);
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

        map.set(month, parseTimeString(doc.data().timeValue));
      });
      const tempArray = Array.from(map.values());
      const tempDateArray = Array.from(map.keys());
      setDateArray(tempDateArray);
      setTimeArray(tempArray);
    }
    findBooleanValues();
  }, []);

  function parseTimeString(time) {
    // Parse the hours, minutes, and AM/PM from the time string
    const [hour, minute, period] = time.split(/:|(?<=\d)(?=[AP]M)/);

    // Convert the hours and minutes to numbers
    const hourNumber = parseInt(hour);
    const minuteNumber = parseInt(minute);
    console.log(hourNumber + " WTF::: " + minuteNumber);
    // Convert the hours to a 24-hour clock if necessary
    const hour24 = period === "PM" ? hourNumber + 12 : hourNumber;

    // Convert the hours and minutes to a total number of minutes
    const minuteTotal = hour24 * 60 + minuteNumber;
    console.log("MINUTE TOTAL: " + minuteTotal);

    return parseInt(minuteTotal);
  }
  console.log("TIME ARRAY: " + timeArray[0]);

  useEffect(() => {
    try {
      setGraphData({
        labels: timeArray.map((data) => ConvertMinutesToTime(data)),
        datasets: [
          {
            color: "#6E77CF",
            data: timeArray.map((data) => data),
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
  }, [timeArray]);
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
