import React, { Fragment, useState, useEffect } from 'react'
import { Popover, Transition, Dialog } from '@headlessui/react'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Function
  providerIdx: number
  data: any
}

export const Modalwindow: React.FC<Props> = ({isModalOpen, setIsModalOpen, providerIdx, data}) => {

  const displayInfo = [data[providerIdx]]; 
  
  useEffect(() => {
    console.log(displayInfo)
  }, [])

  return (
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsModalOpen (!isModalOpen)}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                MODAL WINDOW
                {/* DESTRUCTURED ARRAY OF 1 OBJECT */}
                {displayInfo.map((obj, index) => {
                  const {
                    _sid, 
                    providers__headerShot, 
                    providers__headshot, providers__disability_accomdations,
                    providers__email
                  } = obj
                  return(
                    <React.Fragment key={index}>  
                      <h1>{providers__email}</h1>
                    </React.Fragment>
                  )
                })}
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
  )
}