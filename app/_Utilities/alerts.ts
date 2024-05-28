import Swal from "sweetalert2";

export const authErrorFirebase = (errorMessage: string) => {
  Swal.fire({
    title: errorMessage,
    icon: "error",
    footer: "Intenta otra vez",
    timer: 4000,
  });
};

export const authSuccessFirebase = () => {
    Swal.fire({
      title: "¡Bienvenido!",
      text:"Sigue disfrutando de nuestros servicios",
      icon: "success",
      timer: 4000,
    });
  };
  
