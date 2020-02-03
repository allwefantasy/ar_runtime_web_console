import React from 'react'
import {Action,Method,Backend} from '@allwefantasy/web-platform-ui'


export default class Hello extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
        
    componentDidMount(){
       const backend = new Backend()       
       backend.request(Action.HELLO,Method.GET,{},(s)=>{           
           this.setState({hello:s.msg})
       },(s)=>{})
    }

    render(){
    return <div>{this.state.hello}</div>
    }
    
}