import React from 'react';
import {Route, useHistory, Switch} from "react-router-dom";
import APIBar from "./api_main/APIBar";
import APIMain from "./APIMain";
import RemoteAction from "../service/RemoteAction";
import APIViewer from "./APIViewer";
import {APINavSwitcher} from "../router/APINavSwitcher";


export default function APISwitcher() {
    const history = useHistory()
    return (<div>
        <APIBar></APIBar>
        <Switch>
            <Route path="/api/list">
                <APIMain router={history} action={RemoteAction.LIST_ACTIONS}></APIMain>
            </Route>
            <Route path="/api/view">
                <APIViewer/>
            </Route>
            <Route path="/api">
                <APINavSwitcher router={history}></APINavSwitcher>
            </Route>
        </Switch>
    </div>)
}