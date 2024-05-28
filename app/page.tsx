import Image from "next/image";
import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import logo from "../public/brand.webp";
import SignInForm from "./(auth)/login/page";

export const metadata: Metadata = {
  title: "Welcome Page",
  description: "Login to get access to dashboard",
};

export default function Home() {
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
        <Typography variant="h2"> ¡Bienvenido!</Typography>
        <Typography variant="h4">
          Accede a tu panel de control y gestiona el sistema de manera
          eficiente.
        </Typography>
      </Box>
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
        {/*----------form sign in-----------*/}

        <SignInForm/>

      </Box>
    </Box>
  );
}
