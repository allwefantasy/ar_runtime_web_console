import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { AutoGenBaseComp } from './AutoGenBaseComp';


export class AutoGenCheckBox extends AutoGenBaseComp{    
    constructor(props){
        super(props)        
      }
      
      handleChange = (event)=>{    
        this.forms[this.name]=event.target.checked
        this.monitors.forEach(monitor=>monitor.reload(this))
      }

      render(){
        const GreenCheckbox = withStyles({
            root: {
              color: green[400],
              '&$checked': {
                color: green[600],
              },
            },
            checked: {},
          })(props => <Checkbox color="default" {...props} />);
        const items = this.statue.values.map(item=>{
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