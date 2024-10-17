import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { ExpensesProvider } from './context/ExpensesContext'
import { RecurringExpensesProvider } from './context/RecurringExpensesContext'
import { CompanyProvider } from './context/CompanyContext'

import ProtectedRoute from './routes/ProtectedRoute'

import PageLayout from './layout/PageLayout'

import DefaultPage from './views/Default'
import Settings from './views/Settings'
import Dashboard from './views/Dashboard'

import AddExpenseView from './views/AddExpense'
import ExpenseListView from './views/ExpenseList'

import AddRecurringExpenseView from './views/AddRecurringExpense'
import RecurringExpensesListView from './views/RecurringExpenseList'

import LogInView from './views/Auth/LogIn'
import LogOutView from './views/Auth/LogOut'

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
        <ExpensesProvider>
          <RecurringExpensesProvider>
            <CompanyProvider>
              <ScrollToTop />
              <Routes>
                <Route>
                  <Route
                    path='/'
                    element={<Navigate to='/dashboard' replace />}
                  />
                  <Route path='/iniciar-sesion' element={<LogInView />} />
                  <Route path='/cerrar-sesion' element={<LogOutView />} />

                  {/* Protected */}
                  <Route
                    element={
                      <ProtectedRoute redirectPath={'/iniciar-sesion'} />
                    }>
                    <Route path='/' element={<PageLayout />}>
                      <Route path='dashboard' element={<Dashboard />} />
                      <Route
                        path='registrar-gasto-recurrente'
                        element={<AddRecurringExpenseView />}
                      />
                      <Route
                        path='gastos-recurrentes'
                        element={<RecurringExpensesListView />}
                      />
                      <Route
                        path='registrar-gasto'
                        element={<AddExpenseView />}
                      />
                      <Route path='mis-gastos' element={<ExpenseListView />} />
                      <Route path='ajustes' element={<Settings />} />
                    </Route>
                  </Route>
                  {/* Página default */}
                  <Route path='*' element={<DefaultPage />} />
                </Route>
              </Routes>
            </CompanyProvider>
          </RecurringExpensesProvider>
        </ExpensesProvider>
      </AuthProvider>
    </AppProvider>
  )
}
