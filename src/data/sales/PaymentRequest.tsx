export interface PaymentRequest {
    amount: number,
    detail: string | undefined,
    expiryDate: null,
    paymethod: string
}