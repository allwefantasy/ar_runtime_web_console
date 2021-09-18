import React from 'react';
import {Tree} from "@blueprintjs/core";
import { Utils } from '../../../utils/Utils';
import { ActionProxy } from '../../../service/ActionProxy';



export class AutoGenTreeView2 extends React.Component {

    constructor(props) {
        super(props)
        this.form = props.form
        this.name = props.name
        this.forms = this.form.forms
        this.json = props.json        
        const nodes = Utils.buildTree(this.json)
        this.state = { nodes: nodes }
        this.dependencies = props.dependencies
        this.action = props.action


        this.monitors = []
        this.dependencies = props.dependencies
        this.collect_dependencies = new Set()


        this.reload = this.reload.bind(this)       
        this.handleNodeClick = this.handleNodeClick.bind(this)
        this.handNodeDoubleClick = this.handNodeDoubleClick.bind(this)
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this)
        this.handleNodeExpand = this.handleNodeExpand.bind(this)
        this.onNodeContextMenu = this.onNodeContextMenu.bind(this)
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
            if(resp.status === 200){
                const nodes = Utils.buildTree(JSON.parse(resp.content[0].value))
                this.setState({nodes:nodes})
            }
            
        }
    }

    async handleNodeClick(nodeData, _nodePath, e){          
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);
        
        this.forms[this.name]= nodeData.id
        this.monitors.forEach(monitor=>monitor.reload(this))
    } 

    async handNodeDoubleClick(nodeData, _nodePath, e){        
        this.forms[this.name]= nodeData.id
        this.monitors.forEach(monitor=>monitor.reload(this))
    }

    async handleNodeCollapse(nodeData){        
        nodeData.isExpanded = false;
        this.toggleIsExpanded(nodeData.id, false)
        this.setState(this.state); 
    }

    async handleNodeExpand(nodeData){
        nodeData.isExpanded = true;
        this.toggleIsExpanded(nodeData.id, true)
        this.setState(this.state); 
    }

    async onNodeContextMenu(node, _nodePath, e){

    }

    toggleIsExpanded = (id, isExpanded) => {
       
    }

    forEachNode(nodes, callback) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }

    isRootNode = (nodeId) => {
        return this.state.nodes[0].id === nodeId
    }

    addMonitor = (monitor) => {
        this.monitors.push(monitor)
    }

    render() {
            
        return (
            <div>                
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    onNodeContextMenu={this.onNodeContextMenu}
                    onNodeDoubleClick={this.handNodeDoubleClick}                    
                />                
            </div>
        );
    }
}

class TreeNodeEnum {
    static DIR = 1
    static FILE = 2
}