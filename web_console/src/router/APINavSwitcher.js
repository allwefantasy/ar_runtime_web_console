import React from 'react';
import APIView from '../components/APIView';
import APINav from '../components/APINav';
import RemoteAction from '../service/RemoteAction';
import {BaseRouter} from './BaseRouter'

export class APINavSwitcher extends BaseRouter{
    constructor(props){
        super(props)
        
        this.state={
            page1:true,
            page2:false,
            apiNavId:-1
        }
        this.submit = this.submit.bind(this)         
        this.toPage1 = this.toPage1.bind(this)
        this.toPage2 = this.toPage2.bind(this)

        this.pages = [{func:this.toPage1,params:[]}]
    }

    async submit(evt){
       evt.preventDefault()
       const params = this.apiView.form.forms       
       this.toPage2(params["apiNavId"])
    }

   toPage1 = ()=>{       
      this.pages.push({func:this.toPage1,params:[]})
      this.setState({page1:true,page2:false})
   } 

   toPage2 = (apiNavId)=>{     
      this.pages.push({func:this.toPage2,params:[apiNavId]})
      this.setState({page1:false,page2:true,apiNavId:apiNavId})
   }    

   render(){      
       if(this.state.page1){    
        return (<div>
           <APIView ref={item=>this.apiView=item} 
           action={RemoteAction.ChooseAPINav} 
           router={this}  submit={this.submit}></APIView>
        </div>)
       }     
     else {        
        return (<div>                  
           <APINav router={this} apiNavId={this.state.apiNavId}></APINav>
        </div>)
     }
   }
}