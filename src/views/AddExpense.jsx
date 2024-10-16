import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { useExpenses } from '../context/ExpensesContext'
import { expenseSchema } from '../modules/expenses/schemas/ExpenseSchema'

import categoriesJson from '../../db/categories.json'

import SelectField from '../shared/components/SelectField'
import AmountInput from '../shared/components/AmountInput'
import InputDate from '../shared/components/InputDate'
import { useCompany } from '../context/CompanyContext'

export default function AddExpenseView() {
  const { addExpense } = useExpenses()
  const { companies } = useCompany()

  const navigate = useNavigate()

  const categoriesList = categoriesJson
  const paymentMethodList = [
    'Yape',
    'Plin',
    'Efectivo',
    'Tarjeta de Crédito',
    'Tarjeta de Débito',
    'Transferencia',
  ]

  const today = new Date().toISOString()

  const [currency, setCurrency] = useState('PEN') // Estado para la moneda

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      currency: 'PEN', // Valor por defecto para la moneda
      date: today, // Valor por defecto para la fecha
    },
  })

  const onSubmit = async data => {
    const formattedData = {
      name: data.name, // Nombre del gasto
      amount: parseFloat(data.amount), // Convertir el monto a número flotante
      currency: data.currency, // Moneda
      category: data.category, // Categoría
      subcategory: data.subcategory, // Subcategoría
      company: data.company, // Empresa
      paymentMethod: data.paymentMethod, // Método de pago
      date: data.date, // Fecha del gasto
    }

    // Simulación de envío de datos (puedes reemplazarlo con una API o servicio)
    console.log('Gasto registrado:', formattedData)

    //
    await addExpense(formattedData)

    navigate('/gastos')
  }

  const selectedCategory = watch('category')

  return (
    <div>
      <h1 className='text-2xl font-bold'>Registrar Gasto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
        {/* Nombre del gasto */}
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
              placeholder='Compra en supermercado'
            />
          </div>
          {errors.name && (
            <p className='text-red-500 text-sm'>{errors.name.message}</p>
          )}
        </div>

        {/* Componente de Precio y Moneda */}
        <AmountInput
          value={watch('amount')}
          onChange={newAmount => setValue('amount', newAmount)}
          currency={currency}
          onCurrencyChange={newCurrency => {
            setCurrency(newCurrency)
            setValue('currency', newCurrency) // Actualiza la moneda en react-hook-form
          }}
          error={errors.amount}
        />

        {/* Categoría */}
        <SelectField
          label='Categoría'
          options={categoriesList.map(category => ({
            label: category.name,
            value: category.name,
          }))}
          value={watch('category')}
          onChange={option => {
            setValue('category', option) // Solo guarda el valor string
            setValue('subcategory', '') // Reinicia la subcategoría al cambiar la categoría
          }}
          error={errors.category}
          isSearchable={false}
        />

        {/* Subcategoría */}
        <SelectField
          label='Subcategoría'
          options={
            selectedCategory
              ? categoriesList
                  .find(category => category.name === selectedCategory)
                  ?.subcategories.map(subcategory => ({
                    label: subcategory,
                    value: subcategory,
                  })) || []
              : []
          }
          value={watch('subcategory')}
          onChange={option => setValue('subcategory', option)} // Solo guarda el valor string
          error={errors.subcategory}
          isSearchable={false}
        />

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

        {/* Método de pago */}
        <SelectField
          label='Método de Pago'
          options={paymentMethodList.map(method => ({
            value: method,
            label: method,
          }))}
          value={watch('paymentMethod')}
          onChange={option => setValue('paymentMethod', option)} // Solo guarda el valor string
          error={errors.paymentMethod}
          isSearchable={false}
        />

        {/* Fecha */}
        <InputDate
          value={watch('date')}
          onChange={newDate => setValue('date', newDate)}
          error={errors.date}
        />

        <div className='flex justify-end pt-6'>
          {/* Botón de registro */}
          <button
            type='submit'
            className=' bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:opacity-70'>
            Registrar Gasto
          </button>
        </div>
      </form>
    </div>
  )
}
