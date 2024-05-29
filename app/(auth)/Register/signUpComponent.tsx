"use client";
import Link from "next/link";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Box, Typography, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import {
  authErrorFirebase,
  authSuccessFirebase,
} from "@/app/_Utilities/alerts";
import CircularProgress from "@mui/material/CircularProgress";
import { FirebaseError } from "firebase/app";
import { errorCodesFirebase } from "@/app/_Utilities/errorCodesFirebase";
import { signUp, updateUser } from "@/app/_Firebase/FirebaseFunctions/AuthFunctions";
import { useRouter } from "next/navigation";
import { setInLocalStorage } from "@/app/_Utilities/localStorage";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Register",
//   description: "Register to create an admin account",
// };

export default function SignUpForm() {
  const router = useRouter();

  {
    /*----------- State usercredentials--------*/
  }

  const [userRegister, setUserRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      const authUser = {
        email: userRegister.email,
        password: userRegister.password,
        confirmPassword: userRegister.confirmPassword,
        displayName: userRegister.name,
      };
      let res = await signUp(authUser);
      setInLocalStorage("user", res)
      await updateUser({displayName: authUser.displayName})
      console.log(res);
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
    setUserRegister({
      ...userRegister,
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
  {
    /*----------- Validation Password  form --------*/
  }

  const [passError, setPassError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordValidation = () => {
    if (userRegister.password !== userRegister.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      setPassError(true);
    } else if (userRegister.password.length < 6) {
      setPasswordError("La contraseña es muy corta");
      setPassError(true);
    } else {
      setPasswordError("");
      setPassError(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*----------- Name and LastName input--------*/}
        <Box className="input-form">
          <InputLabel
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
            id="name"
          >
            Nombres y Apellidos<span style={{ color: "#007FC0" }}>*</span>
          </InputLabel>

          <TextField
            required
            name="name"
            id="name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={userRegister.name}
            onChange={handlerChange}
            sx={{
              "& input": {
                textAlign: "left",
              },
            }}
            InputLabelProps={{
              style: {
                padding: "5px 15px 5px 45px",
                fontSize: "16px",
              },
            }}
            InputProps={{
              style: {
                paddingLeft: "40px",
                fontSize: "16px",
              },
            }}
          />
          <PersonIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "12px",
              width: "20px",
              height: "20px",
              color: "#3F51B5",
            }}
          />
        </Box>

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
            size="small"
            id="email"
            autoComplete="on"
            value={userRegister.email}
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
            value={userRegister.password}
            size="small"
            onChange={handlerChange}
            onBlur={handlePasswordValidation}
            helperText={passError ? passwordError : ""}
            FormHelperTextProps={{
              style: { color: passError ? "red" : "inherit" },
            }}
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

        {/*----------- Forgot Password input--------*/}

        <Box className="input-form">
          <InputLabel
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
            id="confirmPassword"
          >
            Confirme contraseña
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
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={userRegister.confirmPassword}
            size="small"
            onChange={handlerChange}
            onBlur={handlePasswordValidation}
            placeholder="Confirme su contraseña"
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
            onClick={toggleConfirmPasswordVisibility}
          />
        </Box>

        {/*----------- Submit  input--------*/}

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading || emailError || passError}
          sx={{
            marginBottom: "15px",
          }}
        >
          {isLoading && <CircularProgress />}
          Registrarme
        </Button>

        {/*----------- Go to register  link--------*/}

        <Box>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            ¿Ya tiene una cuenta?
            <Link href="/">
              <b> ¡Inicie sesión aquí!</b>
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
}
