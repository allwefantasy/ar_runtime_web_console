import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {APIViewSwitcher} from './router/APIViewSwitcher';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {CommonHome} from "./components/CommonHome";
import {ActionProxy} from "./service/ActionProxy";
import APISwitcher from "./components/APISwitcher";


function App() {

    const [webSiteInfo, setWebSiteInfo] = useState(null)

    let getWebsiteInfo = async () => {
        const proxy = new ActionProxy()
        const res = await proxy.get("/home/public/get", {})
        setWebSiteInfo(res.content)
    }

    useEffect(() => {
        getWebsiteInfo()
    }, [])

    return (
        <div className="App">
            {!webSiteInfo && <div>Loading....</div>}
            {webSiteInfo && <Router>
                <Switch>
                    <Route path="/api"><APISwitcher/></Route>
                    <Route path="/">
                        <CommonHome {...webSiteInfo}/>
                    </Route>

                </Switch>
            </Router>}
        </div>

    );
}

export default App;
