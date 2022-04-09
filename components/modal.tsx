import React, { Fragment, useState, useEffect } from "react"
import { Popover, Transition, Dialog } from "@headlessui/react"
import { ExclamationIcon, XIcon } from "@heroicons/react/outline"
// import ProviderDetail from "../pages/provider/[id]"
import { fetcher } from "../utils"
import useSWR from "swr"
import { Provider } from "../pages/api/provider/[id]"

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Function
  providerIdx: number
  data: any
  providerID: string
  setProviderID: Function
}

export const Modalwindow: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  providerIdx,
  data: providerData,
  providerID,
  setProviderID,
}) => {
  const provider = useSWR<Provider, Error>(
    `/api/provider/${providerID}`,
    fetcher
  )

  const len: number = (provider?.data?.personalAttributes.length || 0); 

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
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

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:block absolute top-0 right-0 pt-2 pr-2 ml-3 pl-2">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="bg-white h-screen overflow-y-scroll mt-4">
                <div className="max-w-7xl mx-auto px-4 text-center sm:px-4 lg:px-8 lg:py-24">
                  <div className="space-y-12 px-4 ">
                    {provider.data ? (
                      <ul role="list" className="mx-auto">
                        <div className=" max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-12 lg:my-0">
                          <div className="mx-auto w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none lg:mx-0 border-gray-400">
                            {provider.data.personalAttributes.map(
                              (attribute, index) => (
                                <li
                                  className={`text-left ${
                                    index === len - 1
                                      ? "border-b-2 border-gray-400"
                                      : ""
                                  } ${
                                    index === 0
                                      ? "border-b-2 border-gray-400"
                                      : ""
                                  }`}
                                  key={attribute._sid}
                                >
                                  {attribute.label === "Headshot" ? (
                                    ""
                                  ) : (
                                    <h2
                                      className={`text-2xl font-semibold border-gray-400 border-x-2 px-6 pt-2 `}
                                    >
                                      {attribute.label}
                                    </h2>
                                  )}
                                  <p
                                    className={`text-sm border-gray-400 border-x-2 px-6 ${
                                      index === len-1 ? "pb-4" : ""
                                    }`}
                                  >
                                    {attribute.value}
                                  </p>
                                  {attribute.url ? (
                                    <div className="">
                                      <img
                                        src={attribute.url}
                                        alt={attribute.label}
                                        className={
                                          attribute.label === "Headshot"
                                            ? "mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                                            : ""
                                        }
                                      />
                                      <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
                                        Personal Details
                                      </h2>
                                    </div>
                                  ) : null}
                                </li>
                              )
                            )}

                            <div className="text-left mt-6">
                              <h2 className="text-3xl font-extrabold text-gray-900">
                                Practice Information
                              </h2>
                            </div>

                            <div className="border-gray-400 border-2 mb-6">
                              <dl>
                                {provider.data.practiceAttributes.map(
                                  (attribute) => (
                                    <React.Fragment key={attribute._sid}>
                                      <dt className="text-left font-medium text-gray-500 px-6 pt-2 leading-6 ">
                                        {attribute.label}
                                      </dt>
                                      <dd className="text-sm px-6 text-left text-gray-900 font-bold text-base">
                                        {attribute.value}
                                      </dd>
                                      {attribute.url ? (
                                        <img
                                          src={attribute.url}
                                          alt={attribute.label}
                                        />
                                      ) : null}
                                    </React.Fragment>
                                  )
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </ul>
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                  {/* <ProviderDetail /> */}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}