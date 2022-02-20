import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ActionProxy} from "../service/ActionProxy";
import {FormBuilder} from "./api_form/Form";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "query-string";
import Warning from "./api_form/Warning";
import {setUserInfo} from "../user/user";
import {ResultRender} from "./BaseReactComp/ResultRender";

type APIViewerProps = {
    action?: string
    submit?: () => {}
}

export default function APIViewer(props: APIViewerProps) {
    const location = useLocation()
    const extra_params = queryString.parse(location.search) || {}
    const errorView = useRef<any>()

    const autoGenFormRef = useRef<any>()
    const autoGenFormInstanceRef = useRef<any>()

    const [autoGenForm, setAutoGenForm] = useState<any>()
    const [autoGenFormInstance, setAutoGenFormInstance] = useState<any>()

    const [renderData, setRenderData] = useState<any>(undefined)

    const action = (props.action || extra_params.action) as string
    const history = useHistory()
    const submit = useCallback(
        async (evt: Event) => {
            evt.preventDefault()
            const proxy = new ActionProxy()

            let new_extra_params: { [key: string]: string } = {}
            Object.keys(extra_params).forEach((key, index) => {
                new_extra_params["extra." + key] = extra_params[key] as string
            })
            delete new_extra_params["extra.action"]
            const params = autoGenFormInstanceRef.current?.forms
            //clean empty param
            Object.keys(params).forEach(key => {
                if (!params[key]) {
                    delete params[key]
                }
            })
            const res = await proxy.backend.request(action, {...new_extra_params, ...params})
            if (res.status !== 200) {
                errorView.current?.warn("Response error", res.content)
            }
            if (res.status === 200 ) {
                try {
                    if (action === "userLogin") {
                        setUserInfo(res.content[0])
                        history.push("/")
                    } else {
                        setRenderData(res.content)
                    }

                } catch (ex) {
                    errorView.current?.warn("Data can not display in table", res.content + "")
                }
            }
        }
        , [action, autoGenForm, autoGenFormInstance])

    useEffect(() => {
        const func = async () => {
            const proxy = new ActionProxy()
            let new_extra_params: { [key: string]: string } = {}
            Object.keys(extra_params).forEach((key, index) => {
                new_extra_params["extra." + key] = extra_params[key] as string
            })

            const builder = new FormBuilder(proxy, history, new_extra_params)
            const [status, formInstance] = await builder.build(action, submit, undefined)

            if (status !== 200) {
                errorView.current?.warn("Response error", formInstance)
                return
            }
            setAutoGenFormInstance(formInstance)
            autoGenFormInstanceRef.current = formInstance

            const form = formInstance.build()
            setAutoGenForm(form)
            autoGenFormRef.current = form

            //configure dependency of components
            const inputWithDepends = formInstance.instances.filter((item: any) => item.dependencies)
            const inputAlonesMap: { [key: string]: any } = {}
            formInstance.instances.forEach((item: any) => {
                inputAlonesMap[item.name] = item
            })
            inputWithDepends.forEach((item: any) => {
                if (item.dependencies.length > 0) {
                    item.dependencies.forEach((dep: any) => {
                        inputAlonesMap[dep].addMonitor(item)
                    })
                } else {
                    item.reload(undefined)
                }

            })
        }
        try {
            func()
        } catch (e) {
            console.log(e)
        }

    }, [props, action, location.search])

    return <div className="my-6">
        <div><Warning ref={errorView}></Warning></div>
        <div className="my-6">{autoGenForm}</div>
        <div className="my-4">
            <ResultRender renderData={renderData}></ResultRender>
        </div>
    </div>
}