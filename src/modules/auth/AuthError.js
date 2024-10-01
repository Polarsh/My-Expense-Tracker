import { toast } from 'sonner'

class AuthError {
  static handle(error) {
    let message

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Este correo electrónico ya está en uso.'
        break
      case 'auth/invalid-email':
        message = 'El correo electrónico no es válido.'
        break
      case 'auth/user-disabled':
        message = 'Esta cuenta ha sido deshabilitada.'
        break
      case 'auth/user-not-found':
        message = 'No se encontró ninguna cuenta con este correo.'
        break
      case 'auth/wrong-password':
        message = 'La contraseña es incorrecta.'
        break
      case 'auth/weak-password':
        message = 'La contraseña es muy débil.'
        break
      case 'auth/popup-closed-by-user':
        message =
          'La ventana emergente fue cerrada antes de finalizar la operación.'
        break
      case 'auth/cancelled-popup-request':
        message =
          'La ventana emergente fue cancelada debido a una solicitud duplicada.'
        break
      case 'auth/network-request-failed':
        message = 'Error de red. Por favor, verifica tu conexión a internet.'
        break
      case 'auth/credential-already-in-use':
        message = 'Esta credencial ya está asociada con una cuenta diferente.'
        break
      case 'auth/operation-not-allowed':
        message = 'El proveedor de autenticación no está habilitado.'
        break
      case 'auth/too-many-requests':
        message =
          'Se han enviado demasiadas solicitudes en un corto período de tiempo. Por favor, intenta de nuevo más tarde.'
        break
      case 'auth/account-exists-with-different-credential':
        message =
          'Ya existe una cuenta con el mismo correo electrónico pero con diferentes credenciales de inicio de sesión.'
        break
      case 'auth/timeout':
        message =
          'La operación ha superado el tiempo límite. Por favor, intenta nuevamente.'
        break
      case 'auth/requires-recent-login':
        message =
          'Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.'
        break
      case 'auth/provider-already-linked':
        message = 'Este proveedor ya está vinculado a la cuenta.'
        break
      case 'auth/invalid-credential':
        message =
          'Las credenciales no son válidas. Por favor, intenta de nuevo.'
        break
      case 'auth/internal-error':
        message = 'Ocurrió un error interno. Por favor, intenta de nuevo.'
        break
      default:
        message = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
    }

    // Mostrar el mensaje de error mediante toast
    toast.error(message)

    // También puedes lanzar un error si es necesario
    throw new Error(message)
  }
}

export default AuthError
