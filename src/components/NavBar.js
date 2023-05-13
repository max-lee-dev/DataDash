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
          borderRadius="md"
          bgColor="#424DB6;"
          color="white"
          px={8}
          h={10}
          alignSelf="center"
        >
          <a href="/dashboard">About </a>
        </Box>
        <Box
          borderRadius="md"
          bgColor="#424DB6;"
          color="white"
          px={8}
          h={10}
          alignSelf="center"
        >
          <a href="/login">Log in</a>
        </Box>
      </ul>
    </nav>
  );
}
