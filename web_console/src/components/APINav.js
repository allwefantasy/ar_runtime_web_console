import * as React from "react";
import {Steps, Button, message, List, notification, Card, Col, Row} from 'antd';
import {ActionProxy} from "../service/ActionProxy";
import RemoteAction from "../service/RemoteAction"
import "./APINav.css"
import APIViewer from "./APIViewer";

const Step = Steps.Step;

export default class APINav extends React.Component {
    constructor(props) {
        super(props);
        this.router = props.router
        this.state = {
            current: 0,
            steps: [],
            apiNavId: props.apiNavId
        }

    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };


    async componentDidMount() {
        const proxy = new ActionProxy()
        const resp = await proxy.get(RemoteAction.LIST_APINavItems, {apiNavId: this.state.apiNavId, openType: "public"})
        if (resp.status === 200) {
            const items = resp.content.map((item, index) => {
                return {
                    title: item.title,
                    content: () => {
                        return <Card title={item.title} bordered={true}>
                            <APIViewer router={this.router} key={index} action={item.action}></APIViewer>
                        </Card>
                    }
                }
            })
            this.setState({steps: items})
        }

    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});


    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    render() {
        const {current} = this.state;
        if (this.state.steps.length == 0) {
            return <div>No Items Available</div>
        }
        return (
            <div className="api_nav">
                <div className="steps-action" style={{marginBottom: "30px"}}>
                    {
                        current < this.state.steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>Next Step</Button>
                    }
                    {
                        current === this.state.steps.length - 1
                        && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        current > 0
                        && (
                            <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                                Previous Step
                            </Button>
                        )
                    }
                </div>
                <div className={"steps-nav"}>
                    <Steps current={current}>
                        {this.state.steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                </div>
                <div className="steps-content" style={{"margin-top": "30px"}}>
                    {this.state.steps[current].content()}
                </div>

            </div>
        );
    }

}