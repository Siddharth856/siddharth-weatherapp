const express = require('express') 
const path = require('path') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// define path for express
const publicdirectorypath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//setup static directory
app.use(express.static(publicdirectorypath))    //used to customize the server

app.get('',(req,res)=>{
    res.render('index', {
       
        devloper:'siddharth tiwari',
        title:' Welcome to the Weather app!'
    })
})  

app.get('/about',(req,res) => {                // app.com (root route/1st route// domain)
    res.render('about',{ 
        devloper:'siddharth tiwari',
        title:'application of navigation!'

    })
}) 

app.get('/help',(req,res) => {                  // app.com/help(/help route, 2nd route)
    res.render('help',{
        helpText:"THIS APPLICATION PROVIDES  YOU THE PROPER WEATHER FORECAST INFORMATION FOR RESPECTIVE LOCATION ",
        title:'Weather app!',
        devloper:'siddharth tiwari'
    })
})

app.get('/weather',(req,res) => {           
    if(!req.query.address){
        return res.send({
            error:'enter a proper address'
        })
    } 
     geocode(req.query.address,(error,{latitude,longitude,location } = {}) => {
        if(error) {
            return res.send({error})
        } 
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            } 
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
     })
})  


app.get('/products',(req,res) => { 
    if (!req.query.search){ 
           return res.send({
                error:'you must provide a  proper search term'
            })
    }
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})


app.get('*',(req,res) => {                    //404 page
    res.render('404',{
        title:'404',
        name:'siddharth tiwari',
        errorMessage:'page not found'
    })
})

app.get('/help/*',(req,res) => {            //404 page using wildcard
    res.render('404',{
        title:'404 help!',
        name:'siddharth tiwari',
        errorMessage:'help article not found'
    })
}) 


// TO GET OP IN BROWSER WINDOW PORT3000 IS WRITTEN
app.listen(port, () => {
    console.log('Server is running on port 3000!')
})               