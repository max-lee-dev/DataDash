import React from "react";
import { Button, Box, Tooltip } from "@chakra-ui/react";
import NewTrackerModal from "./NewTrackerModal";

export default function AddTrackerButton({
  user,
  isAddTrackerOpen,
  onAddTrackerOpen,
  onAddTrackerClose,
}) {
  function tryAddTracker() {
    if (user) {
      onAddTrackerOpen();
    } else {
      alert("Please sign in to add a tracker");
    }
  }
  return (
    <Box>
      <Tooltip label="Add new tracker">
        <Box>
          <Button borderRadius={"50px"} minH="50px" onClick={tryAddTracker}>
            <Box paddingTop="3px" fontSize="20px">
              <ion-icon name="add-outline"></ion-icon>
            </Box>
          </Button>
        </Box>
      </Tooltip>
      <NewTrackerModal
        isAddTrackerOpen={isAddTrackerOpen}
        onAddTrackerClose={onAddTrackerClose}
        user={user}
      />
    </Box>
  );
}
