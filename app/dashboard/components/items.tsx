"use client";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CreateUpdateItem from "./create-update-item-form";
import { handleGetAllProducts } from "@/app/api/getAllProducts";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/app/_Utilities/localStorage";
import TableProducts from "./tableProducts";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { tokens } from "@/app/_MUI/theme";

const Items = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  {
    /*----------- State to save products --------*/
  }
  const [products, setProducts] = useState<Partial<Product[]>>([]);

  {
    /*----------- State to search products and filter --------*/
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [productsFiltered, setProductsFiltered] = useState<Partial<Product[]>>(
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    const filteredProducts = products.filter((product) => {
      const searchTermLowerCase = event.target.value.toLowerCase().trim();
      return (
        product?.title.toLowerCase().includes(searchTermLowerCase) ||
        product?.category.toLowerCase().includes(searchTermLowerCase) ||
        product?.description.toLowerCase().includes(searchTermLowerCase)
      );
    });
    console.log(filteredProducts);
    setProductsFiltered(filteredProducts);
  };

  {
    /*----------- This functions fetch products from endpoint --------*/
  }
  const getProducts = async () => {
    try {
      const res = (await handleGetAllProducts()) as Partial<Product[]>;
      console.log(res);
      setProducts(res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const user = getFromLocalStorage("user");
    if (user) {
      setIsLoading(true);
      getProducts();
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h3" sx={{ marginLeft: "5px" }}>
          Mis productos
        </Typography>

        <TextField
          sx={{ width: "400px", display: { xs: "none", md: "flex" } }}
          required
          placeholder="Buscar producto..."
          type="text"
          size="small"
          name="searchTerm"
          id="searchTerm"
          autoComplete="on"
          value={searchTerm}
          onChange={handleSearchChange}
          InputLabelProps={{
            style: {
              fontSize: "16px",
            },
          }}
          InputProps={{
            style: {
              fontSize: "16px",
            },
          }}
        />
        <CreateUpdateItem setProducts={setProducts}>
          <Button
            variant="outlined"
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
        </CreateUpdateItem>
      </Box>

      {isLoading ? (
        <p>
          <CircularProgress /> Cargando productos...{" "}
        </p>
      ) : (
        <TableProducts
          products={products}
          setProducts={setProducts}
          productsFiltered={productsFiltered}
          setProductsFiltered={setProductsFiltered}
        />
      )}
    </>
  );
};

export default Items;
