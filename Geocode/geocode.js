const request = require('request');

// Requesting for the data
var geocodeAddress = (address ,callback) =>{

    //Encoding address
    var address = encodeURIComponent(address);
    console.log(address);
    
    //Sending request
    request({
        url :`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json : true 
    },(error, response, body) => {
   
    //console.log(JSON.stringify(body, undefined, 2));

   if(error)
   {
        callback('Unable to connect to Google Server');
   }

   else if(body.status ==='ZERO_RESULTS')
   {
        callback('Unable to find that address');
   }
   
   else if (body.status === 'OK')
   {
       callback( undefined , {
           address : body.results[0].formatted_address,
           lattitude : body.results[0].geometry.location.lat,
           longitude : body.results[0].geometry.location.lng,
           status : body.status
       });
        
   }
   
}

);
}
// Getting weather
var getWeather = (lat, lng, callback) => 
{

     request({
         url : `https://api.darksky.net/forecast/addb2726398bb19695e05d88b4bf7c48/${lat},${lng}`,
         
     }, (error, response , body ) => {
        if(error)
        {
            callback('Unable to connect to Forecast.io serever');
        }        
        else if (response.statusCode === 400)
        {
            callback('Unable to fetch the weather ');
        }
        else if(response.statusCode === 200)
        {
            var obj = JSON.parse(body);
            callback(undefined, {
                temperature : obj.currently.temperature
            });
        } 
            
        }
     );
};

module.exports = {
    geocodeAddress,
    getWeather
};