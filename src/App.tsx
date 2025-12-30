import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import "./App.css";
import Map from "./components/Map";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Sidebar from "./ui/Sidebar";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (  
    <Box sx={{ position: "relative", width: "100%", height: "100vh" }}> 
      <Map />
      <IconButton
        color="primary"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          borderRadius: "16px",
          zIndex: 1000,
        }}
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        anchor="right"
      />
    </Box>
  );
}

export default App;
