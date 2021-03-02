import React, { useEffect, useState } from 'react'
import { ProductListProp } from '../kasir/ProductListView'
import { Button, RadioGroup, RenderIf } from 'react-rainbow-components';
import { PaymentMethod } from './CheckoutView';
import { getAsset } from '../../PathUtil';
import { Cart } from '../kasir/Cart';
const { PosPrinter } = require('electron').remote.require("electron-pos-printer");

let dir = getAsset(["img_test.png"])

interface RadioValue {
  value: string,
  label: string
}

interface StrukProps {
  paymentMethods: PaymentMethod[]
}

export const CheckoutStruk: React.FC<any & ProductListProp & StrukProps> = (props: any & ProductListProp & StrukProps) => {

  let paymentMethods: PaymentMethod[] = props.paymentMethods

  let cart: Cart = props.cart

  let { remote } = require("electron");

  let webContents = remote.getCurrentWebContents();

  const [hasPrinter, setHasPrinter] = useState(false)

  const [radioValue, setRadioValue] = useState("")

  let radioValuesInit: RadioValue[] = []

  const [radioValues, setRadioValues] = useState(radioValuesInit)

  function handleOnChange(event: any) {
    return setRadioValue(event.target.value)
  }

  useEffect(() => {
    checkHasPrinter()
    let options: RadioValue[] = []
    webContents.getPrinters().forEach((value, index) => {
      if (index == 0) {
        setRadioValue(value.name)
      }
      options.push({ value: value.name, label: value.displayName })
    })
    setRadioValues(options)
  }, [])

  function checkHasPrinter() {
    setHasPrinter(webContents.getPrinters().length > 0)
  }


  return (
    <div>

      <RenderIf isTrue={!hasPrinter}>
        <label>Tidak Ada Printer</label>
      </RenderIf>

      <RenderIf isTrue={hasPrinter}>
        <RadioGroup
          id="radio-group-component-1"
          options={radioValues}
          value={radioValue}
          onChange={handleOnChange}
          label="Pilih Printer"
        />
      </RenderIf>

      <Button onClick={() => {
        testPrint(radioValue)
      }}>
        print
      </Button>
    </div>
  )

  const data = [
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "||---",
      style: `text-align:left;`,
      css: { "font-size": "12px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "HEADER",
      style: `text-align:center;`,
      css: { "font-weight": "700", "font-size": "18px" },
    },
    {
      type: "image",
      path: dir, // file path
      position: "center", // position of image: 'left' | 'center' | 'right'
      width: "auto", // width of image in px; default: auto
      height: "60px", // width of image in px; default: 50 or '50px'
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value:
        "Lorem ipsum<br><br> . , ; : ( ) - + = ! # % \" ' <br><br> ã Ã ç Ç $ & @ ê Ê í Í<br><br> 0 1 2 3 4 5 6 7 8 9 <br>a b c d e f g h i j k l m n o p q r s t u v w x y z<br>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br><br><hr><br>elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \n ullamco \n laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum<br>",

      css: {
        "font-size": "12px",
        "font-family": "sans-serif",
        "text-align": "center",
      },
    },
    {
      type: "barCode", // Do you think the result is ugly? Me too. Try use an image instead...
      value: "HB4587896",
      height: 12,
      width: 1,
      displayValue: true, // Display value below barcode
      fontsize: 8,
    },
    {
      type: "qrCode",
      value: "https://github.com/fssonca",
      height: 80,
      width: 80,
      style: "margin-left:50px",
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "---||",
      style: `text-align:right;`,
      css: { "font-size": "12px" },
    },
  ];

  function date() {
    const x = new Date();

    const y = "0" + x.getHours();
    const z = "0" + x.getMinutes();
    const s = "0" + x.getSeconds();
    const h = "0" + x.getDate();
    const ano = x.getFullYear().toString().substr(-2);
    const ms = x.getMonth();
    const meses = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      h.substr(-2) + " " + meses[ms] + " " + ano + " " + y.substr(-2) +
      ":" +
      z.substr(-2) +
      ":" +
      s.substr(-2) 
    )
  }

  function testPrint() {
    try {
      let tableBody: [number, number][] = []
      let total: number = 0

      paymentMethods.forEach(value => {
        tableBody.push([value.type, value.total])
        total = +total + +value.total
      });

      const printData = [
        // {
        //   type: 'image',
        //   path: dir,     // file path
        //   position: 'center',                                  // position of image: 'left' | 'center' | 'right'
        //   width: '60px',                                           // width of image in px; default: auto
        //   height: '60px',                                          // width of image in px; default: 50 or '50px'
        // }, 
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: 'Payment Resume Report',
          style: `text-align:center;`,
          css: { "font-weight": "700", "font-size": "14px" }
        },
        {
          type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
          value: 'TOKO CABANG HAWAI',
          style: `text-align:center;`,
          css: { "font-weight": "700", "font-size": "18px" }
        }, {
          type: 'table',
          // style the table
          style: 'border: 1px solid #ddd',
          // list of the columns to be rendered in the table header
          tableHeader: ['Metode', 'Bayar'],
          // multi dimensional array depicting the rows and columns of the table body
          tableBody: tableBody,
          // list of columns to be rendered in the table footer
          tableFooter: ['Total', total],
          // custom style for the table header
          tableHeaderStyle: 'background-color: white; color: #000;',
          // custom style for the table body
          tableBodyStyle: 'border: 0.5px solid white',
          // custom style for the table footer
          tableFooterStyle: 'background-color: white; color: #000;',
        },
      ]

      const options = {
        preview: false, // Preview in window or print
        width: "250px", //  width of content body
        margin: "0 0 0 0", // margin of content body
        copies: 1, // Number of copies to print
        printerName: radioValue, // printerName: string, check it at webContent.getPrinters()
        timeOutPerLine: 5000,
        silent: true,
      };

      const now = {
        type: "text",
        value: "Date Printed : " + date(),
        style: `text-align:center;`,
        css: { "font-size": "10px", "font-family": "sans-serif" },
      };

      // const d = [...data, now];
      const d = [...printData, now];

      PosPrinter.print(d, options)
        .then(() => { })
        .catch((error: any) => {
          alert(error)
        });
    } catch (e) {
      alert(e)
    }
  }
}
