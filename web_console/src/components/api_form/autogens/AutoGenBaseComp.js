import {BaseComp} from "../../BaseReactComp/BaseComp";
import {ActionProxy} from "../../../service/ActionProxy";
import {Utils} from "../../../utils/Utils";
import {message} from 'antd';

export class AutoGenBaseComp extends BaseComp {
    /**
     *
     * @param {form:AutoGenForm,name:string,values:[],dependencies:[],action:string} props
     */
    constructor(props) {
        super(props)
        this.form = props.form
        this.name = props.name
        this.state = {values: props.values, data: props.data}

        this.forms = this.form.forms
        this.monitors = []
        this.dependencies = props.dependencies
        this.collect_dependencies = []
        this.action = props.action

        this.reload = this.reload.bind(this)
    }

    async reload(input) {
        if (input) {
            this.collect_dependencies.push(input)
        }
        const temp1 = new Set(Array.from(this.collect_dependencies).map(item => item.name))
        const temp2 = new Set(this.dependencies)


        if (Utils.setEqual(temp1, temp2)) {
            const proxy = new ActionProxy()
            const params = {}
            this.dependencies.forEach(item => params[item] = this.forms[item])
            const resp = await proxy.backend.request(this.action, params, "POST")
            if (resp.status === 200) {
                this.setState({values: resp.content})
            } else {
                message.error(resp.content, 6);
            }
        }
    }

    addMonitor = (monitor) => {
        this.monitors.push(monitor)
    }
}