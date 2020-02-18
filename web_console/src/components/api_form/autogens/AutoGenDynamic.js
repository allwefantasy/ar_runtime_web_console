import React from "react"
import { AutoGenBaseComp } from "./AutoGenBaseComp"
import { FormElementMapping } from "../FormElementMapping"

export class AutoGenDynamic extends AutoGenBaseComp{
    constructor(props){
        super(props)
        this.subTpe = props.subTpe 
        this.row = props.row       
    }
    build() {     
        let meta = {name:this.name,values:[]}    
        if(this.subTpe === "TreeSelect"){
            meta = {name:this.name,json:JSON.stringify([{values:[]}])}    
        }

        let element = undefined
        if(this.subTpe==="Dynamic"){
            element = FormElementMapping.mapping[this.subTpe](meta,this.form)
        }else {            
            element = FormElementMapping.mapping[this.subTpe](meta,this.form,this.dependencies,this.action)
        }
        
        return element
    }
}