import Backend from './backend/Backend'
import RemoteAction from './RemoteAction'
import {Method,Status,} from './backend/RestConst'

export class ActionProxy {
    constructor(){
        this.backend = new Backend()        
    }    
    async hello(){        
      const res = await this.backend.request(RemoteAction.HELLO,{},Method.GET)
      return res
    }
}

export class UserActionParams {
   static USERE_NAME = "userName"   
   
}
export class ResponseKey {
    static SIGH_IN_MAIN_PAGE = "sighInMainPage"
}