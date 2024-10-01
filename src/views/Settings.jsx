import BudgetSection from '../shared/sections/Budget'
import PaymentMethods from '../shared/sections/PaymentMethods'

export default function Settings() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Ajustes</h1>
      <p className='mt-4'>
        Configura las categorías, métodos de pago y presupuesto.
      </p>

      {/* Gestión de Categorías */}
      {/* <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Categorías de Gastos</h2>
        <ul className='mt-4'>
          {categories.map((category, index) => (
            <li key={index} className='py-2 border-b'>
              {category}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddCategory} className='mt-4'>
          <label className='block text-sm font-medium'>Nueva Categoría</label>
          <input
            type='text'
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            className='block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
          <button
            type='submit'
            className='mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg'>
            Agregar Categoría
          </button>
        </form>
      </div> */}

      {/* Gestión de Métodos de Pago */}
      <div className='mt-6'>
        <PaymentMethods />
      </div>

      {/* Presupuesto */}
      <div className='mt-6'>
        <BudgetSection />
      </div>

      <div className='mt-6 flex justify-end space-x-6'>
        <button>Cancelar</button>
        <button>Guardar</button>
      </div>
    </div>
  )
}
