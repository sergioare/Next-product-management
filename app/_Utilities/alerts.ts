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
  
  export const recoverPassAlert= () => {
    Swal.fire({
      title: "Revisa tu correo",
      text:"Hemos enviado un correo de recuperación a tu bandeja de entrada",
      icon: "success",
      timer: 4000,
    });
  };
  
  export const productCreatedAlert = () => {
    Swal.fire({
      title: "¡Producto creado exitosamente!",
      text:"Sigue disfrutando de nuestros servicios",
      icon: "success",
      timer: 4000,
    });
  };
  
  export const productFailedAlert = () => {
    Swal.fire({
      title: "El producto no pudo ser creado",
      text:"Por favor, intenta nuevamente.",
      icon: "error",
      timer: 4000,
    });
  };
  
  export const productUpdatedAlert = () => {
    Swal.fire({
      title: "¡Producto actualizado exitosamente!",
      text:"Sigue disfrutando de nuestros servicios",
      icon: "success",
      timer: 4000,
    });
  };
  