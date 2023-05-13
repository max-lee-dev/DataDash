import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import { Box } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/LoginPage';
function App() {
  let Component
  switch (window.location.pathname){
    case "/":
      Component = <Dashboard />
      break
      
      case "/login":
        Component = <LoginPage />
        break
      default:
  }
  return (
    <ChakraProvider>
      <Box bgColor='#D4D4D4'>
        <NavBar />
      
        <Box className="container">
          {Component}
        </Box>
      </Box>
    </ChakraProvider>

  );
}

export default App;
