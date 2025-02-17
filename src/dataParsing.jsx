export function convertHistoricalHospitalizationData(days){
    let result = [];
    for (const day of days){
        result = result.concat(convertDailyHospitalizationData(day));
    }
    return result;
}

export function convertDailyHospitalizationData(day){
    /*
        This converts a single row from the source CSV to an array of hospitalization rates
        Input:  DailyHospitalizationStats
        Output: Array of objects [GeoKey, Number] for each region for the day
    */

   let result = [];
   const date = day["Date"]
   for (const [key, value] of Object.entries(day)){
    if (key === "Date" || key === "ACT_Total_RSS99"){
        continue;
    } else{
        const numeric_value = value ? Number(value) : NaN;
        result.push({
            date: new Date(date + "T00:00:00"),
            date_str: new Date(date + "T00:00:00").toISOString().slice(0,10),
            id: Number(key.slice(-2)),
            hospitalizations: numeric_value,
        })
    }
   }
   return result;
}