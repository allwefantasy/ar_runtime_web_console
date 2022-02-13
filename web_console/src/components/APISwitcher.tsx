import React from 'react';
import {Route, useHistory, Switch, useLocation} from "react-router-dom";
import APIBar from "./api_main/APIBar";
import './APIMain.css'
import APIViewer from "./APIViewer";
import {APINavSwitcher} from "../router/APINavSwitcher";
import APIList from "./APIList";
import queryString from "query-string";

export type SwitcherProps = {
    webSiteName: string
}

export default function APISwitcher(props: SwitcherProps) {
    const history = useHistory()
    const location = useLocation()
    const extra_params = queryString.parse(location.search) || {}
    const current_action = extra_params.action
    return (<div>
        <APIBar {...props}></APIBar>
        <Switch>
            <Route path="/api/list">
                <APIList/>
            </Route>
            <Route path="/api/view">
                <APIViewer key={current_action as string} action={current_action as string}/>
            </Route>
            <Route path="/api">
                <APINavSwitcher router={history}></APINavSwitcher>
            </Route>
        </Switch>
    </div>)
}