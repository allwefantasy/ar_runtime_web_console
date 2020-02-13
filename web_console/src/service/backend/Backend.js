import {BACKEND_URL,AccessToken} from './RestConst'
export default class Backend {
    
    constructor(url,fetch_config={}){
        this.url = url      
        if(!this.url){
            this.url = BACKEND_URL
        }
        this.fetch_config = fetch_config
      }

    async request(action, params,method="GET") {
        method = method.toUpperCase();

        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody.push("action=" + action)
        let newurl = this.url

        if (method === "GET") {
            newurl = newurl + "?" + formBody
            formBody = undefined
        } else {
            formBody = formBody.join("&")
        }

        const basic_config = {
            method: method,
            timeout: 1000 * 60 * 60 * 24,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Access-Token': sessionStorage.getItem(AccessToken) || ''
            },
            body: formBody
        }

        const final_config = {...basic_config,...this.fetch_config}
        
        try{
            const response = await fetch(newurl,final_config);
            if (!response.ok) {
                return new RestResponse(response.status,response.text);
              }
            const json = await response.json();
            return new RestResponse(200,json);
        }catch(err){
            return new RestResponse(500,err);
        }
    }
}
export class RestResponse {
   constructor(status,content){
       this.status = status
       this.content = content
   }
}