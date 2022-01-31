import {useState} from 'react'
import {GlobalParamNames} from "../service/Dicts";

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
    const userInfo = JSON.parse(userInfoStr)
    return {token: userInfo?.token, userName: userInfo?.params[GlobalParamNames.USER_NAME]}
}

function getUserName() {
    return getUserInfo().userName
}

export {useToken, getUserName, getUserInfo,setUserInfo}