'use client';

import { deleteMoneyExchange } from '@/app/transactions/actions';
import { deletewithdrawing } from '@/app/transactions/withdrawing/actions';
import { useForm } from 'react-hook-form';

export default function Deletewithdrawing({ id, getData, onClose }: any) {
  const { handleSubmit } = useForm();
  

  

  const onSubmit = async () => {
    try {
      await deletewithdrawing(id)
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Delete A Record</h3>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete this record? Note that this will permanently delete this record.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
}
