import * as React from "react";
import {useHistory} from "react-router-dom";
import { getUserName, logout, useToken} from "../../user/user";

export default function CommonHomeHeader() {
    const history = useHistory()
    const {token,setToken} = useToken()
    const loginOrReg = () => {
        if (token) {
            return <div className="flex-none my-auto w-24 text-xxs">
                <button className="text-white" onClick={async () => {
                    await logout()
                    history.push("/home")
                }}>Logout
                </button>
                <span className="text-white mx-2">{getUserName()}</span></div>
        }
        return <div className="flex-none my-auto w-16 text-xxs">
            <button onClick={() => {
                history.push("/api?action=userLogin")
            }} className="text-white">Sign in
            </button>
        </div>
    }

    return <div className="w-full">
        <div className="w-full h-8 bg-black flex flex-row">
            <div className="flex-none text-white my-auto ml-12">Byzer-lang | Market</div>
            <div className="flex-1"></div>
            {loginOrReg()}
        </div>
        <div className="w-full border-sky-100 divide-gray-100 divide-x flex flex-row border border-gray-300">
            <div className="my-auto mx-6"></div>
            <div className="my-auto h-full text-xs py-0 px-0 hover:bg-pink-700 hover:text-white">
                <button onClick={() => {
                    history.push("/home")
                }} className="py-1 px-2 h-full w-full">Home
                </button>
            </div>

            <div className="my-auto h-full text-xs py-0 px-0 hover:bg-pink-700 hover:text-white">
                <button onClick={() => {
                    history.push("/api")
                }} className="py-1 px-2 h-full w-full">Workflow
                </button>
            </div>

            <div className="flex-grow">

            </div>
            <div className="my-auto h-full text-indigo-600 text-xxs py-0 px-0 hover:bg-pink-700 hover:text-white ">
                <button className="py-1 px-2">Publish extension</button>
            </div>
        </div>
    </div>
}