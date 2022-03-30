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
  personalAttributes: Array<ProviderAttribute>
  practiceAttributes: Array<ProviderAttribute>
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
      personalAttributes: [],
      practiceAttributes: [],
    } as Provider
    const sortedFields = sortFields(fields)
    sortedFields.personal.forEach((field) => {
      const value = data[field.api_name]
      if (
        value !== undefined &&
        value !== null &&
        field.api_name !== "providers__dgform"
      ) {
        if (Array.isArray(value) && value.length > 0) {
          const attribute = {
            _sid: field._sid,
            label: field.label,
          } as ProviderAttribute
          value.forEach((val) => {
            if (val.url) {
              attribute.url = val.url
            } else if (val !== null) {
              attribute.value = String(val)
            }
          })
          provider.personalAttributes.push(attribute)
        } else {
          provider.personalAttributes.push({
            _sid: field._sid,
            label: field.label,
            value: String(value),
          })
        }
      }
    })
    sortedFields.practice.forEach((field) => {
      const value = data[field.api_name]
      if (
        value !== undefined &&
        value !== null &&
        field.api_name !== "providers__dgform"
      ) {
        if (Array.isArray(value) && value.length > 0) {
          const attribute = {
            _sid: field._sid,
            label: field.label,
          } as ProviderAttribute
          value.forEach((val) => {
            if (val.url) {
              attribute.url = val.url
            } else if (val !== null) {
              attribute.value = String(val)
            }
          })
          provider.practiceAttributes.push(attribute)
        } else {
          provider.practiceAttributes.push({
            _sid: field._sid,
            label: field.label,
            value: String(value),
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

function sortFields(fields: Array<Field>) {
  const sortedFields = {
    personal: [] as Array<Field>,
    practice: [] as Array<Field>,
  }
  fields.forEach((field) => {
    switch (field.api_name) {
      case "providers__headshot":
        insertAt(sortedFields.personal, 0, field)
        break
      case "providers__name":
        insertAt(sortedFields.personal, 1, field)
        break
      case "providers__pronouns":
        insertAt(sortedFields.personal, 2, field)
        break
      case "providers__email":
        insertAt(sortedFields.personal, 3, field)
        break
      case "providers__practice_name":
        insertAt(sortedFields.practice, 0, field)
        break
      case "providers__practice_nick_name":
        insertAt(sortedFields.practice, 1, field)
        break
      case "providers__address":
        insertAt(sortedFields.practice, 2, field)
        break
      case "providers__phone":
        insertAt(sortedFields.practice, 3, field)
        break
      case "providers__website":
        insertAt(sortedFields.practice, 4, field)
        break
      case "providers__specialty_of_practice_focus":
        insertAt(sortedFields.practice, 5, field)
        break
      case "providers__language_support":
        insertAt(sortedFields.practice, 6, field)
        break
      case "providers__disability_accomodations":
        insertAt(sortedFields.practice, 7, field)
        break
      default:
        sortedFields.practice.push(field)
    }
  })
  return sortedFields
}

function insertAt(array: Array<any>, index: number, item: any) {
  array.splice(index, 0, item)
}
