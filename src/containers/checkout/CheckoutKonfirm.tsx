import React, { useCallback, useEffect, useState } from 'react';
import { Cart } from '../kasir/Cart';
import { Button, Card, Lookup } from 'react-rainbow-components';
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

  function isCanCheckout() {
    return cart.products.size > 0
  }

  return (
    <Card className="rainbow-m-around_large rainbow-p-around_large">
      <div>
        <div className="rainbow-flex rainbow-flex_column rainbow-align_end rainbow-m-bottom_small">
          <div className="rainbow-flex rainbow-flex_column rainbow-align_center">
            <span className="heading1">Total Pembelian</span>
            <NumberFormat value={cart.getSubtotal()} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value: any) => {
              return (<div className="heading2">{value}</div>)
            }} />
          </div>
        </div>

        <div className="rainbow-m-around_large">
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

        <div
        >
          <ProductListView
            productList={cart.getProductList()}
            setCart={(cart: Cart) => {
              setCart(cart);
            }}
            cart={cart} />
        </div>

        <div className="rainbow-flex rainbow-flex_column rainbow-align_end">
          <Button 
            className="rainbow-m-top_small rainbow-m-horizontal_large"
            size="large"
            variant="success"
            disabled={!isCanCheckout()}
            onClick={() => {
              onBayar()
            }}>
            Konfirmasi
          </Button>
        </div>
      </div>
    </Card>
  );
};

