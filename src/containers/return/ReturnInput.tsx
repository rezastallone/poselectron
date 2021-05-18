import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cart } from '../kasir/Cart';
import { Button, Card, Column, Lookup, TableWithBrowserPagination } from 'react-rainbow-components';
import { ProductListProp, ProductListView } from '../kasir/ProductListView';
import NumberFormat from 'react-number-format';
import debounce from 'lodash.debounce';
import { getApi, productApiFilterBarcode } from '../../data/RemoteData';
import { Product } from '../../data/AppDatabase';
import { RupiahTextView } from '../kasir/RupiahTextView';
import { ProductActionView } from '../kasir/ProductActionView';
import { Retur } from './ReturnView';

interface OptionProduct {
    label?: ReactNode
    description?: ReactNode
    icon?: ReactNode
    value?: Product
};


export const ReturnInput: React.FC<any & ProductListProp> = (props: any) => {

    const [barcodeSearch, setBarcodeSearch] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    let initOptions: any[] = []

    const [options, setOptions] = useState(initOptions);

    let initProductList: Product[] = []

    const [productList, setProductList] = useState(initProductList)

    const cariBarangInput = useRef(null)

    function requestFocusCariBarang() {
        cariBarangInput.current.focus()
    }

    function checkSearchbarcode(barcode: string) {
        if (barcode.length > 0) {
            searchProduct(barcode)
        }
    }

    useEffect(() => {
        requestFocusCariBarang()
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

    return (
        <Card className="rainbow-m-around_large rainbow-p-around_large">
            <div>
                <div className="rainbow-m-around_large">
                    <Lookup
                        id="lookup-1"
                        label="Cari Barang"
                        placeholder="Masukan Nota Pembelian"
                        options={options}
                        isLoading={isLoading}
                        onChange={(item: any) => {
                            let list = [...initReturnProducts]
                            setProductList(list)    
                            // if (item.value) {
                            //     let exist = false
                            //     productList.every((value) => {
                            //         if (value.barcode == item.value.barcode){
                            //             exist = true;
                            //             return false
                            //         }
                            //         return true;
                            //     })
                            //     if (!exist){
                            //         setProductList([...productList, item.value])
                            //     }
                            // }
                        }
                        }
                        onSearch={(keyword) => {
                            setIsLoading(true);
                            setBarcodeSearch(keyword)
                        }}
                        ref={cariBarangInput}
                    />
                </div>

                <div className="rainbow-m-bottom_xx-large">
                    <TableWithBrowserPagination pageSize={100} data={productList} keyField="barcode">
                        <Column header="Barcode" field="barcode" defaultWidth="130" />
                        <Column header="Deskripsi" field="description" />
                        <Column header="Harga" component={(data: any) => (
                            <RupiahTextView harga={data.row.harga} />
                        )} />

                        <Column header="Aksi" defaultWidth="300" component={(data: any) => (
                            <ProductActionView
                                enableAdd={false}
                                enableRemove={false}
                                enableCount={false}
                                count={0}
                                row={data.row}
                                clearProduct={() => {
                                    productList.every((value, index) => {
                                        if (value.barcode == data.row.barcode){
                                            productList.splice(index, 1)
                                            return false
                                        }
                                        return true
                                    })
                                    setProductList([...productList])
                                }}
                            />
                        )} />
                    </TableWithBrowserPagination>
                </div>

                <div className="rainbow-flex rainbow-flex_column rainbow-align_end">
                    <Button
                        onClick={() => {
                            let today = new Date().toLocaleDateString()
                            let retur: Retur = {
                                tanggal: today,
                                status: 'Diproses',
                                keterangan: 'Return ' + productList.length + ' Barang',
                            }
                            props.setReturList([...props.returList, retur])
                            props.toDaftar()
                        }}
                        className="rainbow-m-top_small rainbow-m-horizontal_large"
                        size="large"
                        variant="success"
                    >
                        Konfirmasi
          </Button>
                </div>

            </div>
        </Card>
    );
};


let initReturnProducts: Product[] = [
    {
        id: 1,
        description: "Baju baru iqma",
        harga: 300000,
        barcode: 6543,
        diskon: 0
    },
    {
        id: 2,
        description: "Krudung cinta fitri",
        harga: 200000,
        barcode: 4321,
        diskon: 0
    },
    {
        id: 3,
        description: "Krudung ikatan cinta",
        harga: 150000,
        barcode: 123,
        diskon: 0
    },
    {
        id: 4,
        description: "Baju Batik",
        harga: 50000,
        barcode: 4123124,
        diskon: 0
    },
    {
        id: 5,
        description: "Celana",
        harga: 20000,
        barcode: 12312,
        diskon: 0
    }
]
