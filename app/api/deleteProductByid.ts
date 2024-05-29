export const handleDeleteProduct = async (product: Partial<Product>) => {
    try {
        const id = product.id;
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      return data
      
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error; 
    }
  };
  