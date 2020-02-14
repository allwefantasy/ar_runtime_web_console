import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export class AutoGenSelect {
    /**
   * 
   * @param {AutoGenForm} form 
   */
    constructor(form, name, values) {
        this.form = form
        this.name = name
        this.values = values
        this.forms = this.form.forms
    }

    handleChange = (event) => {  
        this.forms[this.name] = event.target.value
    }

    build() {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                id="standard-select-currency"
                name={this.name}
                select
                label={this.name}
                onChange={this.handleChange}
            >
                {this.values.map(option => (
                    <MenuItem key={option.name} value={option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>

        );
    }
}