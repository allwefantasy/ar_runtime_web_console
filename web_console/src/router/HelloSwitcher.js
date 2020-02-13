import React from 'react';
import Hello from '../components/Hello';

export class HelloSwitcher extends React.Component{
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
        <Hello  router={this}></Hello>
        </div>)
       }     
     else {
        return (<div>
        <Hello  router={this}></Hello>
        </div>)
     }
   }
}