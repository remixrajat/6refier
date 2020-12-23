export var handleNullStringWhileConcatenation = (parameterToCheck, prefix = "", postfix = "") => {
    if(parameterToCheck === "" || parameterToCheck === null){
        return "";
    }
    else{
        return (prefix + parameterToCheck + postfix);
    }
}