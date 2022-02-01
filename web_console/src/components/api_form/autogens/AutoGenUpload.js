import React from 'react'
import {AutoGenBaseComp} from './AutoGenBaseComp';
import Dropzone from 'react-dropzone'
import {fromEvent} from 'file-selector';
import request from "superagent";
import {BACKEND_URL} from "../../../service/backend/RestConst";

const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};
const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
};
const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
};

const fileListStyle = {
    display: 'flex'
}

export class AutoGenUpload extends AutoGenBaseComp {
    /**
     *
     * @param {AutoGenForm} form
     */
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            msg: "",
            action: props.action
        }
    }

    handleChange = (event) => {

    }

    onDrop = (files) => {
        this.setState({files})
        let newurl = BACKEND_URL + "?" + "action=" + this.state.action
        const req = request.post(newurl);

        files.forEach(file => {
            req.attach(file.path, file);
        });

        req.end((err, res) => {
            this.setState({files: []})
            if (!err) {
                if (res.ok) {
                    const paths = JSON.parse(res.text).map(item => item["path"])
                    // const pathStr = paths.join("\n")
                    this.forms[this.name] = paths.join(",")
                    this.monitors.forEach(monitor => monitor.reload(this))
                    this.setState({msg: "total files:" + files.length + " are uploaded. "})
                }
            } else {
                this.setState({msg: err.toString() + "\n" + res.text + "\n  Sometimes this caused by your upload space is not enough or backend fails"})
            }
        })
    }

    render() {

        const files = this.state.files.map(f => (
            <li key={f.name}>
                {f.path} - {f.size} bytes
            </li>
        ))

        return (
            <section style={fileListStyle}>
                <div>
                    <Dropzone onDrop={this.onDrop}
                              getDataTransferItems={evt => fromEvent(evt)}
                    >
                        {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
                            let styles = {...baseStyle}
                            styles = isDragActive ? {...styles, ...activeStyle} : styles
                            styles = isDragReject ? {...styles, ...rejectStyle} : styles

                            return (
                                <div
                                    {...getRootProps()}
                                    style={styles}
                                >
                                    <input {...getInputProps()} />
                                    <div>
                                        {isDragAccept ? 'Drop' : 'Drag'} files here...
                                    </div>
                                    {isDragReject && <div>Unsupported file type...</div>}
                                </div>
                            )
                        }}
                    </Dropzone>
                </div>
                <aside>
                    <h4>{files.length === 0 ? "" : "Files"}</h4>
                    <ul>{files}</ul>
                </aside>
                <div>{this.state.msg ? this.state.msg : ""}</div>
            </section>
        );
    }
}