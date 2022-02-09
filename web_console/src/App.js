import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {APIViewSwitcher} from './router/APIViewSwitcher';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import APITest from "./components/APITest";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/test">
                        <APITest name={"wow"}/>
                    </Route>
                    <Route path="/"><APIViewSwitcher app={this}></APIViewSwitcher></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
