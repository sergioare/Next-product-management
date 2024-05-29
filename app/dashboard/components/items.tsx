"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import CreateUpdateItem from "./create-update-item-form";
import { handleGetAllProducts } from "@/app/api/getAllProducts";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/app/_Utilities/localStorage";
import TableProducts from "./tableProducts";

const Items = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  {
    /*----------- State to save products --------*/
  }
  const [products, setProducts] = useState<Partial<Product[]>>([]);

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
        <CreateUpdateItem />
      </Box>
      
      {isLoading ? (
        <p>
          <CircularProgress /> Cargando productos...{" "}
        </p>
      ) : (
        <TableProducts products={products} />
      )}
    </>
  );
};

export default Items;
