import { getAsset } from './PathUtil'

let dir = getAsset(["img_test.png"])
const { PosPrinter } = require('electron').remote.require("electron-pos-printer");

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

export function testPrint() {
    try {        
        const options = {
            preview: false, // Preview in window or print
            width: "170px", //  width of content body
            margin: "0 0 0 0", // margin of content body
            copies: 1, // Number of copies to print
            printerName: "Printer_Sawah", // printerName: string, check it at webContent.getPrinters()
            timeOutPerLine: 5000,
            silent: true,
        };

        const now = {
            type: "text",
            value: "aaaaa",
            style: `text-align:center;`,
            css: { "font-size": "12px", "font-family": "sans-serif" },
        };

        const d = [...data, now];

        PosPrinter.print(d, options)
            .then(() => { })
            .catch((error: any) => {
                alert(error)
            });
    } catch (e) {
        alert(e)
    }
}