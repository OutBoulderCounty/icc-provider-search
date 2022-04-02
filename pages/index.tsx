import type { NextPage } from "next"
import Link from "next/link"
import NavBar from "../components/navBar"
import { fetcher } from "../utils"
import { Provider } from "./api/providers"
import useSWR from "swr"
import Error from "../components/error"
import React, { useState, useEffect } from "react"
import { Modalwindow } from "../components/modal"

const Home: NextPage = () => {
  const { data, error } = useSWR<Provider[], Error>("/api/providers", fetcher)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [providerIdx, setProviderIdx] = useState<any>(0)
  const [providerID, setProviderID] = useState<string>("")

  const displayModal = (provider: any) => {
    setIsModalOpen(true)
    if(data) {
      if(typeof window !== "undefined") {
        localStorage.setItem("ID", JSON.stringify(provider._sid))
        const id = JSON.parse(localStorage.getItem("ID")||"")
        setProviderID(id)
        localStorage.removeItem("ID")
      }         
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        <header>
          <NavBar />
        </header>
        {error ? <Error name={error.name} message={error.message} /> : null}
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 m-10"
        >
          {data?.map((provider, index) => {
            return (
              <li
                onClick={() => displayModal(provider)}
                key={provider._sid}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 hover:cursor-pointer"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {provider.providers__name}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {provider.providers__email}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <Modalwindow
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          providerIdx={providerIdx}
          providerID={providerID}
          setProviderID={setProviderID}
          data={data}
        />
      </main>
    </div>
  )
}

export default Home