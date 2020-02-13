import * as React from "react";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    Button,
    Classes,    
    Overlay,    
    Tree,    
    H3,    
    Intent,    
    InputGroup, FormGroup
} from "@blueprintjs/core";
import {ContextMenu, Menu, MenuItem} from "@blueprintjs/core";
import classNames from "classnames";
import './TreeNode.scss'
import TreeBuilder from "./TreeBuilder"

//the directory tree in the left
export class ScriptNodeTree extends React.Component {

    constructor(props) {
        super(props) 
        /**
         * @type {{isContextMenuOpen: boolean,openCreateScriptDialog: boolean}}
         */
        this.state = {isContextMenuOpen: false, openCreateScriptDialog: false};
        this.app = this.props.app        
    }
    componentDidMount(){
        this.reloadData()
    }
    reloadData = () => {

        const api = new MLSQLAPI(backendConfig.CREATE_SCRIPT_FILE)
        const self = this;
        /**
         *
         * @param {APIResponse} ok
         */
        const success = (ok) => {
            ok.content.then((s) => {
                /**
                 *
                 * @type {[{id:number,icon:string,label:string,parentId:number,isDir:boolean,childNodes:[]}]}
                 */
                let rawData = []
                try {
                    rawData = JSON.parse(s || "[]")
                } catch (e) {

                }

                const builder = new TreeBuilder()
                const treeRes = builder.build(rawData).sort((a, b) => {
                    return a.id - b.id
                })
                self.setState({nodes: treeRes})
            })
        }
        api.request(HTTP.Method.GET, {}, success, (notok) => {
        })
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
                    className="mlsql-directory-tree"
                />
                {this.state.openCreateScriptDialog ?
                    <CreateScriptDialog nodeId={this.state.nodeId} parent={this}
                                        queryApp={this.parent}></CreateScriptDialog> : ""}

            </div>
        );
    }

    isRootNode = (nodeId) => {
        return this.state.nodes[0].id === nodeId
    }

    onNodeContextMenu = (node, _nodePath, e) => {
        e.preventDefault()
        const self = this;
        ContextMenu.show(
            <ScriptNodeTreeMenu isDir={node.isDir} parent={self} nodeId={node.id}/>,
            {left: e.clientX, top: e.clientY},
            () => this.setState({isContextMenuOpen: false}),
        );
        this.setState({isContextMenuOpen: true});
    }

    handNodeDoubleClick = (node, _nodePath, e) => {
        if (node.isDir) {
            node.isExpanded = !node.isExpanded;
            this.toggleIsExpanded(node.id, node.isExpanded)
        } else {
            const api = new MLSQLAPI(backendConfig.GET_SCRIPT_FILE)
            const self = this;
            api.request(HTTP.Method.GET, {id: node.id}, (ok) => {
                ok.content.then((s) => {
                    const scriptFile = JSON.parse(s || "{}")
                    self.parent.openExistsOrNewEditor({id: node.id, content: scriptFile.content, name: scriptFile.name})
                })
            }, (fail) => {
            })


        }
        this.setState(this.state);

    };

    handleNodeClick = (nodeData, _nodePath, e) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);
    };

    toggleIsExpanded = (id, isExpanded) => {
        const api = new MLSQLAPI(backendConfig.CREATE_SCRIPT_FILE)
        const self = this;
        api.request(HTTP.Method.POST, {id: id, isExpanded: isExpanded}, (ok) => {
            ok.content.then((s) => {

            })
        }, (fail) => {
        })
    }

    handleNodeCollapse = (nodeData) => {
        nodeData.isExpanded = false;
        this.toggleIsExpanded(nodeData.id, false)
        this.setState(this.state);
    };

    handleNodeExpand = (nodeData) => {
        nodeData.isExpanded = true;
        this.toggleIsExpanded(nodeData.id, true)
        this.setState(this.state);
    };

    forEachNode(nodes, callback) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }
}

class ScriptTreeHandler {
    /**
    * @type {st: ScriptNodeTree}
    */
    constructor(st){ 
      this.st = st     
    }
    
    
}
class ScriptTreeBackend {

}