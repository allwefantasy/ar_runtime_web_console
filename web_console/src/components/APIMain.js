import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {BaseComp} from '../components/BaseReactComp/BaseComp'
import { ActionProxy } from '../service/ActionProxy';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default class APIView extends BaseComp {
    constructor(props) {
        super(props)
        this.router = props.router
        this.action = props.action    
        this.state = {}
        this.handleListItemClick = this.handleListItemClick.bind(this)
    }

    useStyles = ()=> makeStyles(theme => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
      }));
    
    async handleListItemClick(evt,action){              
        this.router.toPage2(action)
    }

    async goToNav(evt){
       this.router.toNav() 
    }

    async componentDidMount() {        
        const proxy = new ActionProxy()
        const resp = await proxy.get(this.action,{})
        const children = resp.content.map((item,index)=>{
            const comp = <ListItem key={index} button onClick={event => this.handleListItemClick(event,item.name)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
            return  comp
        })
        await this.setStateSync({items:children})
    }
    

    render(){      
        const classes = this.useStyles()
        return (
            <div className={classes.root}>
              <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={event => this.goToNav(event)}>
               <ListItemIcon>
                  <InboxIcon />
               </ListItemIcon>
            <ListItemText primary={"==> Go to nav page"} />
          </ListItem>
              {this.state.items}                
              </List>                            
            </div>
          );
    }
}