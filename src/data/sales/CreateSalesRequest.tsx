import { ProductRequest } from "./ProductRequest";
import { PaymentRequest } from "./PaymentRequest";

export interface CreateSalesRequest {
    amount: number,
    promotion: string | undefined,
	employee: number,
	cabang: number,
    payment : PaymentRequest,
    productSales: ProductRequest[]
}