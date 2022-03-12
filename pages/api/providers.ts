import type { NextApiRequest, NextApiResponse } from "next"

export type Data = {
  result_info: {
    total_results: number
  }
  records: Array<Provider>
}

export type Provider = {
  _sid: string
  providers__headshot: Array<{
    url: string
    filename: string
  }> | null
  providers__name: string
  providers__pronouns: string | null
  providers__practice_name: string
  providers__practice_nick_name: string | null
  providers__address: string | null
  providers__specialty_of_practice_focus: string | null
  providers__phone: string | null
  providers__disability_accomodations: string | null
  providers__language_support: string | null
  providers__website: string | null
  providers__email: string
  providers__status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Provider[]>
) {
  const resp = await fetch(
    "https://airportal.stacker.app/api/objects/object.custom.providers/records/?_dereference=true&_dereferenceList=%5B%5D&_includeFields=%5B%22providers__name%22%2C%22providers__status%22%2C%22providers__practice_name%22%2C%22providers__email%22%2C%22providers__dgform%22%2C%22providers__pronouns%22%2C%22providers__address%22%2C%22providers__practice_nick_name%22%2C%22providers__phone%22%2C%22providers__website%22%2C%22providers__specialty_of_practice_focus%22%2C%22providers__language_support%22%2C%22providers__disability_accomodations%22%2C%22providers__headshot%22%5D&_count=1000",
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
  // filter out unapproved providers
  const data = (await resp.json()) as Data
  const approved = data.records.filter(
    (provider) => provider.providers__status === "✅ Approved"
  )
  res.status(resp.status).json(approved)
}
