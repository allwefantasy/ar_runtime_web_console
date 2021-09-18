import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { BaseComp } from '../../BaseReactComp/BaseComp'
import { Utils } from '../../../utils/Utils';
import { ActionProxy } from '../../../service/ActionProxy';



export class AutoGenTreeView extends React.Component {

    constructor(props) {
        super(props)
        this.form = props.form
        this.name = props.name
        this.forms = this.form.forms
        this.json = props.json
        this.state = { json: props.json }
        this.dependencies = props.dependencies
        this.action = props.action


        this.monitors = []
        this.dependencies = props.dependencies
        this.collect_dependencies = new Set()


        this.reload = this.reload.bind(this)
        this.view = undefined

        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async reload(input) {        
        this.collect_dependencies.add(input)
        const temp1 = new Set(Array.from(this.collect_dependencies).map(item => item.name))
        const temp2 = new Set(this.dependencies)
                
        if (Utils.setEqual(temp1,temp2)) {            
            const proxy = new ActionProxy()
            const params = {}
            this.dependencies.forEach(item => params[item] = this.forms[item])            
            const resp = await proxy.backend.request(this.action, params)                        
            if(this.view){
                this.view.reload(JSON.parse(resp.content[0].value))
            }
            
        }
    }

    async handleDoubleClick(evt){
        console.log(evt.target.nodeId)
        this.forms[this.name]= evt.target.nodeId
        this.monitors.forEach(monitor=>monitor.reload(this))
    } 

    async handleClick(evt){
        console.log(evt.target)
        console.log(evt.target.nodeId)
        this.forms[this.name]= evt.target.nodeId
        this.monitors.forEach(monitor=>monitor.reload(this))
    }

    addMonitor = (monitor) => {
        this.monitors.push(monitor)
    }

    render() {
        return <InnerTreeView ref={item=>this.view=item} parent={this} value={this.state.json}></InnerTreeView>
    }
}

class InnerTreeView extends BaseComp {

    constructor(props) {        
        super(props)
        this.state = { value: props.value }
        this.autoGen = props.parent
        
    }
    reload=(data)=>{
        this.setState({ value: data })
    }

     

    useStyles = () => makeStyles({
        root: {
            height: 216,
            flexGrow: 1,
            maxWidth: 400,
        },
    });

    render() {        
        const classes = this.useStyles();        
        const roots = Utils.buildTree(this.state.value)

        const buildTree = (item) => {
            if(item.isDir===TreeNodeEnum.DIR){
                return <TreeItem onClick={this.autoGen.handleClick}  key={item.id} nodeId={item.id+""} label={item.label}>
                {item.childNodes.map(subItem => buildTree(subItem))}
            </TreeItem>
            }else {
                return <TreeItem onDoubleClick={this.autoGen.handleDoubleClick} key={item.id} nodeId={item.id+""} label={item.label}>
                {item.childNodes.map(subItem => buildTree(subItem))}
                </TreeItem>
            }
            
        }

        const items = roots.map(item => {
            return buildTree(item)
        })    
        return (
            <div>                
                <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {items}
            </TreeView>
            </div>
        );
    }
}

class TreeNodeEnum {
    static DIR = 1
    static FILE = 2
}