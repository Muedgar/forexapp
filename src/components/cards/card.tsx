"use client"
import { getMoneyExchanges } from "@/app/transactions/actions";
import { getfloats } from "@/app/transactions/float/actions";
import { getsendings } from "@/app/transactions/sending/actions";
import { getwithdrawings } from "@/app/transactions/withdrawing/actions";
import { useEffect, useState } from "react";


/**
 * Formats a number by adding commas as thousand separators.
 * 
 * @param num - The number to format
 * @returns The formatted number with commas
 */
function addCommasToNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export default function Card() {
  const [exchanges, setExchanges] = useState('')
  const [sendings, setSendings] = useState('')
  const [withdrawings, setWithdrawings] = useState('')
  const [floats, setFloats] = useState('')

  const getStats = async () => {
    const exch:any = await getMoneyExchanges();
    const sen:any = await getsendings();
    const withd:any = await getwithdrawings();
    const flo:any = await getfloats()

    const lenExch = `${addCommasToNumber(exch.length)}`
    const lenSen = `${addCommasToNumber(sen.length)}`
    const lenWithd =  `${addCommasToNumber(withd.length)}`
    const lenFlo = `${addCommasToNumber(flo.length)}`

    setExchanges(lenExch);
    setSendings(lenSen);
    setWithdrawings(lenWithd);
    setFloats(lenFlo)
  }
  useEffect(() => {
    getStats();
  }, []);
    return (
      <div className="bg-gray-50 pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            FOREIGNEx - Welcome
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Record transactions including sending money, withdrawing money, currency exchange, and generate reports of float and open account.
            </p>
          </div>
        </div>
        <div className="mt-10 bg-white pb-12 sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Currency Exchange</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-indigo-600">{exchanges?exchanges:'...'} records</dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Sending Money</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-indigo-600">{sendings?sendings:'...'} records</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Withdrawing Money</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-indigo-600">{withdrawings?withdrawings:'...'} records</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Float Account</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-indigo-600">{floats?floats:'...'} records</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  