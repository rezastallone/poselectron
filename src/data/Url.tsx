// export const productApi = "https://fashionstore2021.herokuapp.com/pos/api/v1/product/"

import { postApi } from "./RemoteData"

// export const productApiFilterBarcode = "https://fashionstore2021.herokuapp.com/pos/api/v1/product/?search="

const devUrl = "http://0.0.0.0:8181/"

const prodUrl = "https://fashionstore2021.herokuapp.com/"

function getDomain(){
    if (process.env.NODE_ENV === 'development'){
        return devUrl
    } else {
        return prodUrl
    }
}

const posApi = getDomain() + "/pos/api/v1/"

export const productApi = postApi + "product/"

export const productApiFilterBarcode = postApi + "product/?search="

export const createsalesApi = postApi + "createsales/"

export const createFakturApi = postApi + "createfaktur/"

export const createSalesReturApi = postApi + "createsalesretur/"

export const createRequestOrderApi = postApi + "createrequestorder/"

export const updateStatusRequestOrderApi = postApi + "updatestatusrequestorder/"

export const createSentOrderApi = postApi + "createsentorder/"

export const updateStatusSentOrderApi = postApi + "updatestatussentorder/"

export const createReturnFromSentOrderApi = postApi + "createreturnfromsentorder/"

export const createReturnOrderApi = postApi + "createreturnorder/"

export const updateStatusReturnOrderApi = postApi + "updatestatusreturnorder/"

export const loginApi = getDomain() + "token/"

export const refreshTokenApi = getDomain() + "token/refresh/"



