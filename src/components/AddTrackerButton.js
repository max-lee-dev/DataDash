import React from "react";
import { Button, Box, Tooltip } from "@chakra-ui/react";

export default function AddTrackerButton() {
  return (
    <Tooltip label="Add new tracker">
      <Box>
        <Button borderRadius={"50px"} minH="50px">
          <Box paddingTop="3px" fontSize="20px">
            <ion-icon name="add-outline"></ion-icon>
          </Box>
        </Button>
      </Box>
    </Tooltip>
  );
}
