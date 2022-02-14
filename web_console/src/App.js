import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import './App.css';
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
        <div className="flex flex-col">
            <div className="flex-grow-0">
                {!webSiteInfo && <div>Loading....</div>}
                {webSiteInfo && <Router>
                    <Switch>
                        <Route path="/api"><APISwitcher webSiteName={webSiteInfo.websiteName}/></Route>
                        <Route path="/">
                            <CommonHome {...webSiteInfo}/>
                        </Route>

                    </Switch>
                </Router>}
            </div>
            <div className="flex-grow"></div>
            {
                webSiteInfo && <div className="flex-grow-0 h-12 text-center">{webSiteInfo.icp}</div>
            }
        </div>

    );
}

export default App;
