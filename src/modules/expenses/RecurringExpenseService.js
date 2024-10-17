import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../firebase/config'

class RecurringExpensesService {
  constructor() {
    this.recurringExpensesCollection = null
  }

  // Establecer el usuario actual para definir la colección de gastos recurrentes
  setUser(userId) {
    this.recurringExpensesCollection = collection(
      db,
      'users',
      userId,
      'recurringExpenses'
    )
  }

  // Añadir un nuevo gasto recurrente
  async addRecurringExpense(expense) {
    if (!this.recurringExpensesCollection) {
      throw new Error(
        'La colección no está configurada. Por favor, establezca el usuario primero.'
      )
    }

    const newDoc = {
      ...expense,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    try {
      const docRef = await addDoc(this.recurringExpensesCollection, newDoc)
      const newExpense = {
        ...expense,
        id: docRef.id,
      }

      return newExpense
    } catch (e) {
      console.error('Error al añadir el gasto recurrente: ', e)
      throw e
    }
  }

  // Obtener todos los gastos recurrentes
  async getRecurringExpenses() {
    if (!this.recurringExpensesCollection) {
      throw new Error(
        'La colección no está configurada. Por favor, establezca el usuario primero.'
      )
    }

    try {
      const recurringExpensesQuery = query(
        this.recurringExpensesCollection,
        orderBy('day', 'asc')
      )

      const querySnapshot = await getDocs(recurringExpensesQuery)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (e) {
      console.error('Error al obtener los gastos recurrentes: ', e)
      throw e
    }
  }

  // Eliminar un gasto recurrente
  async deleteRecurringExpense(id) {
    if (!this.recurringExpensesCollection) {
      throw new Error(
        'La colección no está configurada. Por favor, establezca el usuario primero.'
      )
    }

    try {
      await deleteDoc(doc(this.recurringExpensesCollection, id))
    } catch (e) {
      console.error('Error al eliminar el gasto recurrente: ', e)
      throw e
    }
  }
}

export default new RecurringExpensesService()
