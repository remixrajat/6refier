export var convertStringToJson =(stringVal) => {
     if(stringVal){
            //console.log("strval",stringVal)
            // let str2 = stringVal.replace(/'/g, "\\'").replace(/"/g, "\\\"").replace(/None/g, "null").replace(/False/g, "false").replace(/True/g, "true");
            
            let str2 = stringVal.replace(/'/g, "\"").replace(/None/g, "null").replace(/False/g, "false").replace(/True/g, "true");
            let strValJson =   null; 
            try
            {strValJson = JSON.parse(str2);}
            catch(err)
            {
                return null;}
            return strValJson;
        }
        return null;
}