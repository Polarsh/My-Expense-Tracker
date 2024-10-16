import { createContext, useContext, useEffect, useState } from 'react'
import companyService from '../modules/expenses/CompanyServices'
import { toast } from 'sonner'

// Crear el contexto de la empresa
const CompanyContext = createContext()

// Proveedor del contexto de la empresa
export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState(() => {
    const cachedCompanies = localStorage.getItem('companies')
    return cachedCompanies
      ? JSON.parse(cachedCompanies).sort((a, b) => a.name.localeCompare(b.name))
      : []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    setLoading(true)
    try {
      const companyList = await companyService.getCompanies()
      companyList.sort((a, b) => a.name.localeCompare(b.name))
      setCompanies(companyList)
      localStorage.setItem('companies', JSON.stringify(companyList))
      toast.success('Empresas recargadas exitosamente')
    } catch (e) {
      console.error('Error al obtener las empresas:', e)
      setError(e)
      toast.error('Error al obtener las empresas')
    } finally {
      setLoading(false)
    }
  }

  const addCompany = async company => {
    try {
      const addedCompany = await companyService.addCompany(company)
      const updatedCompanies = [...companies, addedCompany].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      setCompanies(updatedCompanies)
      localStorage.setItem('companies', JSON.stringify(updatedCompanies))
      toast.success(`${company.name} añadida exitosamente`)
    } catch (e) {
      console.error('Error al añadir la empresa:', e)
      setError(e)
      toast.error('Error al añadir la empresa')
    }
  }

  const deleteCompany = async company => {
    try {
      const companyId = company.id

      await companyService.deleteCompany(companyId)
      const updatedCompanies = companies
        .filter(company => company.id !== companyId)
        .sort((a, b) => a.name.localeCompare(b.name))
      setCompanies(updatedCompanies)
      localStorage.setItem('companies', JSON.stringify(updatedCompanies))
      toast.success(`${company.name} eliminada exitosamente`)
    } catch (e) {
      console.error('Error al eliminar la empresa:', e)
      setError(e)
      toast.error('Error al eliminar la empresa')
    }
  }

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loading,
        error,
        addCompany,
        deleteCompany,
        fetchCompanies,
      }}>
      {children}
    </CompanyContext.Provider>
  )
}

// Hook personalizado para usar el contexto de la empresa
export const useCompany = () => {
  const context = useContext(CompanyContext)
  if (!context) {
    throw new Error('useCompany debe usarse dentro de un CompanyProvider')
  }
  return context
}
