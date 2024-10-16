import { useState } from 'react'

export default function PaymentsRecurring() {
  const [payment, setPayment] = useState({
    name: '',
    amount: '',
    frequency: 'mensual',
    startDate: '',
    currency: 'PEN',
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setPayment({ ...payment, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Pago recurrente registrado:', payment)
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Registrar Pago Recurrente</h1>
      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Nombre del Pago</label>
          <input
            type='text'
            name='name'
            value={payment.name}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Monto</label>
          <input
            type='number'
            name='amount'
            value={payment.amount}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Moneda</label>
          <select
            name='currency'
            value={payment.currency}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
            <option value='PEN'>Soles (PEN)</option>
            <option value='USD'>Dólares (USD)</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium'>Frecuencia</label>
          <select
            name='frequency'
            value={payment.frequency}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'>
            <option value='mensual'>Mensual</option>
            <option value='semanal'>Semanal</option>
            <option value='anual'>Anual</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium'>Fecha de Inicio</label>
          <input
            type='date'
            name='startDate'
            value={payment.startDate}
            onChange={handleInputChange}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
        </div>
        <button
          type='submit'
          className='bg-primary text-white px-4 py-2 rounded-lg'>
          Registrar Pago Recurrente
        </button>
      </form>
    </div>
  )
}
