import type { NextApiRequest, NextApiResponse } from "next"

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await fetch("https://airportal.stacker.app/api/fields/", {
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
  const data = (await resp.json()) as Array<Field>
  res.status(resp.status).json(data)
}
