import React from 'react';
import APIView from '../components/APIView';
import APIMain from '../components/APIMain';
import RemoteAction from '../service/RemoteAction';

export class APIViewSwitcher extends React.Component{
    constructor(props){
        super(props)
        this.app = props.app
        this.state={
            page1:true,
            page2:false,
            current_action:RemoteAction.LIST_ACTIONS 
        }
    }

   toPage1 = ()=>{
      this.setState({page1:true,page2:false})
   } 

   toPage2 = (action)=>{
      this.setState({page1:false,page2:true,current_action:action})
   }    

   render(){      
       if(this.state.page1){
        return (<div>
           <APIMain  router={this} action={RemoteAction.LIST_ACTIONS}></APIMain>
        </div>)
       }     
     else {
        return (<div>
           <APIView  router={this} action={this.state.current_action}></APIView>        
        </div>)
     }
   }
}