"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  CircularProgress,
  InputLabel,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "@/app/_MUI/theme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CreateUpdateItem() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const router = useRouter();

  {
    /*----------- State usercredentials--------*/
  }

  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

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
    console.log(newProduct);

    setIsLoading(true);
    try {
      console.log("enviado el formulario");

      //   console.log(newProduct);
      //   if (res) return authSuccessFirebase();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  {
    /*----------- Handle change input --------*/
  }

  const handlerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  /*----------- Handle change images input --------*/
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImagesChange = (event: React.ChangeEvent<any>) => {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 5) {
      Swal.fire({
        title: "Selecciona un máximo de 5 archivos.",
        icon: "info",
        timer: 2000,
      });
      event.preventDefault();
      return;
    }

    if (inputElement.files) {
      const selectedFiles = Array.from(inputElement.files);
      setSelectedImages(selectedFiles);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          color: colors.blueAccent[400],
        }}
      >
        Crear
        <AddCircleOutlineIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3">Crear producto</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h4">
              Gestiona tus productos con la siguiente información:
            </Typography>
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            {/*----------- Product Name input--------*/}
            <Box className="input-form">
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                id="name"
              >
                Nombre del producto<span style={{ color: "#007FC0" }}>*</span>
              </InputLabel>

              <TextField
                required
                name="name"
                id="name"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={newProduct.title}
                onChange={handlerChange}
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                }}
                InputLabelProps={{
                  style: {
                    padding: "5px",
                    fontSize: "16px",
                  },
                }}
              />
            </Box>

            {/*----------- Product category input--------*/}
            <Box className="input-form">
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                id="category"
              >
                Categoría del producto
                <span style={{ color: "#007FC0" }}>*</span>
              </InputLabel>

              <TextField
                required
                name="category"
                id="category"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={newProduct.category}
                onChange={handlerChange}
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                }}
                InputLabelProps={{
                  style: {
                    padding: "5px",
                    fontSize: "16px",
                  },
                }}
              />
            </Box>

            {/*----------- Product price input--------*/}
            <Box className="input-form">
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                id="price"
              >
                Precio del producto<span style={{ color: "#007FC0" }}>*</span>
              </InputLabel>

              <TextField
                required
                name="price"
                id="price"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={newProduct.price}
                onChange={handlerChange}
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                }}
                InputLabelProps={{
                  style: {
                    padding: "5px",
                    fontSize: "16px",
                  },
                }}
              />
            </Box>

            {/*----------- Product stock input--------*/}
            <Box className="input-form">
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                id="stock"
              >
                Stock del producto<span style={{ color: "#007FC0" }}>*</span>
              </InputLabel>

              <TextField
                required
                name="stock"
                id="stock"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={newProduct.stock}
                onChange={handlerChange}
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                }}
                InputLabelProps={{
                  style: {
                    padding: "5px",
                    fontSize: "16px",
                  },
                }}
              />
            </Box>

            {/*----------- Product images input--------*/}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <InputLabel
                sx={{
                  color: colors.grey[100],
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                htmlFor="images"
              >
                Añadir imágenes del producto
              </InputLabel>

              <input
                type="file"
                name="images"
                id="images"
                onChange={handleImagesChange}
                accept="image/png , image/jpeg, image/webp"
                multiple
              />
            </Box>

            {/*----------- Product description input--------*/}
            <Box className="input-form">
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                id="description"
              >
                Descripción del producto
                <span style={{ color: "#007FC0" }}>*</span>
              </InputLabel>

              <TextareaAutosize
                required
                name="description"
                id="description"
                autoComplete="off"
                value={newProduct.description}
                onChange={handlerChange}
                style={{
                  backgroundColor: colors.background[100],
                  borderRadius: "5px",
                  borderColor: "primary.main",
                  padding: "5px 10px",
                  width: "100%",
                  minWidth: "250px",
                  fontSize: "medium",
                  fontFamily: "inherit",
                  minHeight: "200px",
                  whiteSpace: "pre-wrap",
                  resize: "vertical",
                  color: colors.grey[400],
                }}
              />
            </Box>
            {/*----------- Submit  input--------*/}
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading && <CircularProgress />}
                Crear
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
