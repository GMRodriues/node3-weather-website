const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { hasSubscribers } = require('diagnostics_channel')
const {geocode} = require('./utils/geocode.utils')
const {forecast} = require('./utils/forecast.utils')



const app = express()

//Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars  engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide a address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude, location} = {}) => {
        if(error) {
            res.send({error})
        } else {
            return forecast({latitude,longitude}, (error,forcast) => {
                if(error) {
                    res.send({error})
                } else {
                    
                    res.send({
                        location,
                        forcast,
                        address: req.query.address
                    })
                }
            })
        }
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a serach term'
        })
    }
    res.send({
        prducts: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page not found',
        title: '404',
        name: 'Andrew Mead'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})