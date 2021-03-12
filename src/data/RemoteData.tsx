export interface ProductRequest {
  description: string
}

// export const productApi = "https://fashionstore2021.herokuapp.com/pos/api/v1/product/"

// export const productApiFilterBarcode = "https://fashionstore2021.herokuapp.com/pos/api/v1/product/?search="

export const productApiFilterBarcode = "http://0.0.0.0:8181/pos/api/v1/product/?search="

export const productApi = "http://0.0.0.0:8181/pos/api/v1/product/"

export function postApi<Param, Return>(url: string, body: Param): Promise<Return> {
  const requestInit: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return api<Param, Return>(url, requestInit)
}

export function getApi<Param, Return>(url: string): Promise<Return> {
  const requestInit: RequestInit = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  return api<Param, Return>(url, requestInit)
}

function api<Param, Return>(url: string, requestInit: RequestInit): Promise<Return> {
  return fetch(url, requestInit)
    .then(response => {
      console.log("Network error " + response)
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
}
