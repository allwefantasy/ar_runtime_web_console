import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {APIViewSwitcher} from './router/APIViewSwitcher';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import CommonHome from "./components/CommonHome";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/api"><APIViewSwitcher app={this}></APIViewSwitcher></Route>
                    <Route path="/">
                        <CommonHome name={"wow"}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
