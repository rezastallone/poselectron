import React, { useEffect, useState } from 'react'
import { Cart } from '../kasir/Cart'
import { Modal, Button } from 'react-rainbow-components';
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

export const CheckoutModalView: React.FC<any & ProductListProp> = (props: any) => {

  const { isOpen, setIsOpen, cart, setCart } = props

  const [page, setPage] = useState("1")

  let { path, url } = useRouteMatch();

  const history = useHistory();

  function handleOnClose() {
    return setIsOpen(false)
  }

  useEffect(() => {
    setStep("1")
  }, [])

  function setStep(stepName: string) {
    setPage(stepName)
    history.push(`${url}/checkout/${stepName}`)
  }

  return (
    <div>
      <Modal id="modal-1" isOpen={isOpen} onRequestClose={handleOnClose} size="large">
        <div className="rainbow-p-around_large">

          <Path currentStepName={page} onClick={setStep}>
            <PathStep name="1" label="Konfirmasi Pesanan" />
            <PathStep name="2" label="Pembayaran" />
            <PathStep name="3" label="Pesanan Sukses" />
          </Path>
        </div>

        <Switch>
          <Route path={`${path}/checkout/1`}>
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
            onBayar={() => {
              setStep("3")
            }}
          />

          </Route>
          <Route path={`${path}/checkout/3`}>
              <CheckoutStruk>

              </CheckoutStruk>
          </Route>

        </Switch>

      </Modal>
    </div>
  )
}
