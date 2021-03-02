import React, { useEffect, useState } from 'react'
import { ProductListProp } from '../kasir/ProductListView'
import path from 'path';
import { Button, RadioGroup, RenderIf } from 'react-rainbow-components';
import { testPrint } from '../../PrinterUtil';


interface RadioValue {
  value: string,
  label: string
}

export const CheckoutStruk: React.FC<any & ProductListProp> = (props: any) => {

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
        setRadioValue(value.displayName)
      }
      options.push({ value: value.displayName, label: value.displayName })
    })
    setRadioValues(options)
  }, [])

  function checkHasPrinter() {
    setHasPrinter(webContents.getPrinters().length > 0)
  }


  return (
    <div>

      { __dirname.substring(0, __dirname.lastIndexOf('/')) + '/assets/receit.html'  }

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
        testPrint()
      }}>
        print
      </Button>
    </div>
  )
}

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
    path: path.join(__dirname, "assets/img_test.png"), // file path
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
    y.substr(-2) +
    ":" +
    z.substr(-2) +
    ":" +
    s.substr(-2) +
    " -  " +
    h.substr(-2) +
    "/" +
    meses[ms]
  );
}
