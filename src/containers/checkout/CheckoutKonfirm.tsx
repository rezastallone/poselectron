import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cart } from '../kasir/Cart';
import { Button, Card, Lookup, Modal, Picklist, Option, RenderIf, Input } from 'react-rainbow-components';
import { ProductListProp, ProductListView } from '../kasir/ProductListView';
import './Checkout.css'
import NumberFormat from 'react-number-format';
import debounce from 'lodash.debounce';
import { getApi, productApiFilterBarcode } from '../../data/RemoteData';
import { Product } from '../../data/AppDatabase';
import { PickOptions } from './CheckoutBayar';
import { doSales } from '../../data/sales/SalesData';

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

  const [isOpen, setIsOpen] = useState(false);

  let initOptions: any[] = []

  const [options, setOptions] = useState(initOptions);

  const [productDiscount, setProductDiscount] = useState()

  function onDiscountSubmit() {
    if (productDiscount == undefined) {
      return
    }
    let product: Product = productDiscount
    if (tipeDiskon.name == "option 1") {
      console.log("teaweawe")
      let discount = product.harga - (product.harga * (discountPercent / 100))
      cart.updateDiscount(discount, product)
    } else if (tipeDiskon.name == "option 2"
      && discountCash != null) {

    }
  }

  const cariBarangInput = useRef(null)

  function requestFocusCariBarang() {
    cariBarangInput.current.focus()
  }

  let tipeDiskonOptionInit: PickOptions = {
    name: 'option 1', label: 'Persen'
  }

  const [tipeDiskon, setTipeDiskon] = useState(tipeDiskonOptionInit)

  const [discountPercent, setDiscountPercent] = useState()

  const [discountCash, setDiscountCash] = useState()

  function checkSearchbarcode(barcode: string) {
    if (barcode.length > 0) {
      searchProduct(barcode)
    }
  }

  function sales(){
    doSales(() => {

    }, () => {

    })
  }

  useEffect(() => {
    requestFocusCariBarang()
    // setIsOpen(true)
    sales()
  }, [])

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

  const containerStyles = {
    width: 200,
  };

  return (
    <Card className="rainbow-m-around_large rainbow-p-around_large">
      <div>
        <div className="rainbow-flex rainbow-flex_column rainbow-align_end rainbow-m-bottom_small">
          <div className="rainbow-flex rainbow-flex_column rainbow-align_center">
            <span className="heading1">Total Pembelian</span>
            <NumberFormat value={cart.getSubtotalWithDiscount()} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value: any) => {
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
            ref={cariBarangInput}
          />
        </div>

        <div className="productList">
          <ProductListView
            setProductDiscount={setProductDiscount}
            setIsOpen={setIsOpen}
            productList={cart.getProductList()}
            setCart={(cart: Cart) => {
              setCart(cart);
            }}
            cart={cart} />
        </div>

        <div className="rainbow-flex rainbow-flex_column rainbow-align_end">
          <Input
            label="Kode Diskon"
            type="text"
            className="rainbow-p-around_medium"
            style={containerStyles}
          // value={discountPercent}
          // onChange={(event: any) => {
          //   let value = event.target.value
          //   if (+value < 1 || +value > 100) {
          //     setDiscountPercent(null)
          //   } else {
          //     setDiscountPercent(value)
          //   }
          // }}
          // onKeyDown={(it: any) => {
          //   if (it.key == 'Enter') {
          //     onSubmit();
          //   }
          // }}
          />
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

        <InputDiscountModalView
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          discountCash={discountCash}
          setDiscountCash={setDiscountCash}
          tipeDiskon={tipeDiskon}
          setTipeDiskon={setTipeDiskon}
          onDiscountSubmit={onDiscountSubmit}
        />

      </div>
    </Card>
  );
};

export const InputDiscountModalView: React.FC<any> = (props: any) => {

  const { isOpen, setIsOpen,
    discountPercent, setDiscountPercent,
    discountCash, setDiscountCash,
    tipeDiskon, setTipeDiskon,
    onDiscountSubmit } = props

  const [errorPercent, setErrorPercent] = useState("")

  const [errorCash, setErrorCash] = useState("")

  useEffect(() => {
    if (discountCash == null || discountCash.length == 0) {
      setErrorCash("Tidak Boleh Kosong")
    } else {
      setErrorCash("")
    }
  }, [discountCash])

  useEffect(() => {
    if (discountPercent == null || discountPercent.length == 0) {
      setErrorPercent("Diskon antara 1 - 100%")
    } else {
      setErrorPercent("")
    }
  }, [discountPercent])

  function handleOnClose() {
    return setIsOpen(false)
  }

  function isTipeSelected(tipe: string) {
    return tipeDiskon.name == tipe
  }

  const diskonCashInput = useRef(null)

  function onSubmit() {
    if (tipeDiskon.name == "option 1" && discountPercent == null) {
      setErrorPercent("Tidak Boleh Kosong")
      setErrorCash("")
    } else if (tipeDiskon.name == "option 2" && discountCash == null) {
      setErrorCash("Tidak Boleh Kosong")
      setErrorPercent("")
    } else {
      setErrorCash("")
      setErrorPercent("")
      handleOnClose()
      onDiscountSubmit()
    }
  }

  const containerStyles = {
    width: 300,
  };

  return (
    <div>
      <Modal id="modal-1" isOpen={isOpen} onRequestClose={handleOnClose} size="medium">
        <div className="rainbow-flex rainbow-flex_column rainbow-align_center rainbow-p-around_large">
          <h1>Pilih Tipe Diskon</h1>
          <Picklist
            className="rainbow-m-bottom_medium widthmax"
            id="picklist-1"
            style={containerStyles}
            onChange={value => setTipeDiskon({
              name: value.name,
              label: value.label
            })}
            value={tipeDiskon}
            label="Pilih Tipe Diskon"
            hideLabel
          >
            <Option name="header" label="Tipe Diskon" variant="header" />
            <Option name="option 1" label="Persen" />
            <Option name="option 2" label="Cash" />
          </Picklist>

          <RenderIf isTrue={isTipeSelected("option 1")}>
            <Input
              style={containerStyles}
              error={errorPercent}
              label="Masukan Persen Diskon"
              placeholder="1 - 100%"
              type="number"
              className="rainbow-p-around_medium"
              value={discountPercent}
              onChange={(event: any) => {
                let value = event.target.value
                if (+value < 1 || +value > 100) {
                  setDiscountPercent(null)
                } else {
                  setDiscountPercent(value)
                }
              }}
              onKeyDown={(it: any) => {
                if (it.key == 'Enter') {
                  onSubmit();
                }
              }}
            />
          </RenderIf>

          <RenderIf isTrue={isTipeSelected("option 2")}>
            <NumberFormat
              style={containerStyles}
              error={errorCash}
              className="rainbow-m-bottom_medium widthmax"
              value={discountCash}
              thousandSeparator={true}
              prefix={'Rp. '}
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                if (+value <= 0) {
                  setDiscountCash(null)
                } else {
                  setDiscountCash(+value)
                }
              }}
              renderText={value => <div>{value}</div>}
              customInput={Input}
              getInputRef={diskonCashInput}
              onKeyDown={(it: any) => {
                if (it.key == 'Enter') {
                  onSubmit();
                }
              }}
            />
          </RenderIf>

        </div>
      </Modal>
    </div>
  )
}


