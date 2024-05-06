const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?place='+ address + '&access_token=pk.eyJ1Ijoid2VhcmVuZXJvcyIsImEiOiJjbHZrd2U5MHQxdTh4MmpvNW9mYXU5M2J0In0.KZnu1NC1MMPJN6tv37i9jg&limit=1'

    request({url, json: true}, (error, {body} = {}) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.features.length === 0) {
            callback('Could not find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode

// geocode('Boston', (error, data) => {
//     if (error) {
//         return console.log('Error', error)
//     }
//     console.log('Data', data)
// })





// const mapboxUrl = 'https://api.mapbox.com/search/geocode/v6/forward?place=Washington%20dc&access_token=pk.eyJ1Ijoid2VhcmVuZXJvcyIsImEiOiJjbHZrd2U5MHQxdTh4MmpvNW9mYXU5M2J0In0.KZnu1NC1MMPJN6tv37i9jg&limit=1'


// request({url: mapboxUrl, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.features.length === 0) {
//         console.log('Could not find location')
//     } else {
//         const lon = response.body.features[0].geometry.coordinates[0]
//         const lat = response.body.features[0].geometry.coordinates[1]
//         console.log(lon, lat)
//     }
    
// })