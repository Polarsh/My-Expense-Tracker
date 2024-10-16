export default function AmountInput({
  value,
  onChange,
  currency,
  onCurrencyChange,
  error,
}) {
  const handleCurrencyChange = e => {
    onCurrencyChange(e.target.value)
  }

  // Manejador de cambio sin formatear
  const handleAmountChange = e => {
    onChange(e.target.value)
  }

  // Manejador para formatear el valor cuando se pierde el foco
  const handleBlur = () => {
    if (value) {
      // Convertir a número y asegurar que tenga dos decimales al perder el foco
      const formattedValue = parseFloat(value).toFixed(2)
      onChange(formattedValue)
    }
  }

  return (
    <div>
      <label
        htmlFor='amount'
        className='block text-sm font-medium leading-6 text-gray-900'>
        Precio
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        {/* Símbolo de moneda dinámico */}
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <span className='text-gray-500 sm:text-sm'>
            {currency === 'USD' ? '$' : 'S/'}
          </span>
        </div>
        <input
          id='amount'
          name='amount'
          type='text'
          autoComplete='off'
          inputMode='decimal'
          pattern='[0-9]*\.?[0-9]*'
          placeholder='0.00'
          value={value}
          onChange={handleAmountChange}
          onBlur={handleBlur}
          className='block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
        />
        {/* Selección de la moneda */}
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <label htmlFor='currency' className='sr-only'>
            Currency
          </label>
          <select
            id='currency'
            name='currency'
            value={currency}
            onChange={handleCurrencyChange}
            className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm'>
            <option value='PEN'>PEN</option>
            <option value='USD'>USD</option>
          </select>
        </div>
      </div>
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  )
}
