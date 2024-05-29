export const dateAdapter = (date: string) => {
    // Convert to a date object
    const newDate = new Date(date);
  
    // Obtain date by parts
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; 
    const year = newDate.getFullYear();
  

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
  
    // Format to a comprehensible date
    const formattedDate = `${day} de ${monthNames[month - 1]} del ${year}`;
  
    return formattedDate;
  };