import { NavLink } from "react-router-dom";
import { Box, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
export default function NavBar() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);
  const logout = async () => {
    if (user) {
      await signOut(auth);
      window.location.reload();
    }
  };
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
        {!user || loading ? (
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
        ) : (
          <Button
            onClick={logout}
            _hover={{ bgColor: "#424DB6" }}
            borderRadius="md"
            bgColor="#424DB6;"
            color="white"
            px={8}
            h={10}
            alignSelf="center"
          >
            <Box paddingTop="6px" fontSize="24px">
              <ion-icon name="log-out"></ion-icon>
            </Box>
            <a href="/logout">Log out</a>
          </Button>
        )}
      </ul>
    </nav>
  );
}
