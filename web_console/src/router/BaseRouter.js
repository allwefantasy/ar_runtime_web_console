import React from 'react';

export class BaseRouter extends React.Component{
    constructor(props){
        super(props)
        this.app = props.app
        this.router = props.router 
        this.pages = [{func:this.toPage1,params:[]}]       
    }
    
    popPage(){
        this.pages.pop()
        const page = this.pages.pop()
        if(page){
            const {func,params} = page
            func(...params)
        }else{
            if(this.router){
                this.router.popPage()
            }else{
                this.toPage1()
            }           
        }
  
     } 

     toPage1(){

     }
}