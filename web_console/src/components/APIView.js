import React from 'react'
import {ActionProxy} from '../service/ActionProxy'
import { FormBuilder } from './api_form/Form'
import { makeStyles } from '@material-ui/core/styles';
import RemoteAction from '../service/RemoteAction'
import TableView from './api_form/TableView'


export default class APIView extends React.Component{
    constructor(props) {
        super(props)
        this.router = props.router
        this.submit = this.submit.bind(this)
        this.state = {}               
    }

    useStyles = ()=> makeStyles(theme => ({        
        v: {          
          marginTop: theme.spacing(1),
        },        
      }));
    
    async submit(evt){
        evt.preventDefault()
        const proxy = new ActionProxy()        
        const params = this.form.forms
        const res = await proxy.backend.request(RemoteAction.SCRIPT_ACTION,params)                
        if(this.view){
            this.view.load(res.content)
        }
    }
    async componentDidMount(){
       const proxy = new ActionProxy()       
       const builder = new FormBuilder(proxy)              
       this.form = await builder.build(RemoteAction.SCRIPT_ACTION,this.submit)
       // add monitor
       // builder.autogens.filter(item=>item.) 
       this.setState({form:this.form.build()})              
    }

    render(){
    const classes = this.useStyles()
    return <div>
        <div>{this.state.form}</div>
        <div style={{marginTop:"30px"}}><TableView ref={(item)=>this.view=item}></TableView> </div>
    </div>
    
    }
    
}