
const geocode = require('./Geocode/geocode');
const inquirer = require('inquirer');
const yargs = require('yargs');

/** const argv = yargs
.options( {
    a : {
        demand : true,
        description : 'Address of the location',
        alias : 'address',
        string : true
    }
}).help().alias('help','h')
.argv;
**/
//Specifying Default Parameter
var question =[ {
   type : 'input',
   name : 'location',
   message : 'Enter the valid Address',
   default : 'India'
   
}];
inquirer.prompt(question).then(answer =>{
    var address = answer.location;

geocode.geocodeAddress(address, (errorMessage, results) => {
    if(errorMessage)
    {
        console.log(errorMessage);
    }
    else 
    {
        console.log(JSON.stringify(results, undefined, 2));

        geocode.getWeather(results.lattitude, results.longitude, (errorMessage, results) =>{
            if(errorMessage)
            {
                console.log(errorMessage);
            }
            else console.log(JSON.stringify(results, undefined, 2));
         } );
    }
            
    });

});

//addb2726398bb19695e05d88b4bf7c48