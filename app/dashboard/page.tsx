import { Box } from "@mui/material";

import { Metadata } from "next";
import Navbar from "../components/UI/navbar";
import Items from "./components/items";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your products",
};

const Dashboard = () => {
  return (
    <Box>
      <Navbar />

      <Box sx={{
        border:{xs:"1px solid grey"},
        padding:"10px",
        margin:{xs:"10px", md:"10px 50px", lg:"10px 75px"},
        borderRadius:"20px"
      }}>
        <Items />
      </Box>
    </Box>
  );
};

export default Dashboard;
