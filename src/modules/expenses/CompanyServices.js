import {
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { normalizeNameToId } from '../../utils/normalizeNameToId'

class CompanyService {
  constructor() {
    this.companiesCollection = collection(db, 'companies')
  }

  // Añadir una nueva empresa
  async addCompany(company) {
    const normalizedId = normalizeNameToId(company.name)

    const newCompany = {
      ...company,
      id: normalizedId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    try {
      const companyDocRef = doc(this.companiesCollection, normalizedId)
      await setDoc(companyDocRef, newCompany)

      console.log('addCompany: ', { newCompany })
      return newCompany
    } catch (e) {
      console.error('Error al añadir la empresa: ', e)
      throw e
    }
  }

  // Obtener todas las empresas
  async getCompanies() {
    try {
      // Crear una consulta para ordenar las empresas por el campo 'name' en orden ascendente
      const companiesQuery = query(
        this.companiesCollection,
        orderBy('name', 'asc')
      )

      // Obtener los documentos que cumplen la consulta
      const querySnapshot = await getDocs(companiesQuery)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (e) {
      console.error('Error al obtener las empresas: ', e)
      throw e
    }
  }

  // Eliminar una empresa
  async deleteCompany(companyId) {
    try {
      const companyDocRef = doc(this.companiesCollection, companyId)
      await deleteDoc(companyDocRef)
    } catch (e) {
      console.error('Error al eliminar la empresa:', e)
      throw e
    }
  }
}

// Instancia única de CompanyService
const companyService = new CompanyService()

export default companyService
