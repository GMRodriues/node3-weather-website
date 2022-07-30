const request = require('postman-request')

const forecast = ({longitude,latitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5455fd5d15841f82e5cbeaacba44ca4b&query=${longitude},${latitude}&units=m`

    request({url,json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const {temperature, feelslike, weather_descriptions,humidity} = body.current

            // callback(undefined,response)
            
            callback(undefined,`${weather_descriptions}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out. The humidity is ${humidity}%`)
        }
    })

}

module.exports = {
    forecast,
}