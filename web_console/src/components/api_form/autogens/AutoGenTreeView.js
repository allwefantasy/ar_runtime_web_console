import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {BaseComp} from '../../BaseReactComp/BaseComp'
import { Utils } from '../../../utils/Utils';
import { ActionProxy } from '../../../service/ActionProxy';



export  class AutoGenTreeView extends React.Component{
    
    constructor(props){
        super(props)
        this.form = props.form
        this.name = props.name
        this.forms = this.form.forms  
        this.json = props.json 
        this.state = {json:props.json}

        this.reload = this.reload.bind(this)     
      }    

      async reload (input){
        this.collect_dependencies.add(input)        
        const temp2 = new Set(this.dependencies)
        if(this.collect_dependencies===temp2){            
          const proxy = new ActionProxy()
          const params = {}
          this.dependencies.forEach(item=>params[item]=this.forms[item])
          const resp = await proxy.backend.request(this.action,params)
          this.setState({values:resp.content[0].values})
        }
      }

      addMonitor=(monitor)=>{
        this.monitors.push(monitor)
      }

    render() { 
        return <InnerTreeView value={this.state.json}></InnerTreeView>       
    }
}

class InnerTreeView extends BaseComp{

    constructor(props){
       super(props)
       this.state = {value:props.json}
    }

    componentDidMount(){}

    useStyles = () => makeStyles({
        root: {
            height: 216,
            flexGrow: 1,
            maxWidth: 400,
        },
    });

    render(){
        const classes = this.useStyles();

        const roots = Utils.buildTree(this.state.value)

        const buildTree =(item)=>{
            return <TreeItem nodeId={item.id} label={item.label} isDir={item.isDir}>
                  {item.childNodes.map(subItem=> buildTree(subItem))}
             </TreeItem> 
        }

        const items = roots.map(item=>{
            buildTree(item)
        })

        return (
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
               {items} 
            </TreeView>
        );
    }
}