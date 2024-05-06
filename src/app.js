const path  = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weatherstack = require('./utils/weatherstack.js')

const app = express()
// listen to heroku port
const port = process.env.PORT || 3000


//// Define paths for express config
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nero'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Nero'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        description: 'Get help from us here',
        name: 'Nero'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                // error: error
                error
            })
        }
        weatherstack(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address,
                location,
                forecastData
            })
        })
    })

    // res.send({
    //     address: req.query.address,
    //     location: 'Philadephia',
    //     forecast: 'Cloudy. Its currently 57 degrees out and it feels like 47 degrees out'
    // })
})

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search'
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nero',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nero',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})