import React from 'react';
import APIView from '../components/APIView';
import APIMain from '../components/APIMain';
import RemoteAction from '../service/RemoteAction';
import {APINavSwitcher} from '../router/APINavSwitcher'
import {BaseRouter} from './BaseRouter'
import APIBar from "../components/api_main/APIBar";
import queryString from 'query-string';

export class APIViewSwitcher extends BaseRouter {
    constructor(props) {
        super(props)
        const extra_params = queryString.parse(window.location.href.split("?")[1])

        const current_action = (extra_params && extra_params["action"]) || RemoteAction.LIST_ACTIONS

        let current_page = {
            page1: false,
            page2: false,
            nav: true
        }

        if (extra_params && extra_params["action"]) {
            current_page = {
                page1: false,
                page2: true,
                nav: false
            }
        }

        this.state = {
            ...current_page,
            current_action,
            refresh: 0,
            extra_params
        }
        this.toPage1 = this.toPage1.bind(this)
        this.toAction = this.toAction.bind(this)
        this.toNav = this.toNav.bind(this)
        this.popPage = this.popPage.bind(this)

        this.pages = [{func: this.toPage1, params: []}]
    }

    toPage1 = () => {
        this.pages.push({func: this.toPage1, params: []})
        this.setState({page1: true, page2: false, nav: false,})
    }

    toAction = (action) => {
        this.pages.push({func: this.toAction, params: [action]})
        this.setState({page1: false, page2: true, nav: false, current_action: action})
    }

    toNav = () => {
        this.pages.push({func: this.toNav, params: []})
        this.setState({page1: false, page2: false, nav: true})
    }

    refreshBar = () => {
        this.setState({refresh: this.state.refresh + 1})
    }

    render() {
        return <div><APIBar router={this}></APIBar>
            {this.state.page1 && <div>
                <APIMain router={this} action={RemoteAction.LIST_ACTIONS}></APIMain>
            </div>
            }
            {this.state.page2 && <div>
                <APIView router={this} key={this.state.current_action} extra_params={this.state.extra_params} action={this.state.current_action}></APIView>
            </div>
            }
            {this.state.nav && <div>
                <APINavSwitcher router={this} app={this.app}></APINavSwitcher>
            </div>
            }
        </div>

    }
}