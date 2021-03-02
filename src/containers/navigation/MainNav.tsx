import React, { useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { SidebarItem, Sidebar, VerticalNavigation, VerticalSection, VerticalItem } from 'react-rainbow-components';
import { useHistory } from "react-router-dom";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from 'styled-components';
import { KasirView } from '../kasir/KasirView';
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

    useEffect(() => {
        history.push(`${url}/penjualan`)
    }, [])

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
                        onClick={() => history.push(`${url}/penjualan`)} />
                </Sidebar>
            </div>

            <div className="react-rainbow-admin-app_router-container">
                <Switch>
                    <Route path={`${path}/penjualan`}>
                        <KasirView />
                    </Route>
                    <Route path={`${path}/mymeeting`}>
                        (
                            <h1>Second Tab</h1>
                        )
                    </Route>
                </Switch>
            </div>

        </div>
    );
}