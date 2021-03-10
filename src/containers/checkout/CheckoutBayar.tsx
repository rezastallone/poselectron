import React, { useEffect, useState } from 'react';
import { Button, Column, TableWithBrowserPagination } from 'react-rainbow-components';
import { ProductListProp } from '../kasir/ProductListView';
import { RupiahTextView } from '../kasir/RupiahTextView';
import { Input } from 'react-rainbow-components';
import { Picklist, Option, RenderIf } from 'react-rainbow-components';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import './Checkout.css'
import { GenericActionView } from '../kasir/GenericActionView';
import { PaymentMethod } from './CheckoutView';

interface PaymentOptions {
  name: string | undefined | number
  label: string | undefined
}

export const CheckoutBayar: React.FC<any & ProductListProp> = (props: any) => {

  const { paymentMethods, setPaymentMethods } = props

  const { cart, onBayar, onBatal } = props;

  const inputStyles = {
    width: 300,
  };

  const containerStyles = {
    width: '200px',
  };

  let initPaymentOption: PaymentOptions = {
    name: 'option 1', label: 'Cash'
  }

  const [paymentId, setPaymentId] = useState(1)

  const [paymentOption, setPaymentOption] = useState(initPaymentOption)

  const [uangDiterima, setUangDiterima] = useState(0);

  const [cardNumber, setCardNumber] = useState("");

  const [hasCardNumber, setHasCardNumber] = useState(false);

  const [hasUangDiterima, setHasUangDiterima] = useState(false);

  const [isCard, setIsCard] = useState(true)

  const [isCash, setIsCash] = useState(true)

  useEffect(() => {
    setIsCash(paymentOption.name == "option 1")
    setIsCard(paymentOption.name == "option 2")
  }, [paymentOption])

  useEffect(() => {
    setHasUangDiterima(uangDiterima > 0)
  }, [uangDiterima])

  useEffect(() => {
    setHasCardNumber(cardNumber.length > 0)
  }, [cardNumber])

  function addPaymentMethod() {
    let paymentMethod: PaymentMethod = {
      id: incrimentPaymentMethod(),
      type: 1,
      total: uangDiterima,
      cardNumber: ""
    }

    if (isCard) {
      paymentMethod.type = 2
      paymentMethod.cardNumber = cardNumber
    }

    paymentMethods.push(paymentMethod)
    setPaymentMethods([...paymentMethods])
    setUangDiterima(0)
    setCardNumber("")
  }
  function incrimentPaymentMethod(): string {
    let id = +paymentId + +1
    setPaymentId(id)
    return id.toString()
  }

  function bayarUangPas() {
    let paymentMethod: PaymentMethod = {
      id: incrimentPaymentMethod(),
      type: 1,
      total: cart.getSubtotal(),
      cardNumber: ""
    }

    paymentMethods.push(paymentMethod)
    setPaymentMethods([...paymentMethods])
    setUangDiterima(0)
    setCardNumber("")
  }

  function calculatePaymentTotal() {
    let total = 0
    paymentMethods.forEach((value: PaymentMethod, i: number) => {
      total += +value.total
    })
    return total
  }

  function canAddPaymentMethod() {
    if (isCard) {
      return hasCardNumber && hasUangDiterima
    } else {
      return hasUangDiterima
    }
  }

  function isCanPay() {
    return calculatePaymentTotal() >= cart.getSubtotal()
  }

  function calculateKembalian() {
    let kembalian = +calculatePaymentTotal() - +cart.getSubtotal()
    if (kembalian > 0){
        return kembalian
    } else {
      return 0
    }
  }

  function getTypeString(type:string){
    if (type == "1" ){
      return "Cash"
    } else {
      return "Card"
    }
  }

  return (
    <div>
      <div className="rainbow-flex rainbow-flex_row rainbow-align-content_space-between rainbow-p-around_small">

        <div className="rainbow-flex rainbow-flex_column rainbow-align_start">
          <span className="heading2">Total Tagihan</span>
          <NumberFormat value={cart.getSubtotal()} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value: any) => {
            return (<div className="heading1">{value}</div>)
          }} />
        </div>

        <div className="rainbow-flex rainbow-flex_column rainbow-align_end">
          <span className="heading2">Total Bayar</span>
          <NumberFormat value={calculatePaymentTotal()} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value: any) => {
            return (<div className="heading1">{value}</div>)
          }} />
        </div>
      </div>

      <div className="rainbow-flex rainbow-flex_row rainbow-align_start paymentWrapper rainbow-m-vertical_medium rainbow-p-vertical_small">
        <div className="rainbow-flex rainbow-flex_column rainbow-align_center paymentAdd rainbow-p-right_small">

          <h1> Pilih Opsi Pembayaran </h1>
          <Picklist
            className="rainbow-m-bottom_medium widthmax"
            id="picklist-1"
            style={containerStyles}
            onChange={value => setPaymentOption({
              name: value.name,
              label: value.label
            })}
            value={paymentOption}
            label="Pilih Metode Pembayaran"
            hideLabel
          >
            <Option name="header" label="Opsi Pembayaran" variant="header" />
            <Option name="option 1" label="Cash" />
            <Option name="option 2" label="Card" />
          </Picklist>

          <h1>Masukan Jumlah Pembayaran</h1>
          <NumberFormat
            className="rainbow-m-bottom_medium widthmax"
            value={uangDiterima}
            thousandSeparator={true}
            prefix={'Rp. '}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setUangDiterima(+value)
            }}
            renderText={value => <div>{value}</div>}
            customInput={Input}
          />

          <div className="rainbow-m-bottom_medium">
            <RenderIf isTrue={isCard} >
              <Input
                className="widthmax"
                label="Masukan Struk EDC"
                placeholder="Contoh 'BCA 1234923812752'"
                type="text"
                value={cardNumber}
                onChange={(event: any) => {
                  setCardNumber(event.target.value)
                }}
                style={inputStyles}
              />
            </RenderIf>
          </div>

          <div className="rainbow-m-bottom_medium widthmax">
            <RenderIf isTrue={isCash} >
              <Button
                className="widthmax"
                onClick={() => { bayarUangPas() }}
              >
                Uang Pas
            </Button>
            </RenderIf>
          </div>

          <Button
            variant="brand"
            className="widthmax"
            onClick={() => { addPaymentMethod() }}
            disabled={!canAddPaymentMethod()}
          >
            Tambah Pembayaran
          </Button>
        </div>

        <div className="paymentList rainbow-flex_column rainbow-align_end">
          <TableWithBrowserPagination variant="listview" pageSize={20} data={paymentMethods} keyField="id">
            <Column header="Tipe" field="type" component={(data: any) => (
              getTypeString(data.row.type)
            )}/>

            <Column header="No. Kartu" field="cardNumber" />
            <Column header="Total" component={(data: any) => (
              <RupiahTextView harga={data.row.total} />
            )} />
            <Column header="Aksi" component={(data: any) => (
              <GenericActionView
                enableAdd={false}
                enableRemove={true}
                remove={() => {
                  console.log("remove " + data.row)
                  setPaymentMethods(paymentMethods.filter(value => value.id != data.row.id))
                }}
              />

            )} />

          </TableWithBrowserPagination>

          <span className="heading2">Total Kembalian</span>
          <NumberFormat value={calculateKembalian()} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={(value: any) => {
            return (<div className="heading1">{value}</div>)
          }} />

        </div>
      </div>
      <div className="rainbow-align-content_space-between">
        <Button
          onClick={() => { onBatal() }}
        >
          Batal
        </Button>

        <Button
          onClick={() => { onBayar() }}
          disabled={!isCanPay()}
        >
          Bayar
        </Button>
      </div>
    </div>
  );
};

