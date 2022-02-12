import * as React from "react";
import {useHistory} from "react-router-dom";
import {getUserInfo, getUserName, logout} from "../../user/user";
import {CommonHomeProps} from "../CommonHome";
import {useState} from "react";

export default function CommonHomeHeader(props: CommonHomeProps) {
    const history = useHistory()
    const [token, setToken] = useState<string>(getUserInfo().token)
    const loginOrReg = () => {
        if (token) {
            return <div className="flex-none my-auto w-32 text-xl">
                <button className="text-white" onClick={async () => {
                    await logout()
                    setToken("")
                    history.push("/home")
                }}>Logout
                </button>
                <span className="text-white mx-2">{getUserName()}</span></div>
        }
        return <div className="flex-none my-auto w-16 text-xxs">
            <button onClick={() => {
                history.push("/api/view?action=userLogin")
            }} className="text-white">Sign in
            </button>
        </div>
    }

    return <div className="w-full">
        <div className="w-full h-16 bg-black flex flex-row">
            <div className="flex-none text-white my-auto ml-12 text-4xl font-bold">{props.websiteName}</div>
            <div className="flex-1"></div>
            {loginOrReg()}
        </div>
        <div className="w-full border-sky-100 divide-gray-100 h-12 divide-x flex flex-row border border-gray-300">
            <div className="my-auto mx-6"></div>
            <div className="my-auto h-full py-0 px-0 hover:bg-pink-700 hover:text-white">
                <button onClick={() => {
                    history.push("/home")
                }} className="py-1 px-4 h-full w-full text-2xl ">Home
                </button>
            </div>

            <div className="my-auto h-full text-xs py-0 px-0 hover:bg-pink-700 hover:text-white">
                <button onClick={() => {
                    history.push("/api")
                }} className="py-1 px-4 h-full w-full text-2xl">Workflow
                </button>
            </div>

            <div className="flex-grow">

            </div>
            <div className="my-auto h-full text-indigo-600 text-xl py-0 px-0 hover:bg-pink-700 hover:text-white ">
                <button onClick={() => {
                    history.push(props.mainAction || "/")
                }} className="py-1 px-2">{props.mainName || "Publish extension"}
                </button>
            </div>
        </div>
    </div>
}