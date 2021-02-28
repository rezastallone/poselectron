import React from 'react';
import { Cart } from '../kasir/Cart';
import { Button } from 'react-rainbow-components';
import { ProductListProp, ProductListView } from '../kasir/ProductListView';
import { RupiahTextView } from '../kasir/RupiahTextView';


export const CheckoutKonfirm: React.FC<any & ProductListProp> = (props: any) => {

  const { cart, setCart, onBayar } = props;

  let diskon = 0;

  return (
    <div>
      <ProductListView
        productList={cart.getProductList()}
        setCart={(cart: Cart) => {
          setCart(cart);
        }}
        cart={cart} />
      -----------------------------------
      <div>
        Subtotal  : <RupiahTextView harga={cart.getSubtotal()} />
      </div>
      <p>Diskon   : {diskon} </p>
      <div>
        Total     : {cart.getSubtotal() - diskon}
      </div>
      <div>
        <Button onClick={() => {
          onBayar();
        }}>
          Bayar
      </Button>
      </div>

    </div>
  );
};
