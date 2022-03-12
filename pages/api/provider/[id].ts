import type { NextApiRequest, NextApiResponse } from "next"
// import { Provider } from "../providers"

export type Field = {
  _sid: string
  label: string
  api_name: string
  object_id: string
  feature_id: string
  _object_id: string
  type: string
  is_primary: boolean
  options: {
    options: Array<{
      label: string
      value: string
    }>
  }
}

export type Provider = {
  _sid: string
  attributes: Array<ProviderAttribute>
}

type ProviderAttribute = {
  _sid: string
  label: string
  value?: string
  url?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const resp = await fetch(`https://airportal.stacker.app/api/records/${id}`, {
    // @ts-ignore
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-api-token": process.env.STACKER_API_TOKEN,
      "x-stack-id": "stack.DO43AL",
    },
    referrer: "https://outboulderproviders.stackerhq.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit",
  })
  const data = await resp.json()
  if (data.providers__status === "✅ Approved") {
    const fieldsResp = await fetch(
      "https://airportal.stacker.app/api/fields/",
      {
        // @ts-ignore
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-api-token": process.env.STACKER_API_TOKEN,
          "x-stack-id": "stack.DO43AL",
        },
        referrer: "https://outboulderproviders.stackerhq.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    )
    const fields = (await fieldsResp.json()) as Array<Field>
    const provider = {
      _sid: data._sid,
      attributes: [],
    } as Provider
    fields.forEach((field) => {
      const response = data[field.api_name]
      if (
        response !== null &&
        response !== undefined &&
        field.label !== "DGform"
      ) {
        if (Array.isArray(response)) {
          if (response.length > 0) {
            const attribute = {
              _sid: field._sid,
              label: field.label,
            } as ProviderAttribute
            response.forEach((item) => {
              if (item.url) {
                attribute.url = item.url
              } else if (item !== null) {
                attribute.value = String(item)
              }
            })
            provider.attributes.push(attribute)
          }
        } else {
          provider.attributes.push({
            _sid: field._sid,
            label: field.label,
            value: String(response),
          })
        }
      }
    })
    res.status(200).json(provider)
  } else {
    res.status(404).json({
      message: "Provider not found",
    })
  }
}
