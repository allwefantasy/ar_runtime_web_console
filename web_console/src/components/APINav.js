import * as React from "react";
import {Steps, Button, message, List, notification, Card, Col, Row} from 'antd';

const Step = Steps.Step;

export default class APINav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            steps:[]
        }
        
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description
        });
    };

    generateSteps() {
        const self = this
        return [{
            title: 'Create Team',
            content: () => {
                return <Card title={"input your team name"} bordered={true}>
                    <MLSQLCreateTeamForm parent={self}/>
                </Card>
            },
        }, {
            title: 'Create Role',
            content: () => {
                return <Card title={"Add new role to the team you have created"} bordered={true}>
                    <MLSQLAddRoleForTeam parent={self}/>
                </Card>
            },
        }, {
            title: 'Invite user to Role',
            content: () => {
                return <Card title={"Add member to the role you have created"} bordered={true}>
                    <MLSQLAddMemberForRole parent={self}/>
                </Card>
            }
        }, {
            title: 'Create Backend',
            content: () => {
                return <Card title={"Add the cluster information you have setup"} bordered={true}>
                    <MLSQLAddClusterBackend parent={self}/>
                </Card>
            }
        }, {
            title: 'Set default backend',
            content: () => {
                return <Card title={"Configure the default backend you want use"} bordered={true}>
                    <MLSQLConfigureDefaultBackend parent={self}/>
                </Card>
            }
        },
            {
                title: 'Congratulation!',
                content: () => {
                    return <Card title={"All Done"} bordered={true}>
                        Please go to Console
                    </Card>
                }
            }
        ];
    }

    componentDidMount() {
        this.setState({steps:this.generateSteps()}) 
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
        return (
            <div>
                <div className="steps-action" style={{marginBottom: "30px"}}>
                    {
                        current < this.steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>Next Step</Button>
                    }
                    {
                        current === this.steps.length - 1
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
                <Steps current={current}>
                    {this.steps.map(item => <Step key={item.title} title={item.title}/>)}
                </Steps>
                <div className="steps-content" style={{"margin-top": "30px"}}>
                    <Row gutter={24}>
                        <Col span={8}>


                        </Col>
                        <Col span={8}>
                            {this.steps[current].content()}

                        </Col>
                    </Row>

                </div>

            </div>
        );
    }

}