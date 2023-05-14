import React from "react";
import { Box, Text, HStack, VStack, Button, Tooltip } from "@chakra-ui/react";

export default function Statistics({ tracker, numEntries }) {
  return (
    <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="20%">
      <Text paddingLeft="10px" fontSize="22px">
        Statistics
      </Text>
      <Text paddingLeft="10px" fontSize="16px">
        {numEntries} entries
      </Text>
      <Text>
        {tracker.isNumber ? (
          <Box>
            <Text paddingLeft="10px" fontSize="16px">
              Average: {tracker.average}
            </Text>
            <Text paddingLeft="10px" fontSize="16px">
              Median: {tracker.median}
            </Text>
          </Box>
        ) : (
          <Box>
            <Text paddingLeft="10px" fontSize="16px">
              Most common: {tracker.mostCommon}
            </Text>
            <Text paddingLeft="10px" fontSize="16px">
              Least common: {tracker.leastCommon}
            </Text>
          </Box>
        )}
      </Text>
    </Box>
  );
}
