import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRecurringExpenses } from '../context/RecurringExpensesContext'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { CiEdit, CiTrash } from 'react-icons/ci'

export default function RecurringExpensesListView() {
  const { recurringExpenses, deleteRecurringExpense, loading, error } =
    useRecurringExpenses()

  const navigate = useNavigate()

  if (loading) {
    return (
      <>
        <div>
          {/* Título */}
          <h1 className='text-2xl font-bold'>Cargando</h1>

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

  if (error)
    return <p>Error al cargar los gastos recurrentes: {error.message}</p>

  const handleEdit = expense => {
    navigate(`/gastos-recurrentes/${expense.id}`)
  }

  const handleDelete = expense => {
    deleteRecurringExpense(expense)
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Gastos Recurrentes</h1>
        <Link
          to={'/registrar-gasto-recurrente'}
          className='text-sm font-semibold content-center text-primary hover:text-opacity-70 hover:cursor-pointer'>
          Añadir gasto
        </Link>
      </div>

      <ul className='divide-y divide-gray-300 mt-4'>
        {recurringExpenses.map((recurringExpense, index) => (
          <li key={index} className='flex justify-between py-2 items-center'>
            <RecurringExpenseCard
              recurringExpense={recurringExpense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const RecurringExpenseCard = ({
  recurringExpense,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className='bg-white shadow-md w-full rounded-md p-4 md:p-5 flex flex-row justify-between items-start hover:shadow-lg transition-shadow duration-300 relative'>
      {/* Bloque izquierdo */}
      <div className='flex-grow'>
        <h3 className='text-lg font-semibold text-gray-800 mb-1'>
          {recurringExpense.name}
        </h3>
        {/* Empresa */}
        <p className='mt-1 text-gray-600 text-sm'>
          <span className='font-medium text-gray-700'>Empresa:</span>{' '}
          {recurringExpense.company}
        </p>
        {/* Día de facturación */}
        <p className='mt-1 text-gray-600 text-sm'>
          <span className='font-medium text-gray-700'>Día de Facturación:</span>{' '}
          {recurringExpense.day}
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
              onClick={() => handleEdit(recurringExpense)}
              disabled
              className='flex w-full px-3 py-2 gap-2 items-center text-gray-800 hover:bg-primary hover:bg-opacity-20 rounded-md transition-all duration-200 ease-in-out disabled:cursor-not-allowed'>
              <CiEdit className='h-5 w-5' />
              <span className='text-sm font-medium'>Editar</span>
            </button>
          </MenuItem>
          {/* Botón para borrar */}
          <MenuItem>
            <button
              onClick={() => handleDelete(recurringExpense)}
              className='flex w-full px-3 py-2 gap-2 items-center text-gray-800 hover:bg-primary hover:bg-opacity-20 rounded-md transition-all duration-200 ease-in-out disabled:cursor-not-allowed'>
              <CiTrash className='h-5 w-5' />
              <span className='text-sm font-medium'>Eliminar</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* Monto en la parte inferior derecha */}
      <div className='absolute bottom-4 right-4'>
        <p className='text-xl md:text-2xl font-bold text-primary'>
          {recurringExpense.currency === 'USD' ? '$' : 'S/'}{' '}
          {recurringExpense.amount.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
