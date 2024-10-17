import { useState } from 'react'
import { useExpenses } from '../context/ExpensesContext'

export default function ExpenseListView() {
  const { expenses, loading, error } = useExpenses()
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

  if (error) {
    return (
      <p className='text-red-500'>
        Error al cargar los gastos. Inténtalo de nuevo.
      </p>
    )
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
      <div className='space-y-4'>
        {filteredExpenses.length === 0 ? (
          <p className='text-gray-500'>No hay gastos registrados.</p>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        )}
      </div>
    </div>
  )
}

const ExpenseCard = ({ expense }) => {
  const formattedDate = expense.date
    ? new Date(expense.date.seconds * 1000).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
      })
    : 'Fecha no disponible'

  return (
    <div className='bg-white shadow-md rounded-md p-3 md:p-4 flex flex-row justify-between items-start hover:shadow-lg transition-shadow duration-300'>
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

      {/* Bloque derecho: Fecha y Monto */}
      <div className='flex flex-col items-end h-full '>
        <p className='text-xs text-gray-400'>{formattedDate}</p>
        <p className='text-xl md:text-2xl mt-10 md:mt-12 font-bold text-gray-800'>
          {expense.currency === 'USD' ? '$' : 'S/'}{' '}
          <span>{expense.amount.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}
