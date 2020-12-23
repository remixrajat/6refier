export var formatdatefunction = (backendDateobj, formatType) => {
    let returnDateValue = null;
    if(backendDateobj){
        let frontendDateObj = new Date(backendDateobj);
        // //console.log("date object",frontendDateObj);
        let monthArray = ["January" , "February", "March" , "April" , "May" , "June" , "July" , "August",
                            "September" , "October" , "November" , "December"];

        if(frontendDateObj){
            let day = frontendDateObj.getDate();
            let month = frontendDateObj.getMonth();
            let year = frontendDateObj.getFullYear();
            let hour = frontendDateObj.getHours();
            let min = frontendDateObj.getMinutes();

            min = min > 9 ? min : ("0" + min)

            if(formatType === 'short'){
                returnDateValue = day + ' / ' + (month + 1) + ' / ' + year;
            }
            else if(formatType === 'long'){
                returnDateValue = monthArray[month] + ' ' + day + ' , ' + year;
            }
            else if(formatType === 'time') {
                returnDateValue = hour < 12 ? 
                    hour + ":" + min + " AM" : 
                    hour === 12 ?
                        hour + ":" + min + " PM" :
                        hour - 12 + ":" + min + " PM";
            }
        }
    }
    return returnDateValue;
}
