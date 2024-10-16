import { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '../modules/auth/AuthService'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    console.log('Auth provider cargado')

    return () => unsubscribe()
  }, [])

  const navigateToHome = () => {
    navigate('/')
  }

  const logout = async () => {
    await AuthService.logout()
    setCurrentUser(null)

    navigateToHome()
  }

  const registerWithEmail = async (email, password) => {
    const user = await AuthService.createUserWithEmail(email, password)
    setCurrentUser(user)

    navigateToHome()
  }

  const loginWithEmail = async (email, password) => {
    const user = await AuthService.loginWithEmail(email, password)
    setCurrentUser(user)

    navigateToHome()
  }

  const loginWithGoogle = async () => {
    const user = await AuthService.signInWithGoogle()
    setCurrentUser(user)

    navigateToHome()
  }

  const loginWithFacebook = async () => {
    const user = await AuthService.signInWithFacebook()
    setCurrentUser(user)

    navigateToHome()
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginWithFacebook,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
