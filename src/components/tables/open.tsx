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
import { getallopen, getopens, getopensInRange } from '@/app/transactions/open/actions'
import CreateOpen from '../forms/transactions_open'
import DeleteOpen from '../forms/transactions_delete_open'
var FileSaver = require('file-saver');


export default function Open() {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [exchanges, setExchanges] = useState([])
  const [id, setId] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  

  const cancelButtonRef = useRef(null)
  const cancelButtonRefDelete = useRef(null)
  const fetchExchanges = async () => {
    const data:any = await getallopen();
    setExchanges(data);
  }
  useEffect(() => {
    fetchExchanges();
  }, []);

 
  
  const handleFilter = async () => {
    if (startDate && endDate) {
      const sDate = new Date(startDate);
      const eDate = new Date(endDate);
  
      // Fetch data
      const data: any = await getallopen();
  
      // Filter data
      const filteredData = data.filter((item: any) => {
        const weekMonday = new Date(item.float_week_monday);
        const weekSaturday = new Date(item.float_week_saturday);
  
        // Ensure that sDate falls on or after weekMonday and eDate falls on or before weekSaturday
        return sDate <= weekSaturday && eDate >= weekMonday;
      });
  
      setExchanges(filteredData);
    }
  };
  

  const handleClear = () => {
    fetchExchanges();
  }

  const handlePdf = async () => {
    try {
      if(!exchanges) {
        return
      }
      console.log("data:  ", exchanges)
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exchanges }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the PDF');
      }
  
      const blob = await response.blob();
      FileSaver.saveAs(blob, 'report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  const handleExcel = async () => {
    try {
      const response = await fetch('/api/generate-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exchanges }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the Excel file');
      }
  
      const blob = await response.blob();
      FileSaver.saveAs(blob, 'report_excel.xlsx');
    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  };


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
                  {id?<CreateOpen id={id} getData={fetchExchanges} onClose={setOpen} />:<CreateOpen getData={fetchExchanges} />}
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
                  <DeleteOpen id={id} getData={fetchExchanges} onClose={setOpenDelete}/>
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
        
          <h1 className="text-xl font-semibold text-gray-900">Transactions - open accounts.</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all records of transactions about opening accounts money.
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setOpen(true)
              setId(null)
           
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Create Record
          </button>
        </div> */}
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
            <Disclosure.Button className="group flex items-center font-medium text-gray-700  p-2">
              <FunnelIcon
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button onClick={handleFilter} type="button" className="text-gray-500 hover:text-black p-2">
              Apply
            </button>
          </div>
          <div className="pl-6">
            <button onClick={handleClear} type="button" className="text-gray-500 hover:text-black p-2">
              Clear all
            </button>
          </div>

          <div className="pl-6">
            <button onClick={handlePdf} type="button" className="text-white hover:text-black bg-red-600 p-2">
              Export/Download PDF Report
            </button>
          </div>

          <div className="pl-6">
            <button onClick={handleExcel} type="button" className="text-white hover:text-black bg-green-600 p-2">
              Export/Download Excel Report
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
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Currency
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Float account date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Float account amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Open account amount
                    </th>
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Float account monday date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Float account saturday date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {exchanges.map((exchange:any, k:any) => (
                    <tr key={k}>  
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.currency}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(exchange.float_date)?.toDateString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.float_amount}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exchange.open_account}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(exchange.float_week_monday)?.toDateString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(exchange.float_week_saturday)?.toDateString()}</td>
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
