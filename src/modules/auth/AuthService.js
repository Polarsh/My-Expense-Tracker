import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase/config'
import AuthError from './AuthError'

class AuthService {
  // Función para crear un usuario en la colección Firestore
  async saveUserToFirestore(user) {
    const userRef = doc(db, `users/${user.uid}`)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
      const { email, displayName, photoURL } = user

      const updatedAt = new Date()
      const createdAt = new Date()

      const userDetail = {
        email,
        displayName: displayName || email.split('@')[0],
        photoURL,
      }

      const newUser = {
        id: user.uid,
        userDetail,
        createdAt,
        updatedAt,
      }

      try {
        // Intentar guardar el usuario en Firestore
        await setDoc(userRef, newUser)
      } catch (error) {
        console.error('Error guardando usuario en Firestore:', error)

        // Si hay un error, eliminar el usuario de Firebase Auth
        try {
          await deleteUser(user)
          console.log(
            'Usuario eliminado de Firebase Auth debido a un error en Firestore.'
          )
        } catch (deleteError) {
          console.error(
            'Error al eliminar el usuario de Firebase Auth:',
            deleteError
          )
        }

        // Propagar el error para que se pueda manejar en la capa superior si es necesario
        throw error
      }
    }
  }

  // Iniciar sesión con correo y contraseña
  async loginWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      return userCredential.user
    } catch (error) {
      console.log('login', error)
      AuthError.handle(error)
    }
  }

  // Creación de cuenta con correo y contraseña
  async createUserWithEmail(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const { user } = userCredential
      await this.saveUserToFirestore(user)
      return user
    } catch (error) {
      AuthError.handle(error)
    }
  }

  // Creación de cuenta con Google
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    try {
      const userCredential = await signInWithPopup(auth, provider)
      const { user } = userCredential
      await this.saveUserToFirestore(user)
      return user
    } catch (error) {
      AuthError.handle(error)
    }
  }

  // Creación de cuenta con Facebook
  async signInWithFacebook() {
    const provider = new FacebookAuthProvider()
    try {
      const userCredential = await signInWithPopup(auth, provider)
      const { user } = userCredential
      await this.saveUserToFirestore(user)
      return user
    } catch (error) {
      AuthError.handle(error)
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await signOut(auth)
    } catch (error) {
      AuthError.handle(error)
    }
  }

  // Estado de autenticación del usuario
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback)
  }
}

// Instancia única de AuthService
const authService = new AuthService()

export default authService
