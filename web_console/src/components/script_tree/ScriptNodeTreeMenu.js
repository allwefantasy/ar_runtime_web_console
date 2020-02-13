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

class ScriptNodeTreeMenu extends React.Component {

    /**
     *
     * @param {{parent:ScriptNodeTree}} props
     */
    constructor(props) {
        super(props)
        this.parent = this.props.parent
        this.nodeId = this.props.nodeId
        this.isDir = this.props.isDir
    }

    confirmDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this ？',
            buttons: [
                {
                    label: 'confirm',
                    onClick: () => this.removeFile()
                },
                {
                    label: 'cancel',
                    onClick: () => {
                    }
                }
            ],
            closeOnEscape: true, closeOnClickOutside: false
        });
    }

    removeFile = () => {
        const api = new MLSQLAPI(backendConfig.REMOVE_SCRIPT_FILE)
        const self = this;

        api.request(HTTP.Method.POST, {
            id: self.nodeId
        }, (ok) => {
            if (ok.status === HTTP.Status.Success) {
                self.parent.reloadData()
            } else {
                ok.content.then((msg) => {
                    self.parent.setState({msg: msg})
                })

            }

        }, (fail) => {
            self.parent.setState({msg: "Server error"})
        })
    }

    isCreateProject = () => {
        return this.parent.isRootNode(this.nodeId)
    }

    createDocMenuItem = () => {
        if (!this.isCreateProject() && this.isDir) {
            return <MenuItem icon="document" text="Create Script" onClick={(() => {
                this.parent.setState({
                    openCreateScriptDialog: true,
                    nodeId: this.nodeId,
                    isDir: false
                })
            }).bind(this)}/>
        }
    }
    createFolderTitle = () => {
        if (!this.isCreateProject()) {
            return "Create Folder"
        }
        else {
            return "Create Project"
        }
    }
    createFolder = () => {
        if (this.isDir) {
            return <MenuItem icon="folder-new" text={this.createFolderTitle()} onClick={(() => {
                this.parent.setState({
                    openCreateScriptDialog: true,
                    nodeId: this.nodeId,
                    isDir: true
                })
            }).bind(this)}/>
        }
        if (this.isCreateProject()) {
            return <MenuItem icon="folder-new" text="Create Project" onClick={(() => {
                this.parent.setState({
                    openCreateScriptDialog: true,
                    nodeId: this.nodeId,
                    isDir: true
                })
            }).bind(this)}/>
        }
    }

    deleteMenu = () => {
        if (!this.isCreateProject()) {
            return <MenuItem icon="remove" text="Delete" onClick={(() => {
                this.confirmDelete()
            }).bind(this)}/>
        }
    }


    render() {
        return (
            <div>
                <Menu>
                    {this.createDocMenuItem()}
                    {this.createFolder()}
                    {this.deleteMenu()}
                </Menu>
            </div>
        )
    }
}