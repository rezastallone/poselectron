import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProductListProp } from '../kasir/ProductListView';
import { useHistory } from "react-router-dom";
import { ReturnInput } from './ReturnInput';
import { ReturnDaftarView } from './ReturnDaftarView';

export interface Retur {
    tanggal: string,
    status: string,
    keterangan: string,
}

export const ReturnView: React.FC<any & ProductListProp> = (props: any) => {

    let { url, path } = useRouteMatch();

    const history = useHistory();

    let returInitList: Retur[] = []

    const [returList, setReturList] = useState(returInitList)

    return (
        <div>
            <Switch>
                <Route
                    path={`${path}/tambah`}
                >
                    <ReturnInput
                        toDaftar={() => {
                            history.push(`${url}/daftar`);
                        }}
                        setReturList={setReturList}
                        returList={returList}
                    />
                </Route>
                <Route
                >
                    <ReturnDaftarView
                        toTambah={() => {
                            history.push(`${url}/tambah`);
                        }}
                        setReturList={setReturList}
                        returList={returList}
                    />
                </Route>
            </Switch>
        </div>
    )
}
