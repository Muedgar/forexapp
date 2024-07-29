'use client';

import { createfloat, getfloatById, updatefloat } from '@/app/transactions/float/actions';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateFloat({ id, getData, onClose }: any) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [currentCurrency, setCurrentCurrency] = useState('');
const [amount, setAmount] = useState('')
  const getOne = async (key:number) => {
    try {
      const res = await getfloatById(key);
      setValue('amount', res?.amount || '');
      setValue('time', res?.time || '');

      if (res.currencies.includes('Rwandan Francs')) {
        setValue('currency', 'rwandan_francs');
        setCurrentCurrency('rwandan_francs');
      }
      if (res.currencies.includes('Ugandan Shillings')) {
        setValue('currency', 'ugandan_shillings');
        setCurrentCurrency('ugandan_shillings');
      }
      if (res.currencies.includes('Kenyan Shillings')) {
        setValue('currency', 'kenyan_shillings');
        setCurrentCurrency('kenyan_shillings');
      }
      if (res.currencies.includes('Tanzanian Shillings')) {
        setValue('currency', 'tanzanian_shillings');
        setCurrentCurrency('tanzanian_shillings');
      }
      if (res.currencies.includes('US Dollars')) {
        setValue('currency', 'us_dollars');
        setCurrentCurrency('us_dollars');
      }
      if (res.currencies.includes('Euros')) {
        setValue('currency', 'euros');
        setCurrentCurrency('euros');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      const newId = Number(id);
      getOne(newId);
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    if (!data?.amount || !data?.time) {
      return;
    }

    const formData = new FormData();
    formData.append('amount', String(data.amount));
    formData.append('time', data.time);

    const currencyMap: Record<string, string> = {
      'rwandan_francs': 'Rwandan Francs',
      'ugandan_shillings': 'Ugandan Shillings',
      'kenyan_shillings': 'Kenyan Shillings',
      'tanzanian_shillings': 'Tanzanian Shillings',
      'us_dollars': 'US Dollars',
      'euros': 'Euros',
    };
    const selectedCurrency = currencyMap[currentCurrency];
    formData.append('currencies', selectedCurrency);
    try {
      if (id) {
        await updatefloat(id, formData);
      } else {
        await createfloat(formData);
        
      }
      reset();
      getData();
      onClose(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Amount</h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Float account amount: {Number(amount).toLocaleString()}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  {...register('amount')}
                  id="amount"
                  min={0}
                  autoComplete="amount"
                  onChange={e=> setAmount(e.target.value)}
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Date</h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Date
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
                {['rwandan_francs', 'ugandan_shillings', 'kenyan_shillings', 'tanzanian_shillings', 'us_dollars', 'euros'].map((currency) => (
                  <div key={currency} className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={currency}
                        {...register('currency')}
                        type="radio"
                        value={currency}
                        name="currency" // Add name attribute
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={currentCurrency === currency}
                        onChange={() => setCurrentCurrency(currency)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={currency} className="font-medium text-gray-700">
                        {currency.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                      </label>
                    </div>
                  </div>
                ))}
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
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}
