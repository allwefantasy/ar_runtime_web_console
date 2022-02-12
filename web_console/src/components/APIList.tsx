import React, {useEffect, useState} from 'react'
import {ActionProxy} from "../service/ActionProxy";
import APICard from "./api_main/APICard";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const buildStyles = () => makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

const classes: any = buildStyles()

export default function APIList() {

    const [apis, setAPIs] = useState<React.ReactNode>()
    const history = useHistory()
    const handleListItemClick = (evt: Event, name: string) => {
        history.push("/api/view?action=" + encodeURIComponent(name))
    }

    useEffect(() => {
        const func = async () => {
            const proxy = new ActionProxy()
            const resp = await proxy.get("listActions", {})
            const cards = resp.content.map((item: any, index: number) => {
                return item
            })
            let groups: { [key: string]: any } = {}

            cards.forEach((item: any) => {
                const comp = <div className={"card"}>
                    <APICard card={item}
                             handleClick={(event: Event) => handleListItemClick(event, item.name)}></APICard>
                </div>
                let groupName = item.groupName || "Others"
                if (!groups.hasOwnProperty(groupName)) {
                    groups[groupName] = []
                }
                groups[groupName].push(comp)
            })

            const children = Object.entries(groups).map(([key, value]) => {
                return <div key={key}>
                    <div className="cards_title">
                        <span className="cards_title_text">{key}</span>
                    </div>
                    <div className="cards">
                        {value}
                    </div>
                </div>
            })
            setAPIs(children)
        }
        func()
    }, [])

    return <div className={classes.root}>
        {apis}
    </div>
}