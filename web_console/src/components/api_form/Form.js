import React from 'react'
import {ActionProxy, ResponseKey} from '../../service/ActionProxy'
import {AutoGenForm} from './autogens/AutoGenForm'
import {FormElementMapping} from './FormElementMapping'

export class FormBuilder {

    /**
     * @param {ActionProxy} proxy
     */
    constructor(proxy, router, extra_params) {
        this.proxy = proxy
        this.router = router
        delete extra_params.action
        this.extra_params = extra_params
    }

    /**
     * @param {string} action
     */
    async build(action, submit, instances) {
        const res = await this.proxy.post(action, {"__HELP__": "true", ...this.extra_params})

        if (res.status !== 200) {
            return [res.status,res.content]
        }

        /**@type {[]} */
        const json = res.content

        const form = new AutoGenForm({action: action, submit: submit, router: this.router})
        json.map(item => {
            const autogen = FormElementMapping.mapping[item.tpe](item, form)
            form.push(autogen)
        })
        return [200,form]
    }

}