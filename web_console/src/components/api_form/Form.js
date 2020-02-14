import React from 'react'
import {ActionProxy, ResponseKey} from '../../service/ActionProxy'
import { AutoGenForm } from './autogens/AutoGenForm'
import { FormElementMapping } from './FormElementMapping'

export class FormBuilder {

    /**     
     * @param {ActionProxy} proxy      
     */
    constructor(proxy){              
        this.proxy = proxy                
    }
    /**     
     * @param {string} action 
     */
    async build(action,submit){        
        const res = await this.proxy.post(action,{"__HELP__":"true"})                
        /**@type {[]} */
        const json = res.content
        
        const form = new AutoGenForm(action,submit)

        json.map(item=>{        
            const element = FormElementMapping.mapping[item.tpe](item,form)
            form.push(element)
        })                
        return form
    }
    
} 