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
import { RenderTableRow } from "./renderTableProducts";

export default function TableProducts({
  products,
  setProducts,
  productsFiltered,
  setProductsFiltered,
}: {
  products: Partial<Product[]>;
  productsFiltered: Partial<Product[]>;
  setProducts: React.Dispatch<React.SetStateAction<Partial<Product[]>>>;
  setProductsFiltered: React.Dispatch<React.SetStateAction<Partial<Product[]>>>;
}) {
  console.log(productsFiltered);
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
    // setProductsFiltered((currentProducts) => {
    //   const productIndex = currentProducts.findIndex(
    //     (product) => product?.id === productId
    //   );

    //   if (productIndex !== -1) {
    //     // Remove the product at the found index using splice
    //     const updatedProducts = [...currentProducts]; // Create a copy
    //     updatedProducts.splice(productIndex, 1);
    //     return updatedProducts;
    //   } else {
    //     console.warn(
    //       `Product with ID ${productId} not found in the products list. Skipping deletion.`
    //     );
    //     return currentProducts; // No change if product not found
    //   }
    // });
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
          {productsFiltered &&
          Array.isArray(productsFiltered) &&
          productsFiltered.length > 0 ? (
            <RenderTableRow
              products={productsFiltered}
              setProducts={setProducts}
              deleteProduct={deleteProduct}
            />
          ) : Array.isArray(products) && products.length > 0 ? (
            <RenderTableRow
              products={products}
              setProducts={setProducts}
              deleteProduct={deleteProduct}
            />
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
