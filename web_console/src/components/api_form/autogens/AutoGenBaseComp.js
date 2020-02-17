import { BaseComp } from "../../BaseReactComp/BaseComp";
import { ActionProxy } from "../../../service/ActionProxy";

export class AutoGenBaseComp extends BaseComp {
   /**
     * 
     * @param {form:AutoGenForm,name:string,values:[],dependencies:[],action:string} props
     */
    constructor(props){
        super(props)
        this.form = props.form
        this.name = props.name                        
        this.state = {values:props.values}

        this.forms = this.form.forms                        
        this.monitors = []
        this.dependencies = props.dependencies
        this.collect_dependencies = new Set()
        this.action = props.action

        this.reload = this.reload.bind(this)
      }

      async reload (input){
        this.collect_dependencies.add(input)        
        const temp2 = new Set(this.dependencies)
        if(this.collect_dependencies===temp2){          
          const proxy = new ActionProxy()
          const params = {}
          this.dependencies.forEach(item=>params[item]=this.forms[item])
          const resp = await proxy.backend.request(this.action,params)
          this.setState({values:resp.content[0].values})
        }
      }

      addMonitor=(monitor)=>{
        this.monitors.push(monitor)
      }
}