import { randomUUID } from "crypto";
import ImagesService from "../_Firebase/FirebaseFunctions/uploadImages";

export const handleCreateProduct = async (product: Partial<Product>) => {
  try {
  const id = "image-" + Math.floor(Math.random() * 999999);
  const images =
  id && product.images && (await ImagesService.upload(id, product.images));
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        "images":images
      }),
    });

    const data = await res.json();
    const dataUpdated = {
      ...data,
      "id":`${data?.title}-${data?.id}`
    };
    return dataUpdated
    
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error; 
  }
};
