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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                  <div className="space-y-12">
                    {provider.data ? (
                      <ul role="list" className="mx-auto">
                        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                          <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none mx-6 lg:mx-0">
                            {provider.data.personalAttributes.map(
                              (attribute) => (
                                <li key={attribute._sid}>
                                  <h2 className="text-2xl font-semibold">
                                    {attribute.label}
                                  </h2>
                                  <p className="text-sm">{attribute.value}</p>
                                  {attribute.url ? (
                                    <img
                                      src={attribute.url}
                                      alt={attribute.label}
                                    />
                                  ) : null}
                                </li>
                              )
                            )}
                            {provider.data.practiceAttributes.map(
                              (attribute) => (
                                <li key={attribute._sid}>
                                  <h2 className="text-2xl font-semibold">
                                    {attribute.label}
                                  </h2>
                                  <p className="text-sm">{attribute.value}</p>
                                  {attribute.url ? (
                                    <img
                                      src={attribute.url}
                                      alt={attribute.label}
                                    />
                                  ) : null}
                                </li>
                              )
                            )}
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

//https://tailwindui.com/components/marketing/sections/faq-sections
// {provider.data?.attributes?.map((person, index) => {
//   return (
//     <li key={`${index}`}>
//       <div className="space-y-6">
//         <img
//           className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
//           src={providers__headshot[0].url}
//           alt=""
//         />
//         <div className="space-y-2">
//           <div className="text-lg leading-6 font-medium space-y-1">
//             <h3>{person.name}</h3>
//             <p className="text-indigo-600">
//               {person.role}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-20 lg:px-8 ">
//         <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-6 ">
//           <div className="text-left ">
//             <h2 className="text-3xl font-extrabold text-gray-900">
//               Personal Details
//             </h2>
//           </div>
//           <div className="lg:mt-0 lg:col-span-2 text-left">
//             <dl className="space-y-12">
//               {/* border */}
//               <div className="border-gray-400 border-2 pl-5">
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Name
//                 </dt>
//                 <dd className="mb-2 text-base">
//                   {/* {providers__name} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Pronouns
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* {providers__pronouns} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Email
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* <a href={`mailto:${providers__email}`}>{providers__email}</a> */}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//         <div className="lg:grid lg:grid-cols-3 lg:gap-8">
//           <div className="text-left mt-6">
//             <h2 className="text-3xl font-extrabold text-gray-900">
//               Practice Information
//             </h2>
//           </div>
//           <div className=" lg:mt-0 lg:col-span-2 text-left border-gray-400 border-2 pl-5">
//             <dl className="space-y-12">
//               <div>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                 Practice Name
//                 </dt>
//                 <dd className="mb-2 text-base">
//                   {/* {providers__practice_name} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Nickname
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* {providers__practice_nick_name} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Address
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* NEED A LINK FOR EMAIL */}
//                   {/* {providers__address} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                 Phone
//                 </dt>
//                 <dd className="mb-2 text-base">
//                   {/* {providers__phone} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Website
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* {providers__website} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Practice Speciality/Focus
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* NEED A LINK FOR EMAIL */}
//                   {/* {providers__specialty_of_practice_focus} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   Language Support
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* NEED A LINK FOR EMAIL */}
//                   {/* {providers__language_support} */}
//                 </dd>
//                 <dt className="mt-4 text-lg leading-6 font-medium text-gray-500">
//                   DISABILITY/ACCOMODATIONS
//                 </dt>
//                 <dd className="mb-2 text-base text-gray-900">
//                   {/* NEED A LINK FOR EMAIL */}
//                   {/* {providers__disability_accomodations} */}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>
//     </li>
//   )
// })}
