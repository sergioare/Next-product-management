import ImagesService from "../_Firebase/FirebaseFunctions/uploadImages";
export const handleUpdateProduct = async (product: Partial<Product>) => {
  try {
    const id = product.id;
    const images =
      id && product.images && (await ImagesService.upload(id, product.images));
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
        images: images,
        description: product.description,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
};
