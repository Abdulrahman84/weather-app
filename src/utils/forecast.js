const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1db998676d1df7d0685c7fe8cde42568/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.currently.length === 0) {
            callback('unaable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees out. there is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast