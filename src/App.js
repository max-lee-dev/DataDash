import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import { Box } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/LoginPage";
function App() {
  const theme = extendTheme({
    components: {
      Checkbox: {
        baseStyle: {
          bg: "gray.200", // Change this to the desired color
          control: {
            _checked: {
              bg: "green.500", // Change this to the desired color when checked
            },
            _disabled: {
              bg: "gray.200", // Change this to the desired color when disabled
            },
            _hover: {
              bg: "blue.200", // Change this to the desired color on hover
            },
            _focus: {
              boxShadow: "outline",
            },
          },
        },
      },
    },
  });

  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = <Dashboard />;
      break;

    case "/login":
      Component = <LoginPage />;
      break;
    default:
  }
  return (
    <ChakraProvider theme={theme}>
      <Box bgColor="#D4D4D4">
        <NavBar />

        <Box className="container" minH="95vh">
          {Component}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
