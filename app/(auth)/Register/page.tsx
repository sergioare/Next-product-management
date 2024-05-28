import { Box, Typography } from "@mui/material";
import logo from "../../../public/brand.webp";
import Image from "next/image";

import { Metadata } from "next";
import SignUpForm from "./signUpComponent";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to create an admin account",
};

export default function Register() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*----------form sign in-----------*/}
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", md: "80%", lg: "50%" },
          height: "100%",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignUpForm />
      </Box>

      {/*----------welcome part with logo-----------*/}
      <Box
        className="bg-auth"
        sx={{
          display: { xs: "none", md: "flex" },
          width: { md: "40%", lg: "50%" },
          height: "100%",
          padding: "20px",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Image
          src={logo}
          alt="Brand Logo"
          width={256}
          height={75}
          style={{ margin: "100px 0" }}
        />
        <Typography variant="h2"> ¡En hora buena!</Typography>
        <Typography variant="h4">
          Registrate para poder hacer uso de tu panel administrativo.
        </Typography>
      </Box>
    </Box>
  );
}
