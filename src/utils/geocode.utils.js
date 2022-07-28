const request = require('postman-request')

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZ2Fic3JvZHJpZ3VlcyIsImEiOiJjbDVtOGpiN3cwcjl0M2tvNG1weGd6eWZ5In0.UL8XD2ubnAjAXrfoDT4mFw&limit=1`

    request({url,json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to mapBox service!',undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search',undefined)
        } else {
            const {center,place_name} = body.features[0]
            const data = {
                latitude: center[0],
                longitude:  center[1],
                location: place_name
            }
            
            callback(undefined,data)
        }
    })

}

module.exports = {
    geocode,
}