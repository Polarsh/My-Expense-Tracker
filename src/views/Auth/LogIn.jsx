import { FcGoogle } from 'react-icons/fc'
import LogoComponent from '../../shared/components/Logo'
import { useAuth } from '../../context/AuthContext'

export default function LogInView() {
  const { loginWithGoogle } = useAuth()

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <LogoComponent />
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <form action='#' method='POST' className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    autoComplete='current-password'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-3 block text-sm leading-6 text-gray-900'>
                    Remember me
                  </label>
                </div>

                <div className='text-sm leading-6'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Sign in
                </button>
              </div>
            </form>

            <div>
              {/* Separador */}
              <div className='relative mt-10'>
                <div
                  aria-hidden='true'
                  className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-sm font-medium leading-6'>
                  <span className='bg-white px-6 text-gray-900'>
                    O continuar con
                  </span>
                </div>
              </div>

              {/* Boton Google */}
              <div className='mt-6 '>
                <button
                  onClick={loginWithGoogle}
                  className='flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'>
                  <FcGoogle className='h-6 w-6' />

                  <span className='text-sm font-semibold leading-6'>
                    Google
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* <p className='mt-10 text-center text-sm text-gray-500'>
            Not a member?{' '}
            <a
              href='#'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  )
}
