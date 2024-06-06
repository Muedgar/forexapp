'use client';

import { createwithdrawing, getwithdrawingById, updatewithdrawing } from '@/app/transactions/withdrawing/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Createwithdrawing({ id, getData, onClose }: any) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  

  const getOne = async (key:number) => {
    try {
     const res = await getwithdrawingById(key)
      console.log("single record: ", res)
      setValue('telephone_number', res?.telephone_number || '')
      setValue('receiver_names', res?.receiver_names || '');
      setValue('rate', res?.rate || '');
      setValue('amount', res?.amount || '');
      setValue('time', res?.time || '');

      if(res.currencies.includes('Rwandan Francs')) {
        setValue('rwandan_francs', true)
      }
      if(res.currencies.includes('Ugandan Shillings')) {
        setValue('ugandan_shillings', true)
      }
      if(res.currencies.includes('Kenyan Shillings')) {
        setValue('kenyan_shillings', true)
      }
      if(res.currencies.includes('Tanzanian Shillings')) {
        setValue('tanzanian_shillings', true)
      }
      if(res.currencies.includes('US Dollars')) {
        setValue('us_dollars', true)
      }
      if(res.currencies.includes('Euros')) {
        setValue('euros', true)
      }
    } catch (error) {
    } 
  }
  useEffect(() => {
    if(id) {
      const newId = Number(id)
      getOne(newId)
    }
  },[])

  const onSubmit = async (data: any) => {
    if(!data?.rate || !data?.receiver_names || !data?.amount || !data?.time) {
      return
    }

    const formData = new FormData();
    formData.append('receiver_names', data.receiver_names);
    formData.append('rate', data.rate);
    formData.append('amount', data.amount);
    formData.append('time', data.time);
    formData.append('telephone_number', data.telephone_number)

    
    const currencies = [
      data.rwandan_francs && 'Rwandan Francs',
      data.ugandan_shillings && 'Ugandan Shillings',
      data.kenyan_shillings && 'Kenyan Shillings',
      data.tanzanian_shillings && 'Tanzanian Shillings',
      data.us_dollars && 'US Dollars',
      data.euros && 'Euros'
    ].filter(Boolean).join(', ');

    formData.append('currencies', currencies);

    console.log(Object.fromEntries(formData));
    try {
      if (id) {
        await updatewithdrawing(id, formData);
      } else {
        await createwithdrawing(formData);
      }
      reset()
      getData();

      onClose(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Receiver names</h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              Enter names of people exchanging money, make sure they are separated by a comma e.g: John P. Doe, Smith Roman
            </p> */}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="receiver_names" className="block text-sm font-medium text-gray-700">
              Receiver names
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  {...register('receiver_names')}
                  id="receiver_names"
                  autoComplete="receiver_names"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Exchange rate</h3>
            <p className="mt-1 text-sm text-gray-500">
              An exchange rate is a relative price of one currency expressed in terms of another currency (or group of currencies).
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                Exchange rate
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  {...register('rate')}
                  id="rate"
                  autoComplete="rate"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Telephone Number</h3>
            <p className="mt-1 text-sm text-gray-500">
              Sender telephone number.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="telephone_number" className="block text-sm font-medium text-gray-700">
              Telephone number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  {...register('telephone_number')}
                  id="telephone_number"
                  autoComplete="telephone_number"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Sent amount</h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              Enter exchanged amount in both currencies, e.g: 500,000 rwf to 384 Us dollars.
            </p> */}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Sent amount
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  {...register('amount')}
                  id="amount"
                  autoComplete="amount"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">withdrawing date</h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              What is exchange transaction date? e.g: 12/12/2024
            </p> */}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                withdrawing date
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="date"
                  {...register('time')}
                  id="time"
                  autoComplete="time"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Money type (Both Currencies)</h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          <div className="mt-6">
            <fieldset>
              <div className="mt-4 space-y-4">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="rwandan_francs"
                      {...register('rwandan_francs')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="rwandan_francs" className="font-medium text-gray-700">
                      Rwandan Francs
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="ugandan_shillings"
                      {...register('ugandan_shillings')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ugandan_shillings" className="font-medium text-gray-700">
                      Ugandan Shillings
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="kenyan_shillings"
                      {...register('kenyan_shillings')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="kenyan_shillings" className="font-medium text-gray-700">
                      Kenyan Shillings
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="tanzanian_shillings"
                      {...register('tanzanian_shillings')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="tanzanian_shillings" className="font-medium text-gray-700">
                      Tanzanian Shillings
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="us_dollars"
                      {...register('us_dollars')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="us_dollars" className="font-medium text-gray-700">
                      US Dollars
                    </label>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="euros"
                      {...register('euros')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="euros" className="font-medium text-gray-700">
                      Euros
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {id?'Update':'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}