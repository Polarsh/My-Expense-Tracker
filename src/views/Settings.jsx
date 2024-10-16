import BudgetSection from '../shared/sections/Budget'
import CompanySection from '../shared/sections/Company'
import PaymentMethods from '../shared/sections/PaymentMethods'

export default function Settings() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Ajustes</h1>
      <p className='mt-4'>
        Configura las categorías, métodos de pago y presupuesto.
      </p>

      {/* Gestión de Métodos de Pago */}
      <div className='mt-6'>
        <PaymentMethods />
      </div>

      {/* Presupuesto */}
      <div className='mt-6'>
        <BudgetSection />
      </div>

      {/* Gestión de Empresas */}
      <div className='mt-6'>
        <CompanySection />
      </div>

      <div className='mt-6 flex justify-end space-x-6'>
        <button>Cancelar</button>
        <button>Guardar</button>
      </div>
    </div>
  )
}
