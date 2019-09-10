window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();

    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    const folderPath = document.getElementById("folderPath");
    const getFiles = document.getElementById("getFiles");
    const selectList = document.getElementById("selectList");
    
    const selectionJsx = "getSelection.jsx";
    const getOpenedPath = "getOpenedPath.jsx";
    class CallJsx{
        constructor(btn,jsx){
            this.jsx = jsx;
            this.btn = btn;
            this.btn.addEventListener("click",this);
        }
        handleEvent(){}
        
        callJsxFunction(){
            return new Promise(resolve=>{
                csInterface.evalScript(`$.evalFile("${extensionRoot}${this.jsx}")`,(o)=>{
                    resolve(o);
                });
            });
        }
    }
    
    class CallOpnedFolder extends CallJsx{
        constructor(btn,jsx){
            super(btn,jsx);
        }
        
        async handleEvent(){
            const folderPath = await this.callJsxFunction();
            alert(folderPath);
        }
    }
    
    const callPath = new CallOpnedFolder(folderPath,getOpenedPath);
    
    class GetSelectedFiles extends CallJsx{
        constructor(btn,jsx){
            super(btn,jsx);
            this.list = selectList;
        }
        
        async handleEvent(){
            const files = JSON.parse(await this.callJsxFunction());
            this.removeChild(this.list);
            files.forEach(f=>{
                const li = this.createList(this.list);
                li.textContent = `fileName::${f.name}`;
                li.dataset.fullPath = f.fullPath;
            });
        }
        
        createList(parent){
            const li = document.createElement("li");
            parent.appendChild(li);
            return li;
        }
        
        removeChild(parent){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }
        }
    }
    const seletion = new GetSelectedFiles(getFiles,selectionJsx);
}