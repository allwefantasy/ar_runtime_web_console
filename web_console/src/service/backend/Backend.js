import {BACKEND_URL, AccessToken} from './RestConst'
import {GlobalParamNames} from '../Dicts'
import {getUserInfo} from '../../user/user'

export class RestResponse {
    constructor(status, content) {
        this.status = status
        this.content = content
    }
}

export class Backend {

    constructor(url, fetch_config = {}) {
        this.url = url
        if (!this.url) {
            this.url = BACKEND_URL
        }
        this.fetch_config = fetch_config
    }

    async request(action, params, method = "GET") {
        method = method.toUpperCase();
        const {token, userName} = getUserInfo()
        if (userName) {
            params[GlobalParamNames.USER_NAME] = userName
        }

        if (token) {
            params[GlobalParamNames.LOGIN_TOKEN] = token
        }

        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        let newurl = this.url + "?" + "action=" + action

        if (method === "GET") {
            newurl = newurl + "&" + formBody.join("&")
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

        const final_config = {...basic_config, ...this.fetch_config}

        try {
            const response = await fetch(newurl, final_config);
            if (!response.ok) {
                const error = await response.text()

                if (response.status === 400 && error === "[{\"msg\":\"Login or AdminToken is required\"}]") {
                    localStorage.removeItem(GlobalParamNames.LOGIN_TOKEN)
                }

                return new RestResponse(response.status, error);
            }
            const json = await response.json();
            return new RestResponse(200, json);
        } catch (err) {
            return new RestResponse(500, err);
        }
    }
}
