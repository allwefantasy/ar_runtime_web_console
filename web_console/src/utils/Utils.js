export class Utils {
    
    
    static setEqual=(a,b)=>{
        const temp1 = [...a]
        const temp2 = [...b]
        if(temp1.length!==temp2.length) return false
        let res = true
        temp1.forEach(item=>{
             if(temp2.indexOf(item) === -1){
                 res = false
             }
        })
        return res
    }

    /**
     *
     * Usage:
     *
     * convert flat array to tree structure
     *
     * input data：
     * [{"id":1,"icon":null,"label":null,"parentId":0},
     * {"id":2,"icon":"document","label":"jack","parentId":0},
     * {"id":3,"icon":"document","label":"dafe","parentId":0}
     * ]
     *
     * output:
     *
     * @param {[{id:number,icon:string,label:string,parentId:number,childNodes:[]}]} list
     */
    static buildTree = (list) => {
        let tempMap = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            tempMap[list[i].id] = i;
            list[i].childNodes = [];
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== 0) {
                try {
                    list[tempMap[node.parentId]].childNodes.push(node);
                } catch (e) {
                    console.log("------------")
                    console.log(node)
                    console.log(tempMap[node.parentId])
                }

            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    /**
     * example:
     * 
     * btn.onclick = throttle(function(){
           console.log("button clicked");
         }, 500);
     */
    static throttle = (fn, wait) => {
        let timer;
        return function (...args) {
            if (!timer) {
                timer = setTimeout(() => timer = null, wait);
                return fn.apply(this, args);
            }
        }
    }

    /**
     * example:
     * 
     * window.addEventListener("scroll", debounce(function(){
                console.log("scrolled");
            }, 500));
     */
    static  debounce = (fn, delay)=>{    
        var timer = null;    
        return function(...args){
          clearTimeout(timer);
          timer = setTimeout(() => fn.apply(this, args), delay);
        }
      }
    /**
       * 
       * @param {Array} list 
       * @param {Number} n
       */
    static splitListToNGroup(list, n) {
        if (list.length === 0) return [list]
        if (list.length <= n) return [list]

        let stepSize = Math.floor(list.length / n)
        if (stepSize < list.length / n) {
            stepSize = stepSize + 1
        }
        const groups = []

        for (var groupNum = 0; groupNum < n; groupNum++) {
            const range = []
            for (var i = (groupNum * stepSize); i < Math.min(((groupNum + 1) * stepSize), list.length); i++) {
                range.push(list[i])
            }
            if (range.length > 0) {
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
    static splitListToNGroupByStepSize(list, stepSize) {
        if (list.length === 0) return [list]
        if (list.length <= stepSize) return [list]

        let n = Math.floor(list.length / stepSize)
        if (n < list.length / stepSize) {
            n = n + 1
        }
        const groups = []

        for (var groupNum = 0; groupNum < n; groupNum++) {
            const range = []
            for (var i = (groupNum * stepSize); i < Math.min(((groupNum + 1) * stepSize), list.length); i++) {
                range.push(list[i])
            }
            if (range.length > 0) {
                groups.push(range)
            }

        }
        return groups
    }
}