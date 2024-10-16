import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Datos de ejemplo para los gráficos
const dataByCategory = [
  { name: 'Alimentación', value: 400 },
  { name: 'Transporte', value: 150 },
  { name: 'Vivienda', value: 800 },
  { name: 'Ocio', value: 200 },
  { name: 'Salud', value: 100 },
]

const monthlyExpenses = [
  { name: 'Enero', gastos: 1200 },
  { name: 'Febrero', gastos: 1000 },
  { name: 'Marzo', gastos: 1400 },
  { name: 'Abril', gastos: 900 },
  { name: 'Mayo', gastos: 1100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347']

// Datos de ejemplo para los últimos gastos
const recentExpenses = [
  {
    name: 'Compra en supermercado',
    date: '2023-09-10',
    amount: 150,
    category: 'Alimentación',
  },
  { name: 'Gasolina', date: '2023-09-12', amount: 80, category: 'Transporte' },
  {
    name: 'Suscripción Netflix',
    date: '2023-09-15',
    amount: 12,
    category: 'Ocio',
  },
  // Agrega más datos...
]

export default function Dashboard() {
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>

      {/* Resumen de ingresos y gastos */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white shadow rounded-lg p-4'>
          <h2 className='text-lg font-semibold text-gray-700'>
            Gastos Totales
          </h2>
          <p className='text-2xl font-bold text-primary'>S/ 2,650</p>
        </div>
        <div className='bg-white shadow rounded-lg p-4'>
          <h2 className='text-lg font-semibold text-gray-700'>
            Ingresos Totales
          </h2>
          <p className='text-2xl font-bold text-green-600'>S/ 4,000</p>
        </div>
        <div className='bg-white shadow rounded-lg p-4'>
          <h2 className='text-lg font-semibold text-gray-700'>Balance</h2>
          <p className='text-2xl font-bold text-blue-600'>S/ 1,350</p>
        </div>
      </div>

      {/* Gráfico circular - Distribución de gastos por categoría */}
      <div className='bg-white shadow rounded-lg p-4'>
        <h2 className='text-xl font-semibold'>
          Distribución de Gastos por Categoría
        </h2>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={dataByCategory}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              fill='#8884d8'>
              {dataByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de barras - Comparación de gastos mensuales */}
      <div className='bg-white shadow rounded-lg p-4'>
        <h2 className='text-xl font-semibold'>
          Comparativa de Gastos Mensuales
        </h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={monthlyExpenses}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='gastos' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Lista de últimos gastos */}
      <div className='bg-white shadow rounded-lg p-4'>
        <h2 className='text-xl font-semibold'>Últimos Gastos</h2>
        <ul className='divide-y divide-gray-200'>
          {recentExpenses.map((expense, index) => (
            <li key={index} className='py-4 flex justify-between items-center'>
              <div>
                <p className='font-medium text-gray-700'>{expense.name}</p>
                <p className='text-sm text-gray-500'>
                  {expense.date} - {expense.category}
                </p>
              </div>
              <p className='text-lg font-semibold text-primary'>
                S/ {expense.amount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
