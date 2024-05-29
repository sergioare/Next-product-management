import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { dateAdapter } from "@/app/_Utilities/dateAdapter";
import { tokens } from "@/app/_MUI/theme";

export default function ViewProduct({
  product,
  children,
}: {
  product: Partial<Product>;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        sx={{
          color: colors.blueAccent[700],
        }}
      >
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Typography
          variant="h3"
          sx={{ margin: "25px 0 0 25px", color: colors.blueAccent[400] }}
        >
          Detalles del producto
        </Typography>
        <DialogContent>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {product.images &&
                  product.images.map((image: string, index: number) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Product Image ${index}`}
                      width={1000}
                      height={1000}
                      style={{
                        margin: "10px",
                        objectFit: "cover",
                        maxWidth: "200px",
                        maxHeight: "200px",
                      }}
                    />
                  ))}
              </Box>

              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20px",
                }}
              >
                <Typography variant="h3" sx={{ color: colors.grey[400] }}>
                  {product.title}
                </Typography>
                <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                  Categoría: {product.category}
                </Typography>
                <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                  Marca: {product.brand || null}
                </Typography>
                <Typography variant="h4" sx={{ color: colors.blueAccent[400] }}>
                  Precio: ${product.price} USD
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h3" sx={{ color: colors.blueAccent[400], marginBottom:"15px"}}>
                Detalles
              </Typography>
              <ul style={{paddingLeft:"30px", marginBottom:"20px"}}>
                <li>
                  <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                    Hay {product.stock} unidades en el inventario
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                    El producto tiene un rating de {product.rating}.
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                    Descuento actual {product.discountPercentage || 0}%.
                  </Typography>
                </li>
              </ul>

              <Typography variant="h3" sx={{ color: colors.blueAccent[400] , marginBottom:"15px"}}>
                Descripción
              </Typography>
              <Typography variant="h5" sx={{ color: colors.grey[400], marginBottom:"20px", padding:"15px"}}>{product.description}</Typography>

              <Typography variant="h3" sx={{ color: colors.blueAccent[400] , marginBottom:"15px"}}>
                Reseñas
              </Typography>
              {product.reviews && (
                <Box>
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <Box 
                      key={index} 
                      sx={{
                        border:"1px solid grey",
                        borderRadius:"20px",
                        padding:"15px",
                        marginBottom:"20px"
                    }}>
                        <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                          <b>Nombre:</b> {review.reviewerName || "No registra"}
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                          <b>Email: </b>{review.reviewerEmail || "No registra"}
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                          <b>Reseña:</b> {review.comment || "No registra"}
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                          <b>Valoración:</b> {review.rating || "No registra"}
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.grey[400] }}>
                          <b>Fecha: </b>{dateAdapter(review.date) || null}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography>No se hayaron reseñas del producto</Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
