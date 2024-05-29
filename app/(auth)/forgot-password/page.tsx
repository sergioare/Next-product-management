"use client";

import { recoverPass } from "@/app/_Firebase/FirebaseFunctions/AuthFunctions";
import { authErrorFirebase, recoverPassAlert } from "@/app/_Utilities/alerts";
import { errorCodesFirebase } from "@/app/_Utilities/errorCodesFirebase";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Button, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { tokens } from "@/app/_MUI/theme";


const ForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  {
    /*----------- State usercredentials--------*/
  }

  const [user, setUser] = useState({
    email: "",
  });

  {
    /*----------- Handle Submit form --------*/
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("enviado el formulario");

    try {
      await recoverPass(user.email);
      recoverPassAlert();
      router.push("/")
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        const errorMessage = errorCodesFirebase(error.code);
        authErrorFirebase(errorMessage);
      }
    }
  };

  {
    /*----------- Handle change input --------*/
  }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "email") setEmailError(!isValidEmail(value));
    setUser({
      ...user,
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
    <Box sx={{
        display:"flex",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        margin:"100px 0"
    }}>
     <Box sx={{
        display:"flex",
        maxWidth:"500px",
        flexDirection:"column",
        border:"2px solid $"
     }}>
    <Typography variant='h2'sx={{textAlign:"center", margin:"20px 0"}}>Recuperar contraseña</Typography>

    <Typography variant='h5'sx={{textAlign:"center", margin:"20px 0", color:colors.grey[100]}}>Escribe tu correo para enviarte un link con el cuál podrás recuperar tu contraseña.</Typography>

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
            size="small"
            id="email"
            autoComplete="on"
            value={user.email}
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
          Recuperar Contraseña
        </Button>

      </form>
    </Box>
    </Box>
   
  );
};

export default ForgotPassword;
