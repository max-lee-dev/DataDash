import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import { Box } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/LoginPage';
function App() {
  return (
    <ChakraProvider>
      <NavBar />
        <Box minHeight={'80vh'}>
            <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={< LoginPage/>} />

            </Routes>
            </Router>


        </Box>




    </ChakraProvider>

  );
}

export default App;
