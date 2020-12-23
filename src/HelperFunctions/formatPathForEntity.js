export var formatPathForEntity = (entity) => {
    if(!entity){
        return "";
    }
    let pathToReturn = "";
    let path = entity.path;
    let ifDashExists = path.indexOf('-');
    let trimmedPath
    if (ifDashExists == -1) {
        trimmedPath = path
    } else {
        trimmedPath = path.substring(path.indexOf('-')+2);
    }
    // console.log("formatPathForEntity :: path , trimmedPath : ", path, trimmedPath)
    if(trimmedPath){
        pathToReturn = entity.type + " " + trimmedPath;
    }
    else{
        pathToReturn = path;
    }
    return pathToReturn;
}