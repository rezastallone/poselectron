import React, { useState } from 'react';
import { TableWithBrowserPagination, Column } from 'react-rainbow-components';
import { Product } from '../../data/AppDatabase';
import { ProductActionView } from './ProductActionView';
import { RupiahTextView } from './RupiahTextView';
import { Cart } from './Cart';



export interface ProductListProp {
  productList: Product[],
  cart: Cart,
  setCart: (cart: Cart) => void
}

export const ProductListView: React.FC<any & ProductListProp> = (props: any & ProductListProp) => {

  const addProduct = (product: Product) => {
    let cart: Cart = props.cart
    cart.addProduct(product)
    props.setCart(new Cart(cart.products))
  }

  const removeProduct = (product: Product) => {
    let cart: Cart = props.cart
    cart.removeProduct(product)
    props.setCart(new Cart(cart.products))
  }

  const clearProduct = (product: Product) => {
    props.cart.clearProduct(product)
    props.setCart(new Cart(props.cart.products))
  }

  const handleDiskonOnChange = ({ value, row }) => {
    console.log(value)
    let cart: Cart = props.cart
    let diskon = Number(value) || 0
    if ( diskon > 0 && diskon <= 100 ){
      cart.updateDiscount(value, row)
      props.setCart(new Cart(props.cart.products))
    } else {
      cart.updateDiscount(0, row)
      props.setCart(new Cart(props.cart.products))
    } 
}

  return (
    <div className="rainbow-m-bottom_xx-large">
      <TableWithBrowserPagination pageSize={100} data={props.productList} keyField="barcode">
        <Column header="Barcode" field="barcode" defaultWidth="130"/>
        <Column header="Deskripsi" field="description" />
        <Column
            header="Diskon (1 - 100)"
            field="diskon"
            isEditable
            defaultWidth="130"
            onChange={handleDiskonOnChange}
        />
        <Column header="Harga" component={(data: any) => (
          <RupiahTextView harga={data.row.harga} />
        )} />
        <Column header="Aksi" defaultWidth="300" component={(data: any) => (
          <ProductActionView
            count={props.cart.getProductCount(data.row)}
            row={data.row}
            addProduct={() => {
              addProduct(data.row)
            }}
            removeProduct={() => {
              removeProduct(data.row)
            }}
            clearProduct={() => {
              clearProduct(data.row)
            }}
          />
        )} />
      </TableWithBrowserPagination>
    </div>
  )
}


