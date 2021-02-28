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

  return (
    <div className="rainbow-m-bottom_xx-large">
      <TableWithBrowserPagination pageSize={5} data={props.productList} keyField="i d">
        <Column header="Barcode" field="id" />
        <Column header="Deskripsi" field="description" />
        <Column header="Harga" component={(data: any) => (
          <RupiahTextView harga={data.row.harga} />
        )} />
        <Column header="Aksi" component={(data: any) => (
          <ProductActionView
            count={props.cart.getProductCount(data.row)}
            row={data.row}
            addProduct={() => {
              addProduct(data.row)
            }}
            removeProduct={() => {
              removeProduct(data.row)
            }}
          />
        )} />
      </TableWithBrowserPagination>
    </div>
  )
}


