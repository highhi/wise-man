function getJsonFromResponse(res: Response) {
  const json = res.json()
  if (!res.ok) return json.then(err => { throw err })
  return json
}

function getSafetyUrl(url: string, params?: object) {
  const path = new URL(url, 'http://localhost:3001')
  if (params) {
    Object.entries(params).forEach(([key, value]) => path.searchParams.append(key, value))
  }
  return path.href
}

export default function httpClient<R>(url: string, options?: RequestInit, params?: object): Promise<R> {
  return fetch(getSafetyUrl(url, params), {
    ...options,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then<R>(getJsonFromResponse)
}

export function getRequest<R>(url: string, params?: object) {
  return httpClient<R>(url, { method: 'GET' }, params)
}

export function postRequest<R>(url: string, body: object = {}) {
  return httpClient<R>(url, { method: 'POST', body: JSON.stringify(body)})
}
