import * as React from "react";
import {useHistory} from "react-router-dom";
import {getUserInfo, useToken} from "../user/user";
import CommonHomeHeader from "./common_home/CommonHomeHeader";
import {useCallback, useEffect, useState} from "react";
import {ActionProxy} from "../service/ActionProxy";

export interface PMenu {

}

export interface PSKU {
    id: string,
    name: string,
    label: string,
    desc: string,
    userName: string,
    downloads: string,
    image: string
    categories: string[],
    mainPage?: string
}

export interface CommonHomeProps {
    websiteName: string
    menus: PMenu[],
    searchTitle: string,
    skusUrl: string,
    mainName: string,
    mainAction: string,
    options: { [key: string]: string }[]
}


export function CommonHome(props: CommonHomeProps) {
    const history = useHistory()
    const [searchValue, setSearchValue] = useState<string>("")
    const [skus, setSkus] = useState<PSKU[]>([])

    const fetchSkus = useCallback(async () => {
        if (!props.skusUrl) {
            return
        }
        const proxy = new ActionProxy()
        const res = await proxy.get(props.skusUrl, {keyword: searchValue, pageSize: 100})
        if (res.status == 200) {
            const items = res.content as PSKU[]
            setSkus(items)
        }
    }, [props, searchValue])

    useEffect(() => {
        fetchSkus()
    }, [props])

    const search = () => {
        if (searchValue === "") {
            return
        }
        fetchSkus()
    }

    const generateSKUs = () => {
        return skus.map((item) => {
            return <div key={item.name} className="border bg-gray-100 rounded-md w-56 p-2 mx-2">
                <button onClick={() => {
                    history.push(`/api/view?action=${encodeURIComponent("/sku/get")}&id=${item.id}`, {})
                }}>
                    <div className="flex flex-row justify-center my-2">
                        <img className="w-12 h-12" src={item.image}></img>
                    </div>
                    <div className="text-center w-full">
                        <span className="text-xl font-bold">{item.label}</span>
                    </div>
                    <div className="text-center w-full">
                        <span className="text-x">{item.desc}</span>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="text-gray-400  text-sm">{item.userName}</div>
                        <div className="flex-grow"></div>
                        <div className="text-gray-400  text-sm">{item.downloads}</div>
                    </div>
                </button>

            </div>
        })
    }

    return <div className="flex flex-col w-full rounded-none">
        <CommonHomeHeader {...props}/>
        <div className="w-full">
            <div className="text-4xl my-1 my-2">{props.searchTitle}</div>
            <form className="flex flex-row items-center justify-center h-12">
                <div>
                    <input onChange={(v) => {
                        setSearchValue(v.target.value)
                    }} type="text" className="
                focus:ring-1 focus:ring-blue-500
                focus:outline-none appearance-none
                sm:w-60
                h-12
                px-1 py-1
                text-3xl
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
                        flex items-center justify-center
                        bg-indigo-600
                        hover:bg-indigo-400
                        text-white text-xs
                        w-12 h-12
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
        <div className="flex flex-row my-12 mx-2 w-full ">
            {generateSKUs()}
        </div>
    </div>
}