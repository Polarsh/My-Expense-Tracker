import { createContext, useState, useEffect, useContext } from 'react'
import recurringExpensesService from '../modules/expenses/RecurringExpenseService'
import { toast } from 'sonner'
import { useAuth } from './AuthContext'

// Crear el contexto de los gastos recurrentes
const RecurringExpensesContext = createContext()

export const RecurringExpensesProvider = ({ children }) => {
  const [recurringExpenses, setRecurringExpenses] = useState(() => {
    const cachedExpenses = localStorage.getItem('recurringExpenses')
    return cachedExpenses ? JSON.parse(cachedExpenses) : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      recurringExpensesService.setUser(currentUser.uid)
      fetchRecurringExpenses()
    }
  }, [currentUser])

  const fetchRecurringExpenses = async () => {
    setLoading(true)

    console.log(' ------ RecurringExpensesProvider ------')

    try {
      const data = await recurringExpensesService.getRecurringExpenses()
      setRecurringExpenses(data)
      localStorage.setItem('recurringExpenses', JSON.stringify(data))
      toast.success('Gastos recurrentes recargados exitosamente')
    } catch (e) {
      console.error('Error al obtener los gastos recurrentes:', e)
      setError(e)
      toast.error('Error al obtener los gastos recurrentes')
    } finally {
      setLoading(false)
    }
  }

  const addRecurringExpense = async expense => {
    setLoading(true)

    try {
      const newExpense =
        await recurringExpensesService.addRecurringExpense(expense)
      const updatedExpenses = [...recurringExpenses, newExpense]
      setRecurringExpenses(updatedExpenses)
      localStorage.setItem('recurringExpenses', JSON.stringify(updatedExpenses))
      toast.success(`${expense.name} añadido exitosamente`)
    } catch (e) {
      console.error('Error al añadir el gasto recurrente:', e)
      setError(e)
      toast.error('Error al añadir el gasto recurrente')
    } finally {
      setLoading(false)
    }
  }

  const deleteRecurringExpense = async expense => {
    setLoading(true)

    const expenseId = expense.id

    try {
      await recurringExpensesService.deleteRecurringExpense(expenseId)
      const updatedExpenses = recurringExpenses.filter(
        expense => expense.id !== expenseId
      )
      setRecurringExpenses(updatedExpenses)
      localStorage.setItem('recurringExpenses', JSON.stringify(updatedExpenses))
      toast.success('Gasto recurrente eliminado exitosamente')
    } catch (e) {
      console.error('Error al eliminar el gasto recurrente:', e)
      setError(e)
      toast.error('Error al eliminar el gasto recurrente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <RecurringExpensesContext.Provider
      value={{
        recurringExpenses,
        fetchRecurringExpenses,
        addRecurringExpense,
        deleteRecurringExpense,
        loading,
        error,
      }}>
      {children}
    </RecurringExpensesContext.Provider>
  )
}

// Hook personalizado para usar el contexto de los gastos recurrentes
export const useRecurringExpenses = () => {
  const context = useContext(RecurringExpensesContext)
  if (!context) {
    throw new Error(
      'useRecurringExpenses debe usarse dentro de un RecurringExpensesProvider'
    )
  }
  return context
}
