import React from 'react'
import { BaseComp } from "../BaseReactComp/BaseComp";
import { Modal } from 'antd';
import TextField from '@material-ui/core/TextField';

export class DynamicAddInput extends BaseComp{
    constructor(props){
        super(props)
        this.form = props.form
        this.state={elements:[],popupVisible:false}        
    }

    addItem = (name,value)=>{
        const handleChange = (evt)=>{            
          this.form.forms[name] = evt.target.value          
        }
        const input =  <TextField 
        variant="outlined"
        margin="normal"            
        fullWidth                        
        autoFocus  
        onChange={handleChange} 
         name={name} label={name}/>
        const wow = this.state.elements.concat(input)         
        this.setState({elements:[wow],popupVisible:false})
    }

    handleOk = ()=>{    
      this.addItem(this.inputName,"")    
    }

    handleCancel = ()=>{
      this.setState({popupVisible:false})
    }

    popup = ()=>{
        this.setState({popupVisible:true})  
    }

    newFieldName = (evt)=>{
       this.inputName = evt.target.value
    }

    render(){
        return <div>
            <Modal
              title="Add New Param"
              visible={this.state.popupVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
        >
        <TextField onChange={this.newFieldName}
        variant="outlined"
        margin="normal"            
        fullWidth                        
        autoFocus          
        name="fieldName" label="New field name"/>        
        </Modal>
            {this.state.elements}
        </div>
    }

}