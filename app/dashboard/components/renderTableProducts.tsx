import { Button, TableCell, TableRow, useTheme } from "@mui/material";
import Image from "next/image";
import ViewProduct from "./modal-viewProduct";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateUpdateItem from "./create-update-item-form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { tokens } from "@/app/_MUI/theme";

interface Props{
    products:  Partial<Product[]>,
    setProducts: React.Dispatch<React.SetStateAction<Partial<Product[]>>>;
    deleteProduct: (productId: string)=>void
}


export const RenderTableRow = ({products , setProducts, deleteProduct}: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    {  products.map(
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
            )}
    </>
  )
};
