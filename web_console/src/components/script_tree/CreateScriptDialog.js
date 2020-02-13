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

class CreateScriptDialog extends React.Component {

    /**
     *
     * @param {{parentFolder:number,parent:ScriptNodeTree,nodeId:number}} props
     */
    constructor(props) {
        super(props)
        /**
         * @type {{msg: string,fileName:string,content:string}}
         */
        this.state = {
            msg: ""
        }
        this.messageBox = this.props.queryApp.messageBox.current.editor
        this.directoryTree = this.props.parent
    }

    title = () => {
        if (this.props.parent.state.isDir) {
            return "Create Folder"
        }
        else return "Create Script"
    }

    fileName = (e) => {
        this.setState({fileName: e.target.value})
    }
    content = (e) => {
        this.setState({content: e.target.value})
    }

    finish = () => {
        this.props.parent.setState({openCreateScriptDialog: false})
        this.props.parent.reloadData()
    }

    create = () => {

        const api = new MLSQLAPI(backendConfig.CREATE_SCRIPT_FILE)
        const self = this;

        /**
         *
         * @param {APIResponse} ok
         */
        const success = (ok) => {
            if (ok.status === HTTP.Status.Success) {
                self.finish()
            } else {
                ok.content.then((msg) => {
                    this.setState({"msg": msg})
                })

            }
        }

        const params = {
            fileName: this.state.fileName,
            isDir: this.props.parent.state.isDir,
            content: this.state.content,
            parentId: this.props.nodeId
        }

        if (!params.fileName) {
            this.setState({"msg": "filename should not be empty"})
            return
        }

        if (!params.isDir && (!params.fileName.endsWith(".mlsql") && !params.fileName.endsWith(".nb") && !params.fileName.endsWith(".py"))) {
            this.setState({"msg": "filename should be ends with .mlsql or .nb or .py"})
            return
        }

        api.request(HTTP.Method.POST, params, success, (notok) => {
            self.setState({msg: "Server error"})
        })

    }
    close = () => {
        /**
         * @type {ScriptNodeTree}
         */
        const parent = this.props.parent;
        parent.setState({openCreateScriptDialog: false})
        parent.reloadData()
    }

    render() {
        const OVERLAY_EXAMPLE_CLASS = "docs-md-overlay-example-transition";
        const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_EXAMPLE_CLASS);
        return (
            <div>
                <Overlay className="msql-treenode-dialog" isOpen={true} usePortal={true}>
                    <div className={classes}>
                        <H3>{this.title()} </H3>

                        <div className="msql-treenode-dialog-form">

                            <p style={{color: "red"}}>
                                {this.state.msg}
                            </p>
                            <FormGroup
                                helperText="The file of name you want create."
                                label="fileName"
                                labelFor="fileName"
                                labelInfo="(required)">
                                <InputGroup id="fileName" placeholder="example.mlsql" onChange={this.fileName}/>
                            </FormGroup>
                        </div>
                        <br/>
                        <Button onClick={this.create}>
                            Create
                        </Button>

                        <Button intent={Intent.DANGER} onClick={this.close} style={{float: "right"}}>
                            Close
                        </Button>

                    </div>
                </Overlay>
            </div>

        )
    }
}