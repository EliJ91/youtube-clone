const timeSince = date =>{
    var today = new Date().getTime()
    var posted = new Date(date).getTime()
    var res = Math.abs(today - posted) / 1000;
    var days = Math.ceil(res / 86400);
    var hours = Math.ceil(res / 3600);

    var unit = "hour";

    function checkValues(days, hours){
        if(hours>=24){
            unit = "day"
            return days
        }
        return hours
    }

    let time = checkValues(days, hours)

    return {time,unit}
}

export default timeSince;