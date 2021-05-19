import { postApi } from "../RemoteData";
import { PaymentRequest } from "./PaymentRequest";
import { ProductRequest } from "./ProductRequest";
import { CreateSalesRequest } from "./CreateSalesRequest";
import { createsalesApi } from "../Url";
import { getCabang, getUser } from "../auth/AuthData";
import { User } from "../auth/User";
import { Cabang } from "../auth/Cabang";

export function doSales(onSuccess: ()=> void, onError: () => void){
    const cabang: Cabang = getCabang()
    const employee: User = getUser()

    if (cabang == undefined || employee == undefined){
        onError()
        return
    }

    let payment: PaymentRequest = {
        amount: 200,
        detail: 'HP Samsung',
        expiryDate: null,
        paymethod: 'CASH'
    }

    let product: ProductRequest = {
        product: 1,
        amount: 200,
        quantity: 2   
    }

    let products: ProductRequest[] = []
    products.push(
        product
    )

    let createSalesRequest: CreateSalesRequest = {
        amount: 200,
        employee: employee.id,
        promotion: undefined,
        cabang: cabang.id,
        payment: payment,
        productSales: products
    }

    postApi<CreateSalesRequest, CreateSalesRequest>(createsalesApi, createSalesRequest)
    .then((response) => {
        alert('success ' + response)
    }).catch( (error) => {
        alert('error ' + error)
    })
}