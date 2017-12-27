const axios = require('axios');
const yargs = require('yargs');

const argv = yargs.options({
    a : {
        demand : true,
        alias : 'address',
        description : 'Address of the location',
        string : true
    }
})
.help()
.alias('help','h')
.argv;

var geocodeEncode = encodeURIComponent(argv.a);
var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeEncode}`;

axios.get(geoCodeURL).then((response) =>
{
    if(response.data.status === 'ZERO_RESULTS')
    {
        throw new Error('Unable to find that address');
    }
    else if(response.data.status === 'OK')
    {
        console.log('Address : ', response.data.results[0].formatted_address);
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        
        var geoWeatherURL =`https://api.darksky.net/forecast/addb2726398bb19695e05d88b4bf7c48/${lat},${lng}`;
         return axios.get(geoWeatherURL); 
    }
}).then((response) =>{
    var temperature = response.data.currently.temperature;
    console.log('Temperature : ', temperature);
}
).catch((e) =>{
if(e.code === 'ENOTFOUND')
{
    console.log('Unable to connect');
}
else console.log(e.message);

});



//addb2726398bb19695e05d88b4bf7c48