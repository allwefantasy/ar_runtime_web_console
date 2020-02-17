import React from 'react'
import {AutoGenInput} from './autogens/AutoGenInput'
import {AutoGenSelect} from './autogens/AutoGenSelect'
import {AutoGenCheckBox} from './autogens/AutoGenCheckBox'
import { AutoGenTreeView } from './autogens/AutoGenTreeView'

export class FormElementMapping{
    
    static mapping = {
        "Input":(row,form,dependencies=[],action="")=>{
            const input = <AutoGenInput form={form} name={row.name} values={[]} dependencies={dependencies} action={action}></AutoGenInput> 
            return input
        },
        "Select": (row,form,dependencies=[],action="")=>{  
            const select = <AutoGenSelect form={form} name={row.name} values={row.values} dependencies={dependencies} action={action}></AutoGenSelect>
            return select
        },
        "CheckBox": (row,form,dependencies=[],action="")=>{  
            const checkbox = <AutoGenCheckBox form={form} name={row.name} values={row.values} dependencies={dependencies} action={action}></AutoGenCheckBox>
            return checkbox
        },
        "TreeSelect":(row,form,dependencies=[],action="")=>{
            const tree = <AutoGenTreeView form={form} name={row.name} json={JSON.parse(row.json)[0].value} values={[]} dependencies={dependencies} action={action}></AutoGenTreeView>    //(form,row.name,JSON.parse(row.json)[0].value)
            return tree
        } 
    }
    
}
