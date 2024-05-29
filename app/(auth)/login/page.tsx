"use client";
import Link from "next/link";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Button, Box, Typography, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { login } from "@/app/_Firebase/FirebaseFunctions/AuthFunctions";
import {
  authErrorFirebase,
  authSuccessFirebase,
} from "@/app/_Utilities/alerts";
import CircularProgress from "@mui/material/CircularProgress";
import { FirebaseError } from "firebase/app";
import { errorCodesFirebase } from "@/app/_Utilities/errorCodesFirebase";
import { useRouter } from "next/navigation";
import { setInLocalStorage } from "@/app/_Utilities/localStorage";

const SignInForm = () => {
  const router = useRouter();

  {
    /*----------- State usercredentials--------*/
  }

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  {
    /*----------- Loading state --------*/
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);

  {
    /*----------- Handle Submit form --------*/
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("enviado el formulario");
    setIsLoading(true);
    try {
      let res = await login(userLogin);
      console.log(res);
      setInLocalStorage("user", res)
      router.push("/dashboard");
      if (res) return authSuccessFirebase();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        const errorMessage = errorCodesFirebase(error.code);
        authErrorFirebase(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  {
    /*----------- Handle change input --------*/
  }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "email") setEmailError(!isValidEmail(value));
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  {
    /*----------- Validation Email  form --------*/
  }

  const [emailError, setEmailError] = useState(false);

  const isValidEmail = (email: string) => {
    const lowerCaseEmail = email.toLowerCase();
    return (
      lowerCaseEmail.includes("@") && lowerCaseEmail.includes("cloudlabs.us")
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*----------- Email input--------*/}
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
          <EmailIcon
            sx={{
              position: "absolute",
              top: "45%",
              left: "12px",
              width: "20px",
              height: "20px",
              color: "#3F51B5",
            }}
          />
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
            helperText={
              emailError
                ? "El correo electrónico debe tener @ y la extensión cloudlabs.us"
                : ""
            }
            FormHelperTextProps={{
              style: { color: emailError ? "red" : "inherit" },
            }}
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

        {/*----------- Password input--------*/}

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
          <LockIcon
            sx={{
              position: "absolute",
              top: "55%",
              left: "12px",
              width: "20px",
              height: "20px",
              color: "#3F51B5",
            }}
          />
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

        {/*----------- Go to Forgot password link--------*/}

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginBottom: "15px",
            fontWeight: "bolder",
          }}
        >
          <Link href="/forgot-password"> ¿Olvidó su contraseña?</Link>
        </Box>

        {/*----------- Submit  input--------*/}

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{
            marginBottom: "15px",
          }}
        >
          {isLoading && <CircularProgress />}
          Iniciar sesión
        </Button>

        {/*----------- Go to register  link--------*/}

        <Box>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            ¿No tiene una cuenta?
            <Link href="/register">
              {" "}
              <b>¡Regístrate aquí!</b>
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default SignInForm;
