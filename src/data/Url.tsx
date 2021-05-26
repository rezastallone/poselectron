// export const productApi = "https://fashionstore2021.herokuapp.com/pos/api/v1/product/"

// export const productApiFilterBarcode = "https://fashionstore2021.herokuapp.com/pos/api/v1/product/?search="

const devUrl = "http://0.0.0.0:8181/"

const prodUrl = "https://fashionstore2021.herokuapp.com/"

function getDomain(){
    // if (process.env.NODE_ENV === 'development'){
    // return devUrl
    // } else {
    // }
    return prodUrl
}

const posApi = getDomain() + "pos/api/v1/"

export const productApi = posApi + "product/"

export const productApiFilterBarcode = posApi + "product/?search="

export const createsalesApi = posApi + "createsales"

export const createFakturApi = posApi + "createfaktur"

export const createSalesReturApi = posApi + "createsalesretur"

export const createRequestOrderApi = posApi + "createrequestorder"

export const updateStatusRequestOrderApi = posApi + "updatestatusrequestorder"

export const createSentOrderApi = posApi + "createsentorder"

export const updateStatusSentOrderApi = posApi + "updatestatussentorder"

export const createReturnFromSentOrderApi = posApi + "createreturnfromsentorder"

export const createReturnOrderApi = posApi + "createreturnorder"

export const updateStatusReturnOrderApi = posApi + "updatestatusreturnorder"

export const getProductInventoryApi = posApi + "productinventory"

export const loginApi = getDomain() + "api-token-auth/"


