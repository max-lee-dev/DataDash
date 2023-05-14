import React from "react";
import { Box, Text, HStack, VStack, Button, Tooltip } from "@chakra-ui/react";

export default function Statistics({ tracker, numEntries }) {
  return (
    <Box bgColor="#FAFAF5" borderRadius="12px" minH="200px" width="20%">
      <Text paddingLeft="10px" fontSize="22px">
        Statistics
      </Text>
      <Text paddingLeft="10px" fontSize="18px">
        {numEntries} entries
      </Text>
    </Box>
  );
}
