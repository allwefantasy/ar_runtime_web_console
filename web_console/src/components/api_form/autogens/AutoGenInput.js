import React from 'react'
import TextField from '@material-ui/core/TextField';


export class AutoGenInput {
    /**
     * 
     * @param {AutoGenForm} form 
     */
    constructor(form,name){
        this.form = form
        this.name = name
      }
      handleChange = (event)=>{    
        this.forms[this.name]=event.target.checked
      }

      build(){        
        return (
            
            <TextField 
            variant="outlined"
            margin="normal"            
            fullWidth                        
            autoFocus  
            onChange={this.handleChange}          
            form={this.form} name={this.name} label={this.name} />
                      
        );
      }
}