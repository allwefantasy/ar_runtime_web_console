import React from 'react'
import {ActionProxy} from '../service/ActionProxy'
import {FormBuilder} from './api_form/Form'
import TableView from './api_form/TableView'
import {BaseComp} from './BaseReactComp/BaseComp';
import Warning from './api_form/Warning';
import {GlobalParamNames} from '../service/Dicts';
import './APIView.css'
import {setUserInfo} from "../user/user"


export default class APIView extends BaseComp {
    constructor(props) {
        super(props)
        this.router = props.router
        if (props.submit) {
            this.submit = props.submit
        } else {
            this.submit = this.submit.bind(this)
        }

        this.state = {action: props.action}
    }

    async submit(evt) {
        evt.preventDefault()
        const proxy = new ActionProxy()
        const params = this.form.forms
        //clean empty param
        Object.keys(params).forEach(key => {
            if (!params[key]) {
                delete params[key]
            }
        })
        const res = await proxy.backend.request(this.state.action, params)
        const errorView = this.errorView
        if (res.status !== 200) {
            errorView.warn("Response error", res.content)
        }
        if (res.status === 200 && this.view) {
            try {
                if (this.state.action === "userLogin") {
                    setUserInfo(res.content[0])
                    this.router.refreshBar()
                }
                this.view.load(res.content)
            } catch (ex) {
                errorView.warn("Data can not display in table", res.content + "")
            }
        }
    }

    async componentDidMount() {
        const proxy = new ActionProxy()

        const builder = new FormBuilder(proxy, this.router)
        this.form = await builder.build(this.state.action, this.submit)

        await this.setStateSync({form: this.form.build()})

        //configure dependency of components
        const inputWithDepends = this.form.instances.filter(item => item.dependencies)
        const inputAlonesMap = {}
        this.form.instances.filter(item => !item.dependencies).forEach(item => {
            inputAlonesMap[item.name] = item
        })
        inputWithDepends.forEach(item => {
            item.dependencies.forEach(dep => {
                inputAlonesMap[dep].addMonitor(item)
            })
        })
    }

    render() {
        return <div className="api_box">
            <div><Warning ref={item => this.errorView = item}></Warning></div>
            <div>{this.state.form}</div>
            <div style={{marginTop: "30px"}}><TableView ref={(item) => this.view = item}></TableView></div>
        </div>

    }

}