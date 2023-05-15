import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export default function Statistics({ tracker, numEntries }) {
  const dataEntriesCollectionRef = collection(db, "dataEntries");
  const [average, setAverage] = useState(0.0);
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [timeValues, setTimeValues] = useState([]);
  const [booleanArray, setBooleanArray] = useState([]);

  useEffect(() => {
    async function findBooleanValues() {
      const q = query(
        dataEntriesCollectionRef,
        where("parentTracker", "==", tracker.trackerUID)
      );
      const top = query(q, orderBy("when", "asc"));
      const recentQuerySnapshot = await getDocs(top);
      const tempArray = [];
      let sum = 0;
      let highest = Number.MIN_VALUE;
      let lowest = Number.MAX_VALUE;
      const tempTimeArray = [];
      const tempBooleanArray = [];
      recentQuerySnapshot.forEach((doc) => {
        tempArray.push(doc.data());
        if (tracker.isTime) {
          tempTimeArray.push(doc.data().timeValue.replace(" ", ""));
          console.log("time arr: " + tempTimeArray);
        }
        if (tracker.isBoolean) {
          tempBooleanArray.push(doc.data().booleanValue);
        }

        highest = Math.max(highest, parseInt(doc.data().numberValue));
        lowest = Math.min(lowest, parseInt(doc.data().numberValue));
        sum += parseInt(doc.data().numberValue);
      });
      setBooleanArray(tempBooleanArray);
      setAverage(sum / tempArray.length);
      setHighest(highest);
      setLowest(lowest);

      setTimeValues(tempTimeArray);
    }
    findBooleanValues();
  }, []);
  return (
    <Box
      bgColor="#FAFAF5"
      borderRadius="12px"
      minH="200px"
      width="20%"
      paddingBottom="10px"
      paddingTop="5px"
    >
      <Text paddingLeft="10px" fontSize="22px">
        Statistics
        <Text fontSize="16px">{numEntries} entries</Text>
      </Text>

      <Text>
        {tracker.isNumber && (
          <Box>
            <Box fontSize="25px">
              <HStack>
                <Box paddingLeft="5px">
                  <ion-icon name="pencil"></ion-icon>
                </Box>
                <Divider borderWidth={"2px"} />
              </HStack>
            </Box>

            <Text paddingLeft="10px" fontSize="16px">
              Highest: {numEntries === 0 ? "N/A" : highest}
            </Text>
            <Text paddingLeft="10px" fontSize="16px">
              Lowest: {numEntries === 0 ? "N/A" : lowest}
            </Text>
          </Box>
        )}
        {tracker.isBoolean && (
          <Box>
            <Box fontSize="25px">
              <HStack>
                <Box paddingLeft="5px">
                  <ion-icon name="checkbox"></ion-icon>
                </Box>
                <Divider borderWidth={"2px"} />
              </HStack>
            </Box>

            <Text paddingLeft="10px" fontSize="16px">
              Longest streak: {longestStreak(booleanArray)}
            </Text>
            <Text paddingLeft="10px" fontSize="16px"></Text>
          </Box>
        )}
        {tracker.isTime && (
          <Box>
            <Box fontSize="25px">
              <HStack>
                <Box paddingLeft="5px">
                  <ion-icon name="alarm"></ion-icon>
                </Box>
                <Divider borderWidth={"2px"} />
              </HStack>
            </Box>

            <Text paddingLeft="10px" fontSize="16px">
              Average time:{" "}
              {numEntries === 0 ? "N/A" : calculateAverageTime(timeValues)}
            </Text>
            <Text paddingLeft="10px" fontSize="16px">
              Earliest time:{" "}
              {numEntries === 0 ? "N/A" : findEarliest(timeValues)}
            </Text>
            <Text paddingLeft="10px" fontSize="16px">
              {" "}
              Latest time: {numEntries === 0 ? "N/A" : findLatest(timeValues)}
            </Text>
          </Box>
        )}
      </Text>
    </Box>
  );

  function longestStreak(array) {
    let longest = 0;
    let current = 0;
    for (let i = 0; i < array?.length; i++) {
      if (array[i]) {
        current++;
      } else {
        longest = Math.max(longest, current);
        current = 0;
      }
      longest = Math.max(longest, current);
    }
    return longest;
  }

  function calculateAverageTime(timeArray) {
    // Convert each time string to a number of minutes
    let earliest = 1000000;
    let latest = 0;

    const minuteArray = timeArray.map((time) => {
      // Parse the hours, minutes, and AM/PM from the time string
      const [hour, minute, period] = time.split(/:|(?<=\d)(?=[AP]M)/);

      // Convert the hours and minutes to numbers
      const hourNumber = parseInt(hour);
      const minuteNumber = parseInt(minute);
      console.log("time: " + minuteNumber);
      // Convert the hours to a 24-hour clock if necessary
      const hour24 = period === "PM" ? hourNumber + 12 : hourNumber;

      // Convert the hours and minutes to a total number of minutes
      const minuteTotal = hour24 * 60 + minuteNumber;
      earliest = Math.min(earliest, minuteTotal);
      latest = Math.max(latest, minuteTotal);

      return minuteTotal;
    });

    // Calculate the sum of all the minute values
    const minuteSum = minuteArray.reduce((acc, curr) => acc + curr, 0);

    // Divide the sum by the number of times to get the average minute value
    const averageMinute = Math.round(minuteSum / timeArray.length);

    // Convert the average minute value back to a string in "hh:mmAM/PM" format
    const hour12 = Math.floor(averageMinute / 60) % 12 || 12;
    const minute12 = averageMinute % 60;
    const period = averageMinute >= 720 ? "AM" : "PM";
    const averageTime = `${hour12.toString().padStart(2, "0")}:${minute12
      .toString()
      .padStart(2, "0")} ${period}`;

    // Return the average time in "hh:mmAM/PM" format
    if (averageTime.charAt(0) === "0") {
      return averageTime.substring(1);
    }
    return averageTime;
  }

  function findEarliest(times) {
    let earliestTime = times[0] + "";
    let latestTime = times[0] + "";

    for (let i = 1; i < times.length - 1; i++) {
      const currentTime = times[i] + "";
      console.log("cur: " + earliestTime);

      if (isTimeLater(currentTime, latestTime)) {
        latestTime = currentTime;
      }

      if (isTimeLater(earliestTime, currentTime)) {
        earliestTime = currentTime;
      }
    }
    return earliestTime;
  }
  function findLatest(times) {
    let earliestTime = times[0] + "";
    let latestTime = times[0] + "";

    for (let i = 1; i < times.length - 1; i++) {
      const currentTime = times[i] + "";
      console.log("cur: " + earliestTime);

      if (isTimeLater(currentTime, latestTime)) {
        latestTime = currentTime;
      }

      if (isTimeLater(earliestTime, currentTime)) {
        earliestTime = currentTime;
      }
    }
    return latestTime;
  }

  function isTimeLater(time1, time2) {
    const [hours1, minutes1, period1] = time1.split(/:|(?<=\d)(?=[AP]M)/);
    const [hours2, minutes2, period2] = time2.split(/:|(?<=\d)(?=[AP]M)/);

    if (period1 === period2) {
      if (parseInt(hours1) === parseInt(hours2)) {
        return parseInt(minutes1) > parseInt(minutes2);
      } else {
        return parseInt(hours1) > parseInt(hours2);
      }
    } else {
      if (period1 === "AM") {
        return false;
      } else {
        return true;
      }
    }
  }
}
