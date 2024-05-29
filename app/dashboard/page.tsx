import { Box } from "@mui/material";

import { Metadata } from "next";
import Navbar from "../components/UI/navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your products",
};

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      Estamos en el dashboard
    </Box>
  );
};

export default Dashboard;
