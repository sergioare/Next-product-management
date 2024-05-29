export function errorCodesFirebase(authCode: string): string {
  switch (authCode) {
    case "auth/weak-password":
      return "La contraseña es demasiado débil";
      
    case "auth/wrong-password":
      return "La contraseña no es correcta";

    case "auth/invalid-email":
      return "El correo proporcionado es invalido";

    case "auth/user-not-found":
      return "No se encontró ningún usuario con el correo electrónico proporcionado";

    case "auth/too-many-requests":
      return "Se han realizado demasiadas solicitudes. Intenta nuevamente más tarde";

    case "auth/user-disabled":
      return " La cuenta ha sido deshabilitada";

    case "auth/operation-not-allowed":
      return "El proveedor de identidad no está configurado o habilitado";

    case "auth/requires-recent-login":
      return "El usuario debe iniciar sesión nuevamente para realizar esta acción";

    case "auth/invalid-credential":
      return "El proveedor de identidad proporcionado no es válido";

    case "auth/user-is-not-authorized":
      return "El usuario no está autorizado para realizar esta acción";

    case "auth/credential-already-in-use":
      return "El correo electrónico o el número de teléfono ya están en uso por otra cuenta";

    case "auth/too-many-failed-attempts":
      return "Se han realizado demasiadas solicitudes fallidas. Intenta nuevamente más tarde";

    case "auth/email-already-in-use":
      return "El correo ya se encuentra en uso";

    default:
      return "";
  }
}
