import { useState } from 'react'

export default function PaymentMethodsSection() {
  const [paymentMethods, setPaymentMethods] = useState([
    { name: 'Yape', enabled: true },
    { name: 'Plin', enabled: true },
    { name: 'Efectivo', enabled: false },
    { name: 'Tarjeta Crédito / Débito', enabled: false },
  ])

  const togglePaymentMethod = index => {
    const updatedMethods = [...paymentMethods]
    updatedMethods[index].enabled = !updatedMethods[index].enabled
    setPaymentMethods(updatedMethods)
  }

  return (
    <div className='overflow-hidden rounded-lg bg-white shadow'>
      <div className='border-b border-gray-200 px-4 py-5 sm:p-6'>
        <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4 mt-4'>
            <h3 className='text-base font-semibold leading-6 text-gray-900'>
              Métodos de Pago
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Activa o desactiva los métodos de pago que prefieres utilizar para
              registrar y controlar tus gastos.
            </p>
          </div>
          {/* <div className='ml-4 mt-4 flex-shrink-0'>
            <button
              type='button'
              className='relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
              Añadir nuevo método
            </button>
          </div> */}
        </div>
      </div>
      {/* Lista de Métodos de Pago */}
      <div className='px-4 py-5 sm:p-6'>
        <ul className=' divide-y'>
          {paymentMethods.map((method, index) => (
            <li key={index} className='flex justify-between py-2 items-center'>
              <span>{method.name}</span>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={method.enabled}
                  min={0}
                  onChange={() => togglePaymentMethod(index)}
                  className='toggle-checkbox h-5 w-5 rounded-full bg-gray-200 checked:bg-primary'
                />
                <span className='ml-2 text-sm'>
                  {method.enabled ? 'Activo' : 'Inactivo'}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
