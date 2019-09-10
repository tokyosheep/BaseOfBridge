(function(){
    var doc = app.document;
    var selectList = doc.selections;
    var selectFiles = [];
    for(var i=0;i<selectList.length;i++){
        var selectData = {};
        selectData.name = selectList[i].name;
        selectData.fullPath = selectList[i].path;
        selectFiles[i] = selectData;
    }
    return JSON.stringify(selectFiles);
})();