import React from 'react';
import { Cart } from '../kasir/Cart';
import { Button } from 'react-rainbow-components';
import { ProductListProp, ProductListView } from '../kasir/ProductListView';
import { RupiahTextView } from '../kasir/RupiahTextView';
import './Checkout.css'
import NumberFormat from 'react-number-format';

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

      <div className="rainbow-flex rainbow-flex_column rainbow-align_start rainbow-m-bottom_small">
        <span className="heading2">Total Tagihan</span>
        <NumberFormat value={cart.getSubtotal()} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value: any) => {
          return (<div className="heading1">{value}</div>)
        }} />
      </div>

      <div className="konfirmWrapper rainbow-flex rainbow-flex_column rainbow-align_end">
        <Button className="rainbow-m-top_small"
          onClick={() => {
            onBayar()
          }}>
          Konfirmasi
        </Button>
      </div>
    </div>
  );
};
