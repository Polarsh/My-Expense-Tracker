import { useState } from 'react'

export default function AddExpense() {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
    subcategory: '',
    paymentMethod: '',
    currency: 'PEN', // Default to Soles
    date: '',
  })

  // Categories and subcategories
  const categories = {
    Alimentación: ['Supermercado', 'Restaurantes', 'Snacks y Bebidas'],
    Transporte: [
      'Combustible',
      'Transporte Público',
      'Mantenimiento',
      'Estacionamiento',
    ],
    Vivienda: ['Alquiler o Hipoteca', 'Servicios', 'Mantenimiento del Hogar'],
    'Ocio y Entretenimiento': ['Suscripciones', 'Viajes y Vacaciones'],
    // Agrega más categorías y subcategorías según sea necesario
  }

  // Payment methods
  const paymentMethods = [
    'Yape',
    'Plin',
    'Cash',
    'Credit/Debit Card',
    'Transferencia Bancaria',
  ]

  // Currency options
  const currencies = [
    { label: 'Soles (PEN)', value: 'PEN' },
    { label: 'Dólares (USD)', value: 'USD' },
  ]

  const handleInputChange = e => {
    const { name, value } = e.target
    setExpense({ ...expense, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Gasto registrado:', expense)
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Registrar Gasto</h1>
      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        {/* Nombre del gasto */}
        <div>
          <label className='block text-sm font-medium'>Nombre del Gasto</label>
          <input
            type='text'
            name='name'
            value={expense.name}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
            placeholder='Por ejemplo: Compra en supermercado'
          />
        </div>

        {/* Monto */}
        <div>
          <label className='block text-sm font-medium'>Monto</label>
          <input
            type='number'
            name='amount'
            value={expense.amount}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
            placeholder='0.00'
          />
        </div>

        {/* Selección de categoría */}
        <div>
          <label className='block text-sm font-medium'>Categoría</label>
          <select
            name='category'
            value={expense.category}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
            <option value=''>Selecciona una categoría</option>
            {Object.keys(categories).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategoría (solo si la categoría ha sido seleccionada) */}
        {expense.category && (
          <div>
            <label className='block text-sm font-medium'>Subcategoría</label>
            <select
              name='subcategory'
              value={expense.subcategory}
              onChange={handleInputChange}
              className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
              <option value=''>Selecciona una subcategoría</option>
              {categories[expense.category].map(subcategory => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Método de pago */}
        <div>
          <label className='block text-sm font-medium'>Método de Pago</label>
          <select
            name='paymentMethod'
            value={expense.paymentMethod}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
            <option value=''>Selecciona un método de pago</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* Moneda */}
        <div>
          <label className='block text-sm font-medium'>Moneda</label>
          <select
            name='currency'
            value={expense.currency}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
            {currencies.map(currency => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className='block text-sm font-medium'>Fecha</label>
          <input
            type='date'
            name='date'
            value={expense.date}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
        </div>

        {/* Botón de registro */}
        <button
          type='submit'
          className='bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500'>
          Registrar Gasto
        </button>
      </form>
    </div>
  )
}
