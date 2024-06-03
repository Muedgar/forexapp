'use client'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CreateMoneyExchange from '../forms/transactions_create_money_exchange'
import { getMoneyExchanges } from '@/app/transactions/actions'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'


export default function TableCurrencyExchange() {
  const [open, setOpen] = useState(false)
  const [exchanges, setExchanges] = useState([])

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    async function fetchExchanges() {
      const data:any = await getMoneyExchanges();
      setExchanges(data);
    }

    fetchExchanges();
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <CreateMoneyExchange />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="w-[80%] m-auto mt-[100px] px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Transactions - Money Exchange.</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all records of transactions of money exchange or currency exchange.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setOpen(true)
                console.log("current state: ",open)
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Create Record
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Exchangers names
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Money type (Both Currencies)
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Rate
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Transaction date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount (Both Currencies)
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {exchanges.map((exchange:any, k:any) => (
                      <tr key={k}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {exchange.exchangers_names}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.currencies}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.rate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.time}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.amount}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a 
                            onClick={() => {
                              setOpen(true)
                            }}
                            href="#" className="text-indigo-600 hover:text-indigo-900">
                            <PencilIcon />
                          </a>
                          <a 
                            // onClick={() => {
                            //   setOpen(true)
                            // }}
                            href="#" className="text-red-600 hover:text-red-900">
                            <TrashIcon />
                          </a>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
