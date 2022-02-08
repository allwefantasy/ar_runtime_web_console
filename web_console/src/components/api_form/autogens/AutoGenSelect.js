import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { AutoGenBaseComp } from './AutoGenBaseComp';

export class AutoGenSelect extends AutoGenBaseComp{
    /**
   * 
   * @param {AutoGenForm} form 
   */
    constructor(props) {
        super(props)
    }
    
    handleChange = (event)=>{    
      this.forms[this.name]=event.target.value
      this.monitors.forEach(monitor=>monitor.reload(this))
    }
    

    render() {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                id="standard-select-currency"
                name={this.name}
                select
                label={this.state.data.options.label || this.name}
                onChange={this.handleChange}
            >
                {this.state.values.map(option => (
                    <MenuItem key={option.name} value={option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>

        );
    }
}