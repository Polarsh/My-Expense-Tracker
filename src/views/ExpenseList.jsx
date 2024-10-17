import { useState } from 'react'
import { useExpenses } from '../context/ExpensesContext'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { CiEdit, CiTrash } from 'react-icons/ci'

export default function ExpenseListView() {
  const { expenses, deleteExpense, loading } = useExpenses()
  const [searchQuery, setSearchQuery] = useState('')

  // Función para filtrar los gastos según la barra de búsqueda
  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <>
        <div>
          {/* Título */}
          <h1 className='text-2xl font-bold'>Lista de gastos</h1>

          {/* Barra de búsqueda */}
          <div className='mt-4'>
            <div className='animate-pulse rounded-md h-10 w-full bg-gray-200'></div>
          </div>

          <div className='mt-6 space-y-4'>
            <div className='animate-pulse rounded-md h-28 w-full bg-gray-200'></div>
            <div className='animate-pulse rounded-md h-28 w-full bg-gray-200'></div>
            <div className='animate-pulse rounded-md h-28 w-full bg-gray-200'></div>
            <div className='animate-pulse rounded-md h-28 w-full bg-gray-200'></div>
            <div className='animate-pulse rounded-md h-28 w-full bg-gray-200'></div>
          </div>
        </div>
      </>
    )
  }

  const handleEdit = expense => {
    // navigate(`/gastos-recurrentes/${expense.id}`)
  }

  const handleDelete = expense => {
    deleteExpense(expense)
  }

  return (
    <div>
      {/* Título */}
      <h1 className='text-2xl font-bold'>Lista de gastos</h1>

      {/* Barra de búsqueda */}
      <div className='mt-4 mb-6'>
        <input
          type='text'
          placeholder='Buscar por nombre del gasto'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Lista de gastos */}
      <ul className='space-y-4'>
        {filteredExpenses.length === 0 ? (
          <p className='text-gray-500'>No hay gastos registrados.</p>
        ) : (
          filteredExpenses.map((expense, index) => (
            <li key={index}>
              <ExpenseCard
                expense={expense}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

const ExpenseCard = ({ expense, handleEdit, handleDelete }) => {
  const formattedDate = expense.date
    ? new Date(expense.date.seconds * 1000).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
      })
    : 'Fecha no disponible'

  return (
    <div className='bg-white shadow-md w-full rounded-md p-4 md:p-5 flex flex-row justify-between items-start hover:shadow-lg transition-shadow duration-300 relative'>
      {/* Bloque izquierdo */}
      <div className='flex-grow'>
        <h3 className='text-base md:text-lg font-semibold text-gray-800'>
          {expense.name}
        </h3>

        {/* Categoría y Subcategoría */}
        <p className='mt-1 text-gray-500 text-xs md:text-sm'>
          <span className='font-medium text-gray-700'>{expense.category}</span>{' '}
          - {expense.subcategory}
        </p>

        {/* Empresa y Método de Pago */}
        <p className='mt-1 text-gray-500 text-xs md:text-sm'>
          <span className='font-medium text-gray-700'>Empresa:</span>{' '}
          {expense.company}
        </p>
        <p className='mt-1 text-gray-500 text-xs md:text-sm'>
          <span className='font-medium text-gray-700'>Método de Pago:</span>{' '}
          {expense.paymentMethod}
        </p>
      </div>

      {/* Menú de acciones en la parte superior derecha */}
      <Menu as='div' className='absolute top-4 right-4 z-10'>
        <MenuButton className='flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out'>
          <ChevronDownIcon className='h-5 w-5 text-gray-500' />
        </MenuButton>
        <MenuItems className='absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {/* Botón para editar */}
          <MenuItem>
            <button
              onClick={() => handleEdit(expense)}
              disabled
              className='flex w-full px-3 py-2 gap-2 items-center text-gray-800 hover:bg-primary hover:bg-opacity-20 rounded-md transition-all duration-200 ease-in-out disabled:cursor-not-allowed'>
              <CiEdit className='h-5 w-5' />
              <span className='text-sm font-medium'>Editar</span>
            </button>
          </MenuItem>
          {/* Botón para borrar */}
          <MenuItem>
            <button
              onClick={() => handleDelete(expense)}
              className='flex w-full px-3 py-2 gap-2 items-center text-gray-800 hover:bg-primary hover:bg-opacity-20 rounded-md transition-all duration-200 ease-in-out disabled:cursor-not-allowed'>
              <CiTrash className='h-5 w-5' />
              <span className='text-sm font-medium'>Eliminar</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* Bloque derecho: Fecha y Monto */}
      <div className='absolute bottom-4 right-4'>
        <p className='text-base font-semibold text-end mb-4 text-gray-400'>
          {formattedDate}
        </p>
        <p className='text-xl md:text-2xl font-bold text-primary'>
          {expense.currency === 'USD' ? '$' : 'S/'} {expense.amount.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
