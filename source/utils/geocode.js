const request = require('request')


const geocode = (address,callback) => { 

    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ address +'&access_token=pk.eyJ1Ijoic2lkMjEyMyIsImEiOiJjbHloMjFkZnIwaGx4MmpwemNoNDJxMHA0In0.1c9o4aIvK2bnxNNZwHKJeA'
  
              request({url, json: true}, (error,{body}) => {  
                
               
                if(error){
                  callback('unable to fetch data from api or check your internet connectivity!',undefined)
                } else if(body.features == 0){
                  callback('please enter valid location!',undefined)
                } else {
                  callback(undefined,{
                    latitude : body.features[0].properties.coordinates.latitude,
                    longitude : body.features[0].properties.coordinates.longitude,
                    location:  body.features[0].properties.full_address
                    
                  }) 
                  console.log('system successfully fetched data from api')
                }
                
  
              })
  }        

  module.exports =  geocode
  
  