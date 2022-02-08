import React from 'react'
import brace from 'brace';
import 'brace/ext/searchbox';
import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import {Resizable} from "re-resizable";
import { AutoGenBaseComp } from './AutoGenBaseComp';


export class AutoGenEditor extends AutoGenBaseComp{
    /**
     * 
     * @param {AutoGenForm} form 
     */
    constructor(props){
        super(props)        
        this.language = (props.values.values[0] && props.values.values[0].name) || "python"
      }
      
      handleChange = (event)=>{        
        this.forms[this.name]= this.editorRef.editor.getValue()
        this.monitors.forEach(monitor=>monitor.reload(this))
      }

      render(){        
        return (
          <div>
            <div>{this.state.data.options?.label || this.name}</div>
          <Resizable defaultSize={{height: "500px"}} onResize={()=>{this.editorRef.editor.resize();}}>
          <AceEditor
          ref={item=>this.editorRef=item}
          mode={this.language}
          theme="github"
          width={"100%"}
          height={"100%"}
          onChange={this.handleChange}
          name="mlsql_editor"
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          editorProps={{
              $blockScrolling: Infinity
          }}
          setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
              autoScrollEditorIntoView: true
          }}
      /></Resizable>
      </div> 
      
                      
        );
      }
}