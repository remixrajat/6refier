export var getHierarchyStringOfSchool = (schoolTreeJson, return_str = "") => {
    if(schoolTreeJson){
        for(let i=0; i < schoolTreeJson.length ; i++){
            if(schoolTreeJson[i].childrenType && schoolTreeJson[i].childrenType != "Subject" && schoolTreeJson[i].children){
                return_str = return_str + schoolTreeJson[i].childrenType + "-";
                return_str = getHierarchyStringOfSchool(schoolTreeJson[i].children, return_str);
                break;
            }
        }
    }
    if(return_str.slice(-1) == "-"){
    return_str = return_str.substring(0, return_str.length - 1);
    }
    return return_str;
}