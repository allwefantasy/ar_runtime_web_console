import {AutoGenInput} from './autogens/AutoGenInput'
import {AutoGenSelect} from './autogens/AutoGenSelect'
import {AutoGenCheckBox} from './autogens/AutoGenCheckBox'

export class FormElementMapping{
    
    static mapping = {
        "Input":(row,form)=>{
            const input = new AutoGenInput(form,row.name)
            return input.build()
        },
        "Select": (row,form)=>{  
            const select = new AutoGenSelect(form,row.name,row.values)
            return select.build()
        },
        "CheckBox": (row,form)=>{  
            const checkbox = new AutoGenCheckBox(form,row.name,row.values)
            return checkbox.build()
        } 
    }


    /**
     * 
     * @param {Array} list 
     * @param {Number} n
     */
    static groupByNum(list,n){
      if(list.length === 0) return [list]
      if(list.length<=n) return [list]
      
      let stepSize = Math.floor(list.length/n)
      if(stepSize<list.length/n){
          stepSize = stepSize +1
      }
      const groups = []

      for(var groupNum=0;groupNum < n;groupNum++){
          const range = []
         for(var i= (groupNum*stepSize);i<Math.min(((groupNum+1)*stepSize),list.length);i++){             
            range.push(list[i])        
         }
         if(range.length>0){
            groups.push(range)
         }
         
      }      
      return groups
    }

    /**
     * 
     * @param {Array} list 
     * @param {Number} n
     */
    static groupByStepSize(list,stepSize){
        if(list.length === 0) return [list]
        if(list.length<=stepSize) return [list]
        
        let n = Math.floor(list.length/stepSize)
        if(n<list.length/stepSize){
            n = n +1
        }
        const groups = []

      for(var groupNum=0;groupNum < n;groupNum++){
          const range = []
         for(var i= (groupNum*stepSize);i<Math.min(((groupNum+1)*stepSize),list.length);i++){             
            range.push(list[i])        
         }
         if(range.length>0){
            groups.push(range)
         }
         
      }      
      return groups
      }

    
}
