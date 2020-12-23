import {formatPathForEntity} from "./formatPathForEntity";

export var searchEntitiesInTree = (treeJson,searchString,resultSet=[]) => {
    if(treeJson == null || treeJson == [] || searchString == "" || searchString == null){
        return resultSet;
    }
    let searchStringWithoutSpace = searchString.replace(/\s/g,'').toLowerCase();
    for(let i=0 ; i < treeJson.length ; i++){
        let pathValue = formatPathForEntity(treeJson[i]);
        let pathToMatch = pathValue.replace(/\s/g, '').toLowerCase();
        if (treeJson[i].type !== "Student") {
            if (pathToMatch.indexOf(searchStringWithoutSpace) !== -1) {
                let searchElement = {};
                searchElement.id = treeJson[i].value;
                searchElement.value = pathValue;
                searchElement.label = pathValue;
                resultSet.push(searchElement);
            }
            if (treeJson[i].children && treeJson[i].childrenType !== "Subject") {
                resultSet = searchEntitiesInTree(treeJson[i].children, searchString, resultSet);
            }
        }
    }
    return resultSet.slice(0,10);
}