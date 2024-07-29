'use client'

import { login, signup } from '@/app/auth/actions';
import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Signin({ href }: any) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const router = useRouter();

  const [isActive, setIsActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data: any) => {
    setIsActive(true)
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const res = await login(formData)
      if (res?.error) {
        setErrorMessage(res.error);
      } else {
        reset();
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsActive(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email', { required: 'Email is required' })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {isPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" onClick={togglePasswordVisibility} />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" onClick={togglePasswordVisibility} />
                    )}
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={isActive}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {!isActive ? 'Log in' : 'Logging in ...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
