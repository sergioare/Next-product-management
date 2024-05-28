"use client";
import Image from "next/image";
import { Metadata } from "next";
import { Button, Box, Typography, InputLabel, TextField } from "@mui/material";
import logo from "../public/brand.webp";
import Link from "next/link";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to get access to dashboard",
// };

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("enviado el formulario");
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };
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
        <form onSubmit={handleSubmit}>

          <Box className="input-form">
            <InputLabel
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
              id="email"
            >
              Correo Electrónico
            </InputLabel>
            <EmailIcon sx={{
              position:"absolute",
              top:"55%",
              left:"12px",
              width:"20px",
              height:"20px",
              color: "#3F51B5",
            }} />
            <TextField
              sx={{ width: "100%" }}
              required
              placeholder="Ingrese su correo"
              type="email"
              name="email"
              id="email"
              autoComplete="on"
              value={userLogin.email}
              onChange={handlerChange}
              InputLabelProps={{
                style: {
                  padding: "5px 15px 5px 45px",

                  fontSize: "16px",
                },
              }}
              InputProps={{
                style: {
                  padding: "5px 15px 5px 45px",
                  fontSize: "16px",
                },
              }}
            />
          </Box>

          <Box className="input-form">
            <InputLabel
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
              id="password"
            >
              Contraseña
            </InputLabel>
            <LockIcon sx={{
              position:"absolute",
              top:"55%",
              left:"12px",
              width:"20px",
              height:"20px",
              color: "#3F51B5",
            }} />
            <TextField
              sx={{ width: "100%" }}
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={userLogin.password}
              onChange={handlerChange}
              placeholder="Ingrese su contraseña"
              autoComplete="on"
              InputLabelProps={{
                style: {
                  padding: "5px 15px 5px 45px",
                  fontSize: "16px",
                },
              }}
              InputProps={{
                style: {
                  padding: "5px 15px 5px 45px",
                  fontSize: "16px",
                },
              }}
            />
            <VisibilityOutlinedIcon
              sx={{
                position: "absolute",
                zIndex: 10,
                color: "#3F51B5",
                right: "12px",
                width: "20px",
                height: "20px",
                top: "55%",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            />
          </Box>
          <Button variant="contained" type="submit" sx={{
            marginBottom:"15px"
          }}>
            Iniciar sesión
          </Button>

          {/* <Link to={recoverPassword} className="forgot-pass">
            ¿Olvidó la contraseña?
          </Link> */}

          <Box>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              ¿No tiene una cuenta? 
              <Link href="/register"> ¡Regístrate aquí!</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
