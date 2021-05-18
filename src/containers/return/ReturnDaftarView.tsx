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

export const ReturnDaftarView: React.FC<any> = (props: any) => {

    const [barcodeSearch, setBarcodeSearch] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    let initOptions: any[] = []

    const [options, setOptions] = useState(initOptions);

    const cariBarangInput = useRef(null)

    // function requestFocusCariBarang() {
    //     cariBarangInput.current.focus()
    // }

    function checkSearchbarcode(barcode: string) {
        if (barcode.length > 0) {
            searchProduct(barcode)
        }
    }

    // useEffect(() => {
    //     requestFocusCariBarang()
    // }, [])

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
                    <div className="rainbow-flex rainbow-flex_column rainbow-align_end">
                        <Button
                            className="rainbow-m-top_small rainbow-m-horizontal_large"
                            size="large"
                            variant="success"
                            onClick={() => {
                                props.toTambah()
                            }}
                        >
                            Tambah Retur Barang
                    </Button>
                    </div>

                    {/* <Lookup
                        id="lookup-1"
                        label="Cari Barang"
                        placeholder="Masukan nama barang atau kode barcode"
                        options={options}
                        isLoading={isLoading}
                        onChange={(item: any) => {
                            if (item.value) {
                                let exist = false
                                productList.every((value) => {
                                    if (value.barcode == item.value.barcode){
                                        exist = true;
                                        return false
                                    }
                                    return true;
                                })
                                if (!exist){
                                    setProductList([...productList, item.value])
                                }
                            }
                        }
                        }
                        onSearch={(keyword) => {
                            setIsLoading(true);
                            setBarcodeSearch(keyword)
                        }}
                        ref={cariBarangInput}
                    /> */}
                </div>

                <div className="rainbow-m-bottom_xx-large">
                    <TableWithBrowserPagination pageSize={100} data={props.returList} keyField="barcode">
                        <Column header="Tanggal" field="tanggal" defaultWidth="130" />
                        <Column header="Status" field="status" />
                        <Column header="Keterangan" field="keterangan" />

                        {/* <Column header="Harga" component={(data: any) => (
                            <RupiahTextView harga={data.row.harga} />
                        )} /> */}

                        {/* <Column header="Aksi" defaultWidth="300" component={(data: any) => (
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
                        )} /> */}

                    </TableWithBrowserPagination>
                </div>

            </div>
        </Card>
    );
};

