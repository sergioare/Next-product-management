export const handleCreateProduct = async (product: Partial<Product>) => {
  try {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error; 
  }
};
