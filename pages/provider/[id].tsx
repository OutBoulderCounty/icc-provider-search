import { useRouter } from "next/router"
import NavBar from "../../components/navBar"
import useSWR from "swr"
import { fetcher } from "../../utils"
import { Provider } from "../api/provider/[id]"
import { Field } from "../api/fields"
import Error from "../../components/error"

const ProviderDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const provider = useSWR<Provider, Error>(`/api/provider/${id}`, fetcher)

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        <header>
          <NavBar />
        </header>
        <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider">
          {provider.error ? (
            <Error
              name={provider.error.name}
              message={provider.error.message}
            />
          ) : null}
          <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
            <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none mx-6 lg:mx-0">
              {provider.data?.attributes.map((attribute) => (
                <div key={attribute._sid}>
                  <h2 className="text-2xl font-semibold">{attribute.label}</h2>
                  <p className="text-sm">{attribute.value}</p>
                  {attribute.url ? (
                    <img src={attribute.url} alt={attribute.label} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProviderDetail
