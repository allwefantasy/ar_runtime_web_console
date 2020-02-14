import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export class AutoGenCheckBox{
    /**
     * 
     * @param {AutoGenForm} form 
     */
    constructor(form,name,values){
        this.form = form
        this.name = name
        this.values = values
        this.forms = this.form.forms        
      }

      handleChange = (event)=>{    
        this.forms[this.name]=event.target.checked
      }

      build(){
        const GreenCheckbox = withStyles({
            root: {
              color: green[400],
              '&$checked': {
                color: green[600],
              },
            },
            checked: {},
          })(props => <Checkbox color="default" {...props} />);
        const items = this.values.map(item=>{
            return <FormControlLabel
        control={
          <GreenCheckbox            
            onChange={this.handleChange}
            value={item}
          />
        }
        label={item}
      />
        })
        return <div>{items}</div>

      }
}