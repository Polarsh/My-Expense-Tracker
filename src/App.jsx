import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
/* import { UserProvider } from './context/UserContext' */

import ProtectedRoute from './routes/ProtectedRoute'

import PageLayout from './layout/PageLayout'

import DefaultPage from './views/Default'
import AddExpense from './views/AddExpense'
import ExpensesByMonth from './views/ExpensesByMonth'
import Settings from './views/Settings'
import Dashboard from './views/Dashboard'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        {/* <UserProvider> */}
        <ScrollToTop />
        <Routes>
          <Route>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/iniciar-sesion' element={<DefaultPage />} />

            {/* Protected */}
            <Route
              element={<ProtectedRoute redirectPath={'/iniciar-sesion'} />}>
              <Route path='/' element={<PageLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='registrar-gasto' element={<AddExpense />} />
                <Route path='reportes' element={<DefaultPage />} />
                <Route path='gastos-por-mes' element={<ExpensesByMonth />} />
                <Route path='ajustes' element={<Settings />} />
              </Route>
            </Route>
            {/* Págian error */}
            <Route path='*' element={<DefaultPage />} />
          </Route>
        </Routes>
        {/* </UserProvider> */}
      </AuthProvider>
    </AppProvider>
  )
}
