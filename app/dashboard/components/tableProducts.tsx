import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export default function TableProducts({
  products,
}: {
  products: Partial<Product[]>;
}) {
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
                    key={product.id}
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
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
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
