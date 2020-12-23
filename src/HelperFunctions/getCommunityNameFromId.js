export var getCommunityNameFromId = (commId,commList) => {
if(commId && commList){
for (var i=0 ; i < commList.length ; i++){
    if(commList[i].pk == commId){
        return (commList[i].fields.entity_name) ;
    }
}
}


return "";
}
