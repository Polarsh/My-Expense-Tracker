import { CiRedo, CiTrash } from 'react-icons/ci'
import { useCompany } from '../../context/CompanyContext'
import { useState } from 'react'
import DeleteModalComponent from '../components/DeleteModal'
import AddCompanyView from '../../views/AddCompany'

export default function CompanySection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [companyName, setCompanyName] = useState('')

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState('')

  const { companies, addCompany, deleteCompany, fetchCompanies } = useCompany()

  const handleAddCompany = () => {
    addCompany({ name: companyName })
    setCompanyName('')
    setIsAddModalOpen(false)
  }

  const handleDeleteCompany = async company => {
    console.log('handleDeleteCompany: ', company)
    setSelectedCompany(company)
    setIsDeleteModalOpen(true)
  }

  const onConfirmDelete = () => {
    deleteCompany(selectedCompany)
    setIsDeleteModalOpen(false)
  }

  return (
    <div className='overflow-hidden rounded-lg bg-white shadow'>
      <div className='border-b border-gray-200 px-4 py-5 sm:p-6'>
        <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4 mt-4'>
            <h3 className='text-base font-semibold leading-6 text-gray-900'>
              Empresas
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Activa o desactiva los métodos de pago que prefieres utilizar para
              registrar y controlar tus gastos.
            </p>
          </div>
          <div className='ml-4 mt-4 flex-shrink-0 flex gap-4'>
            <CiRedo
              title='Recargar empresas'
              onClick={fetchCompanies}
              className='h-6 w-6 mt-2 hover:cursor-pointer hover:animate-spin'
            />
            <button
              type='button'
              onClick={() => setIsAddModalOpen(true)}
              className='relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
              Añadir nueva empresa
            </button>
          </div>
        </div>
      </div>
      {/* Lista de Métodos de Pago */}
      <div className='px-4 py-5 sm:p-6'>
        <ul className='divide-y'>
          {companies.map((company, index) => (
            <li
              key={index}
              className='flex justify-between px-2 py-2 items-center even:bg-gray-50'>
              <span>{company.name}</span>
              <div className='flex gap-x-4'>
                {/* <CiEdit className=' h-6 w-6' /> */}
                <CiTrash
                  onClick={() => handleDeleteCompany(company)}
                  className=' h-6 w-6 hover:cursor-pointer'
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal para añadir nueva empresa */}
      {isAddModalOpen && (
        <AddCompanyView
          onConfirm={handleAddCompany}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModalComponent
          title={`Eliminar empresa "${selectedCompany.name}"`}
          onConfirm={onConfirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  )
}
