import React, { useEffect, useState } from 'react'
import { Cart } from '../kasir/Cart'
import { Modal } from 'react-rainbow-components';
import { Path, PathStep } from 'react-rainbow-components';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProductListProp } from '../kasir/ProductListView';
import { useHistory } from "react-router-dom";
import { CheckoutKonfirm } from './CheckoutKonfirm';
import { CheckoutBayar } from './CheckoutBayar';
import { CheckoutStruk } from './CheckoutStruk';

export interface CheckoutProps {
  isOpen: boolean,
  setIsOpen: any
}

export interface PaymentMethod {
  id: string
  type: number
  total: number
  cardNumber: string
}


export const CheckoutModalView: React.FC<any & ProductListProp> = (props: any) => {

  let initPaymentMethod: PaymentMethod[] = []

  const [paymentMethods, setPaymentMethods] = useState(initPaymentMethod)

  const { isOpen, setIsOpen, cart, setCart } = props

  const [page, setPage] = useState("1")

  let { path, url } = useRouteMatch();

  const history = useHistory();

  function handleOnClose() {
    return setIsOpen(false)
  }

  function setStep(stepName: string) {
    setPage(stepName)
    if (stepName == "1") {
      history.push(`${path}`)
    } else {
      history.push(`${path}/checkout/${stepName}`)
    }
  }

  return (
    <div>
      <Modal id="modal-1" isOpen={isOpen} onRequestClose={handleOnClose} size="large">
        <div className="rainbow-p-around_large">

          <Path currentStepName={page}>
            <PathStep name="1" label="Konfirmasi Pesanan" />
            <PathStep name="2" label="Pembayaran" />
            <PathStep name="3" label="Pesanan Sukses" />
          </Path>
        </div>

        <Switch>
          <Route
            path={`${path}`}
          >
            <CheckoutKonfirm
              setCart={(cart: Cart) => {
                setCart(cart)
              }}
              cart={cart}
              onBayar={() => {
                setStep("2")
              }}
            />
          </Route>
          <Route path={`${path}/checkout/2`}>
            <CheckoutBayar
              cart={cart}
              paymentMethods={paymentMethods}
              setPaymentMethods={setPaymentMethods}
              onBayar={() => {
                setStep("3")
              }}
              onBatal={() => {
                setStep("1")
              }}
            />
          </Route>
          <Route path={`${path}/checkout/3`}>
            <CheckoutStruk
              cart={cart}
              paymentMethods={paymentMethods}
            >
            </CheckoutStruk>
          </Route>
        </Switch>
      </Modal>
    </div>
  )
}
