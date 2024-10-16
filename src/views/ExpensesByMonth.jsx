import { useState } from 'react'

// Lista de meses para seleccionar
const monthsList = [
  { label: 'Enero 2023', value: '2023-01' },
  { label: 'Febrero 2023', value: '2023-02' },
  { label: 'Marzo 2023', value: '2023-03' },
  { label: 'Abril 2023', value: '2023-04' },
  { label: 'Mayo 2023', value: '2023-05' },
  { label: 'Junio 2023', value: '2023-06' },
  { label: 'Julio 2023', value: '2023-07' },
  { label: 'Agosto 2023', value: '2023-08' },
  { label: 'Septiembre 2023', value: '2023-09' },
  { label: 'Octubre 2023', value: '2023-10' },
  { label: 'Noviembre 2023', value: '2023-11' },
  { label: 'Diciembre 2023', value: '2023-12' },
]

export default function ExpensesByMonth() {
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Simulación de gastos
  const expenses = [
    {
      name: 'Compra en supermercado',
      amount: 150,
      category: 'Alimentación',
      subcategory: 'Supermercado',
      paymentMethod: 'Yape',
      currency: 'PEN',
      date: '2023-09-05',
    },
    {
      name: 'Gasolina',
      amount: 80,
      category: 'Transporte',
      subcategory: 'Combustible',
      paymentMethod: 'Credit/Debit Card',
      currency: 'PEN',
      date: '2023-09-10',
    },
    {
      name: 'Suscripción Netflix',
      amount: 12,
      category: 'Ocio y Entretenimiento',
      subcategory: 'Suscripciones',
      paymentMethod: 'Credit/Debit Card',
      currency: 'USD',
      date: '2023-09-12',
    },
    // Más gastos...
  ]

  // Agrupamos los gastos por categoría
  const groupExpensesByCategory = expensesList => {
    const groupedExpenses = {}

    expensesList.forEach(expense => {
      if (!groupedExpenses[expense.category]) {
        groupedExpenses[expense.category] = []
      }
      groupedExpenses[expense.category].push(expense)
    })

    return groupedExpenses
  }

  // Filtramos los gastos por el mes seleccionado
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date)
    const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`
    return !selectedMonth || expenseMonth === selectedMonth
  })

  // Agrupamos los gastos filtrados por categoría
  const expensesByCategory = groupExpensesByCategory(filteredExpenses)

  const handleMonthChange = e => {
    setSelectedMonth(e.target.value)
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Gastos por Mes</h1>

      {/* Selección del mes desde una lista */}
      <div className='mt-4'>
        <label className='block text-sm font-medium'>Selecciona un mes</label>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
          <option value=''>Todos los meses</option>
          {monthsList.map(month => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de gastos agrupados por categoría */}
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>
          Gastos de {selectedMonth || 'mes seleccionado'}
        </h2>

        {Object.keys(expensesByCategory).length > 0 ? (
          <div className='mt-4 space-y-6'>
            {Object.keys(expensesByCategory).map(category => (
              <div key={category} className='bg-white shadow rounded-lg p-4'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  {category}
                </h3>
                <ul className='mt-4 space-y-2'>
                  {expensesByCategory[category].map((expense, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm'>
                      <div>
                        <h4 className='font-medium'>{expense.name}</h4>
                        <p className='text-sm text-gray-500'>
                          {expense.subcategory} - {expense.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className='text-xl font-semibold text-primary'>
                          {expense.currency === 'PEN' ? 'S/' : '$'}
                          {expense.amount}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-4 text-sm text-gray-500'>
            No se encontraron gastos para este mes.
          </p>
        )}
      </div>
    </div>
  )
}
