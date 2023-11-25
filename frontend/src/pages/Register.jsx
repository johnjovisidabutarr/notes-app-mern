import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const register = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        email,
        username,
        password,
        confirmPassword,
      }
      const result = await axios.post(
        '/api/users/register',
        JSON.stringify(userData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(result)
      if (result.status === 200) {
        setSuccess(true)
      }
    } catch (error) {
      setError(error.response.data.error.message)
    }
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      {success ? (
        <div className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          <p>Success</p>
          <Link to={'/login'}>
            <p className='underline text-xl'>Login</p>
          </Link>
        </div>
      ) : (
        <div>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign up
            </h2>
          </div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm border p-4 bg-gray-50'>
            <form className='space-y-6' onSubmit={register}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Email
                </label>
                <div>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Username
                </label>
                <div>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    autoComplete='username'
                    required
                    className='block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Password
                  </label>
                </div>
                <div>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='confirmPass'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    Confirm Password
                  </label>
                </div>
                <div>
                  <input
                    id='confirmPass'
                    name='confirmPass'
                    type='password'
                    autoComplete='current-confirmPass'
                    required
                    className='block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='mt-4 text-red-500 italic'>
                  {error && <p>{error}</p>}
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
