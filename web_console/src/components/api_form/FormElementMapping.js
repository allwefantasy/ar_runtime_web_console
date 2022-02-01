import React from 'react'
import {AutoGenInput} from './autogens/AutoGenInput'
import {AutoGenSelect} from './autogens/AutoGenSelect'
import {AutoGenCheckBox} from './autogens/AutoGenCheckBox'
import {AutoGenTreeView2} from './autogens/AutoGenTreeView2'
import {AutoGenDynamic} from './autogens/AutoGenDynamic'
import {AutoGenEditor} from './autogens/AutoGenEditor'
import {AutoGenUpload} from "./autogens/AutoGenUpload";

export class FormElementMapping {

    static mapping = {
        "Input": (row, form, dependencies, action) => {
            const input = <AutoGenInput ref={item => form.pushInstance(item)} form={form} name={row.name} values={[]}
                                        dependencies={dependencies} action={action}></AutoGenInput>
            return input
        },
        "Select": (row, form, dependencies, action) => {
            const select = <AutoGenSelect ref={item => form.pushInstance(item)} form={form} name={row.name}
                                          values={row.values} dependencies={dependencies}
                                          action={action}></AutoGenSelect>
            return select
        },
        "CheckBox": (row, form, dependencies, action) => {
            const checkbox = <AutoGenCheckBox ref={item => form.pushInstance(item)} form={form} name={row.name}
                                              values={row.values} dependencies={dependencies}
                                              action={action}></AutoGenCheckBox>
            return checkbox
        },
        "TreeSelect": (row, form, dependencies, action) => {
            const tree = <AutoGenTreeView2 ref={item => form.pushInstance(item)} form={form} name={row.name}
                                           json={JSON.parse(row.json)[0].values || []} values={[]}
                                           dependencies={dependencies} action={action}></AutoGenTreeView2>    //(form,row.name,JSON.parse(row.json)[0].value)
            return tree
        },
        "Editor": (row, form, dependencies, action) => {
            const tree = <AutoGenEditor ref={item => form.pushInstance(item)} form={form} name={row.name} values={row.values}
                                        dependencies={dependencies} action={action}></AutoGenEditor>
            return tree
        },
        "Upload": (row, form, dependencies, action) => {
            const upload = <AutoGenUpload ref={item => form.pushInstance(item)} form={form} name={row.name}
                                          dependencies={dependencies} action={row.valueProviderName}></AutoGenUpload>
            return upload
        },
        "Dynamic": (row, form) => {
            let params = {
                name: row.name,
                subTpe: row.subTpe,
                form: form,
                action: row.valueProviderName,
                dependencies: row.depends,
                row: row
            }
            const dynamicComp = new AutoGenDynamic(params)

            return dynamicComp.build()
        }
    }

}
