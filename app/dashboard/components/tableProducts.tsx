import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "@/app/_MUI/theme";
import CreateUpdateItem from "./create-update-item-form";
import ViewProduct from "./modal-viewProduct";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function TableProducts({
  products,
  setProducts,
}: {
  products: Partial<Product[]>;
  setProducts: React.Dispatch<React.SetStateAction<Partial<Product[]>>>;
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  {
    /*----------- Handle delete product --------*/
  }
  const deleteProduct = (productId: string) => {
    setProducts((currentProducts) => {
      const productIndex = currentProducts.findIndex(
        (product) => product?.id === productId
      );

      if (productIndex !== -1) {
        // Remove the product at the found index using splice
        const updatedProducts = [...currentProducts]; // Create a copy
        updatedProducts.splice(productIndex, 1);
        return updatedProducts;
      } else {
        console.warn(
          `Product with ID ${productId} not found in the products list. Skipping deletion.`
        );
        return currentProducts; // No change if product not found
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Categoría</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="center" width={250}>
              Acción
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map(
              (product?: Partial<Product>) =>
                product && (
                  <TableRow
                    key={`${product?.title}-${product?.id}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Image
                        src={product.images?.[0] || ""}
                        alt="Imagen del producto"
                        width={1000}
                        height={1000}
                        className="cardsImages"
                      />{" "}
                    </TableCell>
                    <TableCell align="right">{product.title}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">${product.price} USD</TableCell>
                    <TableCell align="right">{product.stock} und</TableCell>
                    <TableCell align="center">

                      <ViewProduct product={product}>
                        <VisibilityIcon />
                      </ViewProduct>
                      
                      <CreateUpdateItem
                        itemToUpdate={product}
                        setProducts={setProducts}
                      >
                        <Button
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.background[100],
                            margin: "10px",
                            "&:hover": {
                              color: colors.grey[300],
                            },
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </CreateUpdateItem>

                      <Button
                        sx={{
                          backgroundColor: colors.redAccent[600],
                          color: colors.background[100],
                          "&:hover": {
                            color: colors.grey[300],
                          },
                        }}
                        onClick={() => product?.id && deleteProduct(product.id)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No hay productos disponibles</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
