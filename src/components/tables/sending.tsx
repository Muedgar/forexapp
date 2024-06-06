'use client'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CreateMoneyExchange from '../forms/transactions_create_money_exchange'
import { getMoneyExchanges, getMoneyExchangesInRange } from '@/app/transactions/actions'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeleteMoneyExchange from '../forms/transactions_delete_money_exchange'

import { Disclosure } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import Select from '../forms/select'
import CreateSending from '../forms/transactions_create_sending'
import DeleteSending from '../forms/transactions_delete_sending'
import { getsendings, getsendingsInRange } from '@/app/transactions/sending/actions'


export default function Sending() {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [exchanges, setExchanges] = useState([])
  const [id, setId] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  

  const cancelButtonRef = useRef(null)
  const cancelButtonRefDelete = useRef(null)
  const fetchExchanges = async () => {
    const data:any = await getsendings();
    setExchanges(data);
  }
  useEffect(() => {
    fetchExchanges();
  }, []);
  
  const handleFilter = async () => {
    if(startDate && endDate) {
      const data:any = await getsendingsInRange(startDate, endDate)
      setExchanges(data)
    }
  }

  const handleClear = () => {
    fetchExchanges();
  }


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
                  {id?<CreateSending id={id} getData={fetchExchanges} onClose={setOpen} />:<CreateSending getData={fetchExchanges} />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRefDelete} onClose={setOpenDelete}>
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
                  <DeleteSending id={id} getData={fetchExchanges} onClose={setOpenDelete}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      
      <div className="w-[100%]">
      <>
          <div className="sm:flex sm:items-center">
        
        <div className="sm:flex-auto">
        
          <h1 className="text-xl font-semibold text-gray-900">Transactions - Sending.</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all records of transactions about sending money.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setOpen(true)
              setId(null)
              console.log("current state: ",open)
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Create Record
          </button>
        </div>
      </div>
      <div className="bg-white">
    

    {/* Filters */}
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="grid items-center border-t border-b border-gray-200"
    >
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
          <div>
            <Disclosure.Button className="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button onClick={handleFilter} type="button" className="text-gray-500 hover:text-black">
              Apply
            </button>
          </div>
          <div className="pl-6">
            <button onClick={handleClear} type="button" className="text-gray-500 hover:text-black">
              Clear all
            </button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="border-t border-gray-200 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
        
    <div>
    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
      Start date
    </label>
    <div className="mt-1">
      <input
        type="date"
        name="start_date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        id="start_date"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    </div>
    <div>
    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
      End date
    </label>
    <div className="mt-1">
      <input
        type="date"
        name="end_date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        id="end_date"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    </div>
          </div>
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Receiver names
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Telephone number
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
                        {exchange.receiver_names}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.telephone_number}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.currencies}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.rate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.time}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.amount}</td>
                      <td className="relative whitespace-nowrap flex py-4 pl-3 pr-4 text-right text-2xl font-medium sm:pr-6">
                        <PencilIcon onClick={() => {
                            const id = exchange?.id
                            setId(id)
                            setOpen(true)
                          }} className="text-indigo-600 w-[25px] hover:text-indigo-900 cursor-pointer mr-2" />
                        <TrashIcon onClick={() => {
                            const id = exchange?.id
                            setId(id)
                            setOpenDelete(true)
                          }} className="text-red-600 w-[22.5px] hover:text-red-900 cursor-pointer"/>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
        </>
      </div>
    </>
  )
}
