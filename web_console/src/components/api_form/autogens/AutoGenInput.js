import React from 'react'
import TextField from '@material-ui/core/TextField';
import { AutoGenBaseComp } from './AutoGenBaseComp';


export class AutoGenInput extends AutoGenBaseComp{
    /**
     * 
     * @param {AutoGenForm} form 
     */
    constructor(props){
        super(props)
      }
      
      handleChange = (event)=>{    
        this.forms[this.name]=event.target.value        
        this.monitors.forEach(monitor=>monitor.reload(this))
      }

      render(){        
        return (
            
            <TextField 
            variant="outlined"
            margin="normal"            
            fullWidth                        
            autoFocus  
            onChange={this.handleChange}          
            form={this.form} name={this.name} label={this.state.data.options.label || this.name} />
                      
        );
      }
}