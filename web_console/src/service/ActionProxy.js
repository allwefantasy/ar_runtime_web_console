import {RestResponse,Backend} from './backend/Backend'
import RemoteAction from './RemoteAction'
import {Method,Status} from './backend/RestConst'

export class UserActionParams {
  static USERE_NAME = "userName"   
  
}
export class ResponseKey {
   static SIGH_IN_MAIN_PAGE = "sighInMainPage"
}


export class ActionProxy {
    constructor(){
        this.backend = new Backend()        
    }    
    async hello(){        
      const res = await this.backend.request(RemoteAction.HELLO,{},Method.GET)
      return res
    }

    /**
     * 
     * @param {string} action 
     * @param {{}} params 
     * @return {RestResponse}
     */
    async get(action,params){
      const res = await this.backend.request(action,params,Method.GET)
      return res
    }

    /**
     * 
     * @param {string} action 
     * @param {{}} params 
     * @returns {RestResponse}
     */
    async post(action,params){        
        const res = await this.backend.request(action,params,Method.POST)
        return res
      }
}

