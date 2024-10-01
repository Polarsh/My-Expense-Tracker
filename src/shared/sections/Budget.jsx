import { useState } from 'react'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

export default function BudgetSection() {
  const [budget, setBudget] = useState(0)

  const handleBudgetChange = e => {
    setBudget(e.target.value)
  }

  return (
    <div className='overflow-hidden rounded-lg bg-white shadow'>
      <div className='border-b border-gray-200 px-4 py-5 sm:p-6'>
        <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4 mt-4'>
            <h3 className='text-base font-semibold leading-6 text-gray-900'>
              Presupuesto Mensual
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Activa o desactiva los métodos de pago que prefieres utilizar para
              registrar y controlar tus gastos.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Presupuesto */}
      <div className='px-4 py-5 sm:p-6'>
        <label className='block text-sm font-medium'>
          Introduce tu presupuesto mensual
        </label>
        <div className='mt-2 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <CurrencyDollarIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </div>
          <input
            type='number'
            value={budget}
            onChange={handleBudgetChange}
            className='block w-full pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='0.00'
          />
        </div>
        <p className='mt-2 text-sm text-gray-500'>
          Presupuesto actual: S/{budget || 'No establecido'}
        </p>

        {/* Sugerencias para el presupuesto */}
        <div className='mt-4'>
          <h4 className='text-sm font-medium text-gray-700'>Sugerencias:</h4>
          <ul className='list-disc pl-5 text-sm text-gray-500'>
            <li>
              Ajusta tu presupuesto mensual según tus objetivos de ahorro.
            </li>
            <li>Monitorea tus gastos para no exceder el presupuesto.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
