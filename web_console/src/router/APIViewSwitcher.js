import React from 'react';
import APIView from '../components/APIView';

export class APIViewSwitcher extends React.Component{
    constructor(props){
        super(props)
        this.app = props.app
        this.state={
            page1:true,
            page2n:false
        }
    }

   toPage1 = (clzz)=>{
      this.setState({page1:true,page2:false})
   } 

   toPage2 = (clzz)=>{
      this.setState({page1:false,page2:true})
   }    

   render(){
       if(this.state.page1){
        return (<div>
        <APIView  router={this}></APIView>
        </div>)
       }     
     else {
        return (<div>
        <APIView  router={this}></APIView>
        </div>)
     }
   }
}