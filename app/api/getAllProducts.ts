export const handleGetAllProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      return data.products;
      
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error; 
    }
  };
  