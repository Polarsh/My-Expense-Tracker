import { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '../modules/auth/AuthService'

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

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await AuthService.logout()
    setCurrentUser(null)
  }

  const registerWithEmail = async (email, password) => {
    const user = await AuthService.createUserWithEmail(email, password)
    setCurrentUser(user)
  }

  const loginWithEmail = async (email, password) => {
    try {
      const user = await AuthService.loginWithEmail(email, password)
      setCurrentUser(user)
    } catch (error) {
      console.error('Error en loginWithEmail:', error)
    }
  }

  const loginWithGoogle = async () => {
    const user = await AuthService.signInWithGoogle()
    setCurrentUser(user)
  }

  const loginWithFacebook = async () => {
    const user = await AuthService.signInWithFacebook()
    setCurrentUser(user)
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
