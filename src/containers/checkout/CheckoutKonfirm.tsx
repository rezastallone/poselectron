import React, { useCallback, useEffect, useState } from 'react';
import { Cart } from '../kasir/Cart';
import { Button, Lookup } from 'react-rainbow-components';
import { ProductListProp, ProductListView } from '../kasir/ProductListView';
import './Checkout.css'
import NumberFormat from 'react-number-format';
import debounce from 'lodash.debounce';
import { getApi, productApiFilterBarcode } from '../../data/RemoteData';
import { Product } from '../../data/AppDatabase';

interface OptionProduct {
  label?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  value?: Product
};


export const CheckoutKonfirm: React.FC<any & ProductListProp> = (props: any) => {

  const { cart, setCart, onBayar } = props;

  const [barcodeSearch, setBarcodeSearch] = useState("")

  const [isLoading, setIsLoading] = useState(false);

  let initOptions: any[] = []

  const [options, setOptions] = useState(initOptions);

  function checkSearchbarcode(barcode: string) {
    if (barcode.length > 0) {
      searchProduct(barcode)
    }
  }

  function searchProduct(barcode: string) {
    setIsLoading(true);
    getApi<string, Response<Product>>(productApiFilterBarcode + barcode)
      .then((response: Response<Product>) => {
        setIsLoading(false);
        if (response.results.length > 0) {
          // cart.addProduct(response.results[0])
          // setCart(new Cart(cart.products))
          // setBarcodeSearch("")

          let optionProducts: OptionProduct[] = []
          response.results.map((item: Product) => {
            optionProducts.push({
              label: item.description,
              description: item.harga,
              value: item
            })
          })
          setOptions(optionProducts)
        } else {
          setOptions([])
        }
      }).catch((e: any) => {
        setIsLoading(false);
        console.error(" error " + e)
      })
  }

  const debouncedSave = useCallback(
    debounce((barcode: any) => checkSearchbarcode(barcode), 1000, { leading: false, trailing: true }),
    [],
  );

  useEffect(() => {
    debouncedSave(barcodeSearch)
  }, [barcodeSearch])

  return (
    <div>
      <div className="rainbow-m-around_xx-large">
        <Lookup
          id="lookup-1"
          label="Cari Barang"
          placeholder="Masukan nama barang atau kode barcode"
          options={options}
          isLoading={isLoading}
          onChange={(item: any) => {
            if (item.value) {
              cart.addProduct(item.value)
              setCart(new Cart(cart.products))
            }
          }
          }
          onSearch={(keyword) => {
            setIsLoading(true);
            setBarcodeSearch(keyword)
          }}
        />
      </div>

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
