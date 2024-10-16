import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../firebase/config'

class ExpenseService {
  constructor() {
    this.expensesCollection = null
  }

  // Establecer el usuario actual para definir la colección de gastos
  setUser(userId) {
    this.expensesCollection = collection(db, 'users', userId, 'expenses')
  }

  // Añadir un nuevo gasto
  async addExpense(expense) {
    if (!this.expensesCollection) {
      throw new Error(
        'La colección no está configurada. Por favor, establezca el usuario primero.'
      )
    }

    const newDoc = {
      ...expense,
      date: Timestamp.fromDate(expense.date),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    try {
      const docRef = await addDoc(this.expensesCollection, newDoc)
      const newExpense = {
        ...expense,
        id: docRef.id,
      }

      console.log({ newExpense })
      return newExpense
    } catch (e) {
      console.error('Error al añadir el gasto: ', e)
      throw e
    }
  }

  // Obtener todos los gastos
  async getExpenses() {
    if (!this.expensesCollection) {
      throw new Error(
        'La colección no está configurada. Por favor, establezca el usuario primero.'
      )
    }

    try {
      // Crear una consulta para ordenar los documentos por el campo 'date' en orden descendente
      const expensesQuery = query(
        this.expensesCollection,
        orderBy('date', 'desc')
      )

      // Obtener los documentos que cumplen la consulta
      const querySnapshot = await getDocs(expensesQuery)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (e) {
      console.error('Error al obtener los gastos: ', e)
      throw e
    }
  }

  // Eliminar un gasto
  async deleteExpense(id) {
    if (!this.expensesCollection) {
      throw new Error(
        'La colección no está configurada. Por favor, establezca el usuario primero.'
      )
    }

    try {
      await deleteDoc(doc(db, 'users', this.userId, 'expenses', id))
    } catch (e) {
      console.error('Error al eliminar el gasto: ', e)
      throw e
    }
  }
}

// Instancia única de ExpenseService
const expenseService = new ExpenseService()

export default expenseService
