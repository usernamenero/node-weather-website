const request = require('request')

const weatherstack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=86e9f0489d47de35281d05fcb67ec20a&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 

                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out and it feels like ' + body.current.feelslike + ' degrees out.'
            )
        }
    })
}


module.exports = weatherstack