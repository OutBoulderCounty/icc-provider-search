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
  const [filteredProviders, setFilteredProviders] = useState<Provider[] | null>(
    null
  )

  //Provider Attributes Array
  const providerAttr = data ? Object.keys(data) : null;

  //Modal diplays provider information when clicked
  const displayModal = (provider: any) => {
    setIsModalOpen(true)
    if (data) {
      if (typeof window !== "undefined") {
        localStorage.setItem("ID", JSON.stringify(provider._sid))
        const id = JSON.parse(localStorage.getItem("ID") || "")
        setProviderID(id)
        localStorage.removeItem("ID")
      }
    }
  }

  //Search input functionality
  const search = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      value: string
    }
    console.log({ target })

    if (data) {
      // setFilteredProviders(
      //   data.filter((provider) => {
      //       return provider.providers__name
      //         .toLowerCase()
      //         .includes(target.value.toLowerCase())
      //   })
      // )

      //match typed words to any of the attributes
      const results = data.filter((provider) => {
        if(provider.providers__name.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__pronouns?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__practice_name.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__practice_nick_name?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__address?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__specialty_of_practice_focus?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__disability_accomodations?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__language_support?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
        if(provider.providers__email?.toLowerCase().includes(target.value.toLowerCase())){
          return provider
        }
      })

      //Provider Attributes Array
      //  const providerAttr = data ? Object.keys(data) : null;
      // const results = data.filter((provider: any) => {
      //   providerAttr?.forEach((attr) => {
      //     provider[attr]?.includes(target.value.toLowerCase())
      //       return provider
      //   })
      // })

      setFilteredProviders(results)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        <header>
          <NavBar />
        </header>
        {error ? <Error name={error.name} message={error.message} /> : null}

        <div className="w-full sm:max-w-xs md:max-w-3xl mt-5 mx-auto">
          <form
            onChange={search}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Find a provider
              </label>
              <input
                className="shadow appearance-none border rounded sm:w-72 md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
              />
            </div>
          </form>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 m-10"
        >
          {!filteredProviders
            ? data?.map((provider, index) => {
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
              })
            : filteredProviders?.map((provider, index) => {
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
