import { NavLink } from "react-router-dom";
import { Box, Text, HStack, VStack, Button } from "@chakra-ui/react";
export default function NavBar() {
  const path = window.location.pathname;
  return (
    <nav className="nav mainFont">
      <a href="/" className="site-title">
        DataDash
      </a>
      <ul>
        <Box
          bgColor="#211F6B"
          color="white"
          height="50%"
          borderRadius="5px"
          alignSelf="center"
        >
          <a href="/dashboard">About </a>
        </Box>
        <Box bgColor="blue">
          <a href="/login">Log in</a>
        </Box>
      </ul>
    </nav>
  );
}
