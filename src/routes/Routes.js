import {
  PlusCircleIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  {
    name: 'Registrar Gasto',
    href: '/registrar-gasto',
    icon: PlusCircleIcon,
  },
  {
    name: 'Gastos',
    href: '/gastos',
    icon: PlusCircleIcon,
  },
  {
    name: 'Ver Gastos por Mes',
    href: '/gastos-por-mes',
    icon: CalendarIcon,
  },

  { name: 'Ajustes', href: '/ajustes', icon: CogIcon },
]
