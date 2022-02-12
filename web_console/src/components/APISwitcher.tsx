import React from 'react';
import {Route, useHistory, Switch} from "react-router-dom";
import APIBar from "./api_main/APIBar";
import './APIMain.css'
import APIViewer from "./APIViewer";
import {APINavSwitcher} from "../router/APINavSwitcher";
import APIList from "./APIList";


export default function APISwitcher() {
    const history = useHistory()
    return (<div>
        <APIBar></APIBar>
        <Switch>
            <Route path="/api/list">
                <APIList/>
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