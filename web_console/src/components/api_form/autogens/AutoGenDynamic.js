import React from "react"
import { AutoGenBaseComp } from "./AutoGenBaseComp"
import { FormElementMapping } from "../FormElementMapping"

export class AutoGenDynamic extends AutoGenBaseComp{
    constructor(props){
        super(props)
        this.subTpe = props.subTpe        
    }
    render() { 
        const meta = {name:this.name,json:JSON.stringify([{value:""}])}    
        const element = FormElementMapping.mapping[this.subTpe](meta,form,this.dependencies,this.action)
        this.form.push(element)        
        return element
    }
}