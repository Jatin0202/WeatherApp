const request = require('postman-request')

const forecast = (latitude,longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=fde0fb78bbd9606b85e29533767fc592&query='+ encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '&units=f'
    request({url, json: true}, (error, {body}={})=> {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find loation',undefined)
        }
        else{
            callback(undefined,{
                temperature: body.current.temperature,
                precip: body.current.precip 
            })
        }
    })
}

module.exports = forecast