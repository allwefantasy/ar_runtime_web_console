import React from 'react';
import APIView from '../components/APIView';
import APIMain from '../components/APIMain';
import RemoteAction from '../service/RemoteAction';
import {APINavSwitcher} from '../router/APINavSwitcher'
import {BaseRouter} from './BaseRouter'

export class APIViewSwitcher extends BaseRouter{
    constructor(props){
        super(props)        
        this.state={
            page1:true,
            page2:false,
            nav:false,
            current_action:RemoteAction.LIST_ACTIONS 
        }      
        this.toPage1 = this.toPage1.bind(this)
        this.toPage2 = this.toPage2.bind(this)
        this.toNav = this.toNav.bind(this)
        this.popPage = this.popPage.bind(this)

        this.pages = [{func:this.toPage1,params:[]}]
    }

   toPage1 = ()=>{
      this.pages.push({func:this.toPage1,params:[]})
      this.setState({page1:true,page2:false,nav:false,})
   } 

   toPage2 = (action)=>{
      this.pages.push({func:this.toPage2,params:[action]})      
      this.setState({page1:false,page2:true,nav:false,current_action:action})
   }  
   
   toNav = ()=>{
      this.pages.push({func:this.toNav,params:[]})      
      this.setState({page1:false,page2:false,nav:true})
   }

   render(){      
       if(this.state.page1){
        return (<div>
           <APIMain router={this} action={RemoteAction.LIST_ACTIONS}></APIMain>
        </div>)
       }     
     else if(this.state.page2) {
        return (<div>
           <APIView  router={this} action={this.state.current_action}></APIView>        
        </div>)
     }else if(this.state.nav){        
      return (<div>
         <APINavSwitcher router={this} app={this.app}></APINavSwitcher>        
      </div>)
     }
   }
}