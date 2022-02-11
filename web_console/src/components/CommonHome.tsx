import * as React from "react";
import {useHistory} from "react-router-dom";
import {getUserInfo, useToken} from "../user/user";
import CommonHomeHeader from "./common_home/CommonHomeHeader";
import {useEffect, useState} from "react";
import {ActionProxy} from "../service/ActionProxy";

export interface PMenu {

}

export interface PSKU {
    name: string,
    label: string,
    desc: string,
    userName: string,
    downloads: string,
    image: string
    categories: string[],
    mainPage?: string
}

export type TestProps = {
    websiteName: string
    menus: PMenu[],
    searchTitle: string,
    skusUrl: string
    operates: string[]
}


export default function CommonHome(props: TestProps) {

    const [searchValue, setSearchValue] = useState<string>("")
    const [skus, setSkus] = useState<PSKU[]>([])

    const getSkus = async () => {
        const proxy = new ActionProxy()
        const res = await proxy.get(props.skusUrl, {keyword: searchValue})
        const items = res.content as PSKU[]
        setSkus(items)
        setSkus([{
            name: "Shell command",
            label: "Shell command",
            desc: "shell command",
            userName: "jack",
            downloads: "100k",
            image: "/images/byzer-lang.png",
            categories: []
        }])
    }

    useEffect(() => {
        getSkus()
    }, [])

    const search = () => {
        if (searchValue === "") {
            return
        }
        getSkus()
    }

    const generateSKUs = () => {
        return skus.map((item) => {
            return <div className="border bg-gray-100 rounded-md w-30 p-2">
                <button>
                    <div className="flex flex-row justify-center my-2">
                        <img className="w-12 h-12" src={item.image}></img>
                    </div>
                    <div className="text-center w-full">
                        <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="text-gray-400  text-xxs">{item.userName}</div>
                        <div className="flex-grow"></div>
                        <div className="text-gray-400  text-xxs">{item.downloads}</div>
                    </div>
                </button>

            </div>
        })
    }

    return <div className="flex flex-col w-full rounded-none">
        <CommonHomeHeader/>
        <div className="w-full">
            <div className="text-xl my-1 my-2">Extensions for the Byzer-lang</div>
            <form className="flex flex-row items-center justify-center h-6">
                <div>
                    <input onChange={(v) => {
                        setSearchValue(v.target.value)
                    }} type="text" className="
                focus:ring-1 focus:ring-blue-500
                focus:outline-none appearance-none
                sm:w-60
                h-5
                text-sm
                text-slate-900
                placeholder-slate-400
                rounded-l-md ring-1 ring-slate-200 shadow-sm"/>
                </div>
                <div>
                    <button type="button"
                            onClick={() => {
                                search()
                            }}
                            className="
                        flex items-center justify-center w-8 h-5
                        bg-indigo-600
                        hover:bg-indigo-400
                        text-white text-xs
                        h-5
                        ring-1 ring-slate-200
                        rounded-r-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
        <div className="flex flex-row my-2 mx-2 w-full">
            {generateSKUs()}
        </div>
    </div>
}