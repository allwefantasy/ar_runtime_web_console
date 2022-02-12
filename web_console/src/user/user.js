import {useState} from 'react'
import {GlobalParamNames} from "../service/Dicts";
import {ActionProxy} from "../service/ActionProxy";

function useToken() {
    const getToken = () => {
        const userInfo = getUserInfo()
        return userInfo.token
    }
    const [token, setToken] = useState(getToken)
    const saveToken = userInfo => {
        localStorage.setItem(GlobalParamNames.LOGIN_TOKEN, JSON.stringify(userInfo))
        setToken(userInfo.token)
    }

    return {setToken: saveToken, token}
}

function setUserInfo(userInfo) {
    localStorage.setItem(GlobalParamNames.LOGIN_TOKEN, JSON.stringify(userInfo))
}

function getUserInfo() {
    const userInfoStr = localStorage.getItem(GlobalParamNames.LOGIN_TOKEN)
    if (userInfoStr === "" || userInfoStr == null) {
        return {}
    }
    const userInfo = JSON.parse(userInfoStr)
    return {token: userInfo?.token, userName: userInfo?.params[GlobalParamNames.USER_NAME]}
}

async function logout() {
    try {
        const proxy = new ActionProxy()
        await proxy.post("userLogout", {})
    } finally {
        localStorage.removeItem(GlobalParamNames.LOGIN_TOKEN)
    }

}

function getUserName() {
    return getUserInfo().userName
}

export {useToken, getUserName, getUserInfo, setUserInfo, logout}