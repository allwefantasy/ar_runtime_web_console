import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import {BaseComp} from '../components/BaseReactComp/BaseComp'
import {ActionProxy} from '../service/ActionProxy';
import APICard from "./api_main/APICard";
import APIBar from "./api_main/APIBar";
import './APIMain.css'


export default class APIView extends BaseComp {
    constructor(props) {
        super(props)
        this.router = props.router
        this.action = props.action
        this.state = {}
        this.handleListItemClick = this.handleListItemClick.bind(this)
    }

    useStyles = () => makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        }
    }));

    async handleListItemClick(evt, action) {
        this.router.toPage2(action)
    }

    async goToNav(evt) {
        this.router.toNav()
    }

    async componentDidMount() {
        const proxy = new ActionProxy()
        const resp = await proxy.get(this.action, {})
        const myself = this
        const cards = resp.content.map((item, index) => {
            return item
        })
        let groups = {}

        cards.forEach(item => {
            console.log(item)
            const comp = <div className={"card"}><APICard card={item}
                                                          handleClick={event => myself.handleListItemClick(event, item.name)}></APICard>
            </div>
            let groupName = item.groupName || "Others"
            if (!groups.hasOwnProperty(groupName)) {
                groups[groupName] = []
            }
            groups[groupName].push(comp)
        })

        const children = Object.entries(groups).map(([key, value]) => {
            return <div>
                <div className="cards_title">
                    <span className="cards_title_text">{key}</span>
                </div>
                <div className="cards">
                    {value}
                </div>
            </div>
        })

        await this.setStateSync({items: children})
    }


    render() {
        const classes = this.useStyles()
        return (
            <div className={classes.root}>
                <APIBar></APIBar>
                {this.state.items}
            </div>
        );
    }
}