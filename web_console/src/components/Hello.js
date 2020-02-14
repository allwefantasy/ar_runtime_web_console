import React from 'react'
import {ActionProxy} from '../service/ActionProxy'
import { FormBuilder } from './api_form/Form'
import RemoteAction from '../service/RemoteAction'
import TableView from './api_form/TableView'


export default class Hello extends React.Component{
    constructor(props) {
        super(props)
        this.router = props.router
        this.state = {}
    }
        
    async componentDidMount(){
       const proxy = new ActionProxy()       
       const builder = new FormBuilder(proxy)
       const comps = await builder.build(RemoteAction.SCRIPT_ACTION) 
       this.setState({comps:comps})       
    }

    render(){

    return <div>
        <div>{this.state.comps}</div>
        <div><TableView data={this.state.data||[]}></TableView> </div>
    </div>
    
    }
    
}