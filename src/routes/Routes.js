import {
  PlusCircleIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  {
    name: 'Gastos Recurrentes',
    href: '/gastos-recurrentes',
    icon: CalendarIcon,
  },
  {
    name: 'Registrar Gasto',
    href: '/registrar-gasto',
    icon: PlusCircleIcon,
  },
  {
    name: 'Mis Gastos',
    href: '/mis-gastos',
    icon: PlusCircleIcon,
  },
  { name: 'Ajustes', href: '/ajustes', icon: CogIcon },
]
