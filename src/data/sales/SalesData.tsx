import { postApi } from "../RemoteData";
import { PaymentRequest } from "./PaymentRequest";
import { ProductRequest } from "./ProductRequest";
import { CreateSalesRequest } from "./CreateSalesRequest";
import { createsalesApi } from "../Url";
import { getCabang, getUser } from "../auth/AuthData";
import { User } from "../auth/User";
import { Cabang } from "../auth/Cabang";

export function doSales(payment: PaymentRequest, products: ProductRequest[], onSuccess: ()=> void, onError: () => void){
    const cabang: Cabang = getCabang()
    const employee: User = getUser()

    if (cabang == undefined || employee == undefined){
        onError()
        return
    }

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
        onSuccess()
    }).catch( (error) => {
        console.log('error sale' + JSON.stringify(error))
        // onError()
    })
}