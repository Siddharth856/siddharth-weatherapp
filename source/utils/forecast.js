const request = require('request')

const forecast = (latitude,longitude,callback) => { 
    const url = 'https://api.weatherstack.com/current?access_key=cce227cc1f7a2f3cda500d16625ff1ee&query=' +  latitude + ',' + longitude + '&units=f'
    request({url, json: true},(error,{body})=> {
      

        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('enter a valid co-ordinates!',undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0] + ".  It is currently "  + body.current.temperature + "degress out there. It feels like  " + body.current.pressure + "pressure of air which is risky because of this the speed of the wind is" + body.current.wind_speed + "instructing people to please maintain guidelines provided by respective officials ") 
            console.log('CO-ORDINATES has been fetched successfully!')
           
        }
    })
    
}

module.exports = forecast