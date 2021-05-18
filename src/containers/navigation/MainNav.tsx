import React, { useEffect, useState } from 'react';
import { MdShoppingCart, MdLocalShipping } from 'react-icons/md';
import { SidebarItem, Sidebar } from 'react-rainbow-components';
import { useHistory } from "react-router-dom";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { clearUserAndCabang } from '../../data/auth/AuthData';
import { KasirView } from '../kasir/KasirView';
import { ReturnView } from '../return/ReturnView';
import './MainNav.css'

const StyledContainer = styled.div.attrs(props => {
    return props.theme.rainbow.palette;
})`
    width: 220px;
    background: ${props => props.background.main};
    border-bottom-left-radius: 0.875rem;
    border-right: 1px solid ${props => props.border.divider};
`;

export const SimpleVerticalNavigation: React.FC<any> = (props: any) => {

    const [selectedItem, setSelectedItem] = useState("penjualan")
    const history = useHistory();
    let { path, url } = useRouteMatch();

    function handleOnSelect(event: React.MouseEvent<HTMLElement, MouseEvent>, name: string) {
        return setSelectedItem(name)
    }

    return (
        <div >
            <div className="react-rainbow-admin-app_sidebar-container" >
                <Sidebar
                    selectedItem={selectedItem}
                    onSelect={handleOnSelect}
                    className="react-rainbow-admin-app_sidebar">

                    <SidebarItem
                        icon={<MdShoppingCart />}
                        className="react-rainbow-admin-app_sidebar-item"
                        name="penjualan"
                        label="Penjualan"
                        onClick={() => {
                            history.push(`${url}/penjualan`);
                        }} />

                    <SidebarItem
                        icon={<MdLocalShipping />}
                        className="react-rainbow-admin-app_sidebar-item"
                        name="returnbarang"
                        label="Retur"
                        onClick={() => {
                            history.push(`${url}/returnbarang`);
                        }} /> 

                    <SidebarItem
                        className="react-rainbow-admin-app_sidebar-item"
                        name="logout"
                        label="Logout"
                        onClick={() => {
                            clearUserAndCabang();
                            history.push(`/`);
                        }} />   
                </Sidebar>
            </div>

            <div className="react-rainbow-admin-app_router-container">
                <Switch>
                    <Route path={`${path}/returnbarang`}>
                        <ReturnView />
                    </Route>
                    <Route path={`${path}/penjualan`}>
                        <KasirView />
                    </Route>
                    <Route>
                        <Redirect to={`${path}/penjualan`} />
                    </Route>
                </Switch>
            </div>

        </div>
    );
}