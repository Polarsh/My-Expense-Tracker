export default function InputDate({ value, onChange, error }) {
  // Obtener la fecha de hoy en formato 'YYYY-MM-DD' respetando la zona horaria local
  const today = new Date().toISOString().split('T')[0]

  // Verificar si el valor es un timestamp (de Date.now()), convertirlo a un objeto Date
  const dateValue =
    typeof value === 'number'
      ? new Date(value)
      : value instanceof Date
        ? value
        : new Date()

  // Convertir el valor (Date) a 'YYYY-MM-DD' y 'HH:mm' para mostrarlo en los inputs
  const formattedDate = dateValue ? dateValue.toISOString().split('T')[0] : ''
  const formattedTime = dateValue ? dateValue.toTimeString().slice(0, 5) : ''

  // Manejar el cambio de fecha sin modificar la hora
  const handleDateChange = e => {
    const selectedDate = e.target.value // El valor del input es un string 'YYYY-MM-DD'

    // Obtener la hora actual del valor, si existe
    const hours = dateValue.getHours()
    const minutes = dateValue.getMinutes()

    // Crear un nuevo objeto Date basado en la fecha seleccionada, conservando la hora y minutos actuales
    const [year, month, day] = selectedDate.split('-')
    const localDate = new Date(year, month - 1, day, hours, minutes) // Crear una fecha con la hora actual

    onChange(localDate) // Pasar la fecha actualizada con la hora intacta a la función onChange

    console.log(localDate)
  }

  // Manejar el cambio de hora
  const handleTimeChange = e => {
    const selectedTime = e.target.value // El valor del input es un string 'HH:mm'

    // Si ya tenemos una fecha seleccionada, añadir la hora
    const [hours, minutes] = selectedTime.split(':')
    const updatedDate = new Date(dateValue) // Usamos la fecha actual para agregarle la hora
    updatedDate.setHours(hours)
    updatedDate.setMinutes(minutes)

    onChange(updatedDate) // Pasar la fecha actualizada con la hora a la función onChange
    console.log(updatedDate)
  }

  return (
    <div>
      <label
        htmlFor='dateTime'
        className='block text-sm font-medium text-gray-700'>
        Fecha y hora
      </label>
      <div className='relative mt-2'>
        <div className='flex space-x-6'>
          {/* Input para seleccionar la fecha (día y mes) */}
          <input
            type='date'
            value={formattedDate} // Mostrar la fecha formateada como 'YYYY-MM-DD'
            max={today} // Limitar la selección de fechas al día actual
            onChange={handleDateChange} // Actualizar solo la fecha, manteniendo la hora
            className='block w-full appearance-none rounded-md border-0 bg-white py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
          />

          {/* Input para seleccionar la hora */}
          <input
            type='time'
            value={formattedTime} // Mostrar la hora formateada como 'HH:mm'
            onChange={handleTimeChange} // Actualizar solo la hora
            className='block w-full appearance-none rounded-md border-0 bg-white py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
          />
        </div>
        {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
      </div>
    </div>
  )
}
