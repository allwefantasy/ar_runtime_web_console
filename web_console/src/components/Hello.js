import React from 'react'
import {ActionProxy} from '../service/ActionProxy'


export default class Hello extends React.Component{
    constructor(props) {
        super(props)
        this.router = props.router
        this.state = {}
    }
        
    async componentDidMount(){
       const proxy = new ActionProxy()
       const resp = await proxy.hello()
       this.setState({hello:resp.content.msg})       
    }

    render(){
    return <div>Hello:{this.state.hello}</div>
    }
    
}