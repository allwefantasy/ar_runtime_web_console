import React from 'react'
import {AutoGenBaseComp} from './AutoGenBaseComp';
import Dropzone from 'react-dropzone'
import {fromEvent} from 'file-selector';
import request from "superagent";
import {BACKEND_URL} from "../../../service/backend/RestConst";
import './AutoGenUpload.css'
import {getUserInfo} from "../../../user/user";
import {GlobalParamNames} from "../../../service/Dicts";

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
            action: props.action,
            values: props.values, data: props.data
        }
    }

    handleChange = (event) => {

    }

    onDrop = (files) => {
        this.setState({files})
        const params = {}

        const {token, userName} = getUserInfo()

        if (userName) {
            params[GlobalParamNames.USER_NAME] = userName
        }

        if (token) {
            params[GlobalParamNames.LOGIN_TOKEN] = token
        }

        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        let newurl = BACKEND_URL + "?" + "action=" + this.state.action + "&" + formBody.join("&")

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
        console.log(this.state)

        const files = this.state.files.map(f => (
            <li key={f.name}>
                {f.path} - {f.size} bytes
            </li>
        ))

        return (
            <section className={"fileListStyle"}>
                <div>
                    <div className="my-2 text-lg">{this.state.data?.options.label || this.state.data?.name}</div>
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