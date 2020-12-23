import {compareObjects} from './compareObjects'

export var compareArrays = (arr1, arr2) => {
    if(arr1 == null && arr2 == null){
        return true;
    }
    if(arr1 && arr2){
        if(arr1.length !== arr2.length){
        return false;
    }
        arr1 = arr1.sort();
        arr2 = arr2.sort();

    for(let i=0 ; i < arr1.length; i++){
        if(!compareObjects(arr1[i] , arr2[i])){
            return false;
        }
    }
    return true;
    }
else{
    return false;
}
    

}