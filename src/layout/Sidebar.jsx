import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../routes/Routes'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
      <div className='flex h-16 shrink-0 items-center'>
        <img
          alt='Your Company'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          className='h-8 w-auto'
        />
      </div>
      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map(item => {
                const current = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={classNames(
                        current
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}>
                      <item.icon
                        aria-hidden='true'
                        className={classNames(
                          current
                            ? 'text-indigo-600'
                            : 'text-gray-400 group-hover:text-indigo-600',
                          'h-6 w-6 shrink-0'
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
