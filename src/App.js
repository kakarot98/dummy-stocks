import "./App.css";
//import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Portfolio from "./components/portfolio/Portfolio";
import NavBar from "./components/navigation/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import { Toolbar, AppBar, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const { currentUser } = false;

  // const RequireAuth = ({ children }) => {
  //   return currentUser ? children : <Navigate to="/login" />;
  // };

  return (
    <Router>
      <NavBar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
