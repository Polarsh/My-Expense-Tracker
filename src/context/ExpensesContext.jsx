import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'
import expenseService from '../modules/expenses/ExpenseService'
import { useAuth } from './AuthContext'

// Crear el contexto
const ExpensesContext = createContext()

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const cachedExpenses = localStorage.getItem('expenses')
    return cachedExpenses ? JSON.parse(cachedExpenses) : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      expenseService.setUser(currentUser.uid)
      fetchExpenses()
    }
  }, [currentUser])

  // Función para obtener los gastos
  const fetchExpenses = async () => {
    setLoading(true)

    try {
      const data = await expenseService.getExpenses()
      data.sort((a, b) => a.date - b.date) // Ordenar los gastos por fecha
      setExpenses(data)
      localStorage.setItem('expenses', JSON.stringify(data))
      toast.success('Gastos recargados exitosamente')
    } catch (e) {
      console.error('Error al obtener los gastos:', e)
      setError(e)
      toast.error('Error al obtener los gastos')
    } finally {
      setLoading(false)
    }
  }

  // Función para añadir un nuevo gasto
  const addExpense = async expense => {
    setLoading(true)

    try {
      await expenseService.addExpense(expense)
      fetchExpenses()
      toast.success('Gasto añadido exitosamente')
    } catch (e) {
      console.error('Error al añadir el gasto:', e)
      setError(e)
      toast.error('Error al añadir el gasto')
    } finally {
      setLoading(false)
    }
  }

  // Función para eliminar un gasto
  const removeExpense = async id => {
    setLoading(true)

    try {
      await expenseService.deleteExpense(id)
      fetchExpenses()
      toast.success('Gasto eliminado exitosamente')
    } catch (e) {
      console.error('Error al eliminar el gasto:', e)
      setError(e)
      toast.error('Error al eliminar el gasto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        loading,
        error,
        addExpense,
        removeExpense,
      }}>
      {children}
    </ExpensesContext.Provider>
  )
}

// Hook para usar el contexto
export const useExpenses = () => {
  const context = useContext(ExpensesContext)
  if (!context) {
    throw new Error('useExpenses debe usarse dentro de un ExpensesProvider')
  }
  return context
}
