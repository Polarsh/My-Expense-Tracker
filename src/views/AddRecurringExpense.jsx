import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useRecurringExpenses } from '../context/RecurringExpensesContext'
import { recurringExpenseSchema } from '../modules/expenses/schemas/RecurringExpenseSchema'

import AmountInput from '../shared/components/AmountInput'
import SelectField from '../shared/components/SelectField'
import { useCompany } from '../context/CompanyContext'
import LoadingModal from '../shared/components/LoadingModal'

export default function AddRecurringExpenseView() {
  const { addRecurringExpense, loading } = useRecurringExpenses()
  const { companies } = useCompany()

  const navigate = useNavigate()

  const today = new Date().getDate()
  const [currency, setCurrency] = useState('PEN')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(recurringExpenseSchema),
    defaultValues: {
      currency: 'PEN',
      day: today,
    },
  })

  const onSubmit = async data => {
    const formattedData = {
      name: data.name,
      company: data.company,
      amount: parseFloat(data.amount),
      currency: data.currency,
      day: data.day,
    }

    console.log('Gasto recurrente registrado:', formattedData)

    await addRecurringExpense(formattedData)

    navigate('/gastos-recurrentes')
  }

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Añadir Gasto Recurrente</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Nombre del Gasto */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'>
            Nombre del Gasto
          </label>
          <div className='relative mt-2'>
            <input
              type='text'
              {...register('name')}
              className='block w-full appearance-none rounded-md border-0 bg-white py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
              placeholder='GamePass'
            />
          </div>
          {errors.name && (
            <p className='text-red-500 text-sm'>{errors.name.message}</p>
          )}
        </div>

        {/* Empresa */}
        <div className='relative'>
          <Link
            to={'/ajustes'}
            className='absolute top-1 right-0 text-xs text-primary hover:text-opacity-70 hover:cursor-pointer'>
            Añadir empresa
          </Link>
          <SelectField
            label='Empresa'
            options={companies.map(company => ({
              value: company.name,
              label: company.name,
            }))}
            value={watch('company')}
            onChange={option => setValue('company', option)} // Solo guarda el valor string
            error={errors.company}
          />
        </div>

        {/* Componente de Precio y Moneda */}
        <AmountInput
          value={watch('amount')}
          onChange={newAmount => setValue('amount', newAmount)}
          currency={currency}
          onCurrencyChange={newCurrency => {
            setCurrency(newCurrency)
            setValue('currency', newCurrency)
          }}
          error={errors.amount}
        />

        {/* Día */}
        <SelectField
          label='Día'
          options={Array.from({ length: 31 }, (_, i) => ({
            value: i + 1,
            label: i + 1,
          }))}
          value={watch('day')}
          onChange={option => setValue('day', option)}
          error={errors.day}
          isSearchable={false}
        />

        <div className='flex justify-end pt-6'>
          <button
            type='submit'
            className=' bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:opacity-70'>
            Añadir Gasto
          </button>
        </div>
      </form>
      {loading && <LoadingModal title={'Añadiendo gasto recurrente'} />}
    </div>
  )
}
