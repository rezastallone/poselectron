import React, { useEffect, useState } from 'react';
import { Product } from '../../data/AppDatabase';
import { Button, ButtonIcon, RenderIf } from 'react-rainbow-components';
// import "./style.scss";
import { Card } from 'react-rainbow-components';
import { MdShoppingCart } from "react-icons/md";
import { ProductListView } from './ProductListView';
import { RupiahTextView } from './RupiahTextView';
import { Cart } from './Cart';
import { getApi, productApi } from '../../data/RemoteData';
import { Response } from '../../data/model/Response';
import { CheckoutModalView } from '../checkout/CheckoutView';

export const KasirView: React.FC<any> = () => {

  const [cart, setCart] = useState(new Cart(new Map))

  const [isOpen, setIsOpen] = useState(false)

  const [isVisible, setIsVisible] = useState(false);

  let initProducst: Product[] = []

  const [products, setProducts] = useState(initProducst)

  useEffect(() => {
    reloadOfflineProducts();
  }, [])

  useEffect(() => {
    setIsVisible(cart.hasProduct())
  }, [cart])

  function reloadOfflineProducts() {
    getApi<string, Response<Product>>(productApi)
      .then((response: Response<Product>) => {
        setProducts(response.results)
      }).catch((e: any) => {
        console.error(" error " + e)
      })
  }

  return (
    <div>
      <ProductListView
        productList={products}
        setCart={(cart: Cart) => {
          setCart(cart)
        }}
        cart={cart}
      />

      <RenderIf isTrue={true}>
        <div className="rainbow-p-around_large">
          <Card>
            <div
              onClick={() => { setIsOpen(true) }}
              className="rainbow-p-vertical_large rainbow-p-horizontal_large rainbow-align-content_space-between">
              <div className="rainbow-align-content_end">
                <ButtonIcon variant="border-filled" icon={<MdShoppingCart />} />
                {cart.getTotalProductCount()} Item
            </div>
              <div>
                <RupiahTextView harga={cart.getSubtotal()} />
              </div>
            </div>
          </Card>
        </div>
      </RenderIf>

      <CheckoutModalView
        cart={cart}
        setCart={setCart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}
