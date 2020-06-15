const geocode= require('../utils/geocode')
const forecast= require('../utils/forecast') 
const path= require('path')
const express= require('express')
const hbs= require('hbs')


const app= express()
const port= process.env.PORT || 3000

// Define paths for xpress config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPaths= path.join(__dirname,'../templates/partials')

// set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather APP',
        name: 'JATIN'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Weather APP',
        name: 'JATIN'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Weather APP',
        name: 'JATIN'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'Please provide an address'
        })
    }
    else{
        const address = req.query.address
        geocode(address , (error, {latitude,longitude,location}={} ) => {
            if(error){
                res.send({
                    error: error
                })
            }
            else{
                forecast(latitude,longitude, (error,{temperature,precip}={}) => {
                    if(error){
                        res.send({
                            error: error
                        })
                    }
                    else{
                        res.send({
                            location: location,
                            temperature: "Temperature is "+ temperature + " and precipitation is "+ precip,
                            precip: precip
                        })    
                    }
                })
            }
        })    
    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: 'YOU must find product'
        })
    }
    else{
        console.log(req.query)
        res.send({
            products: []
        })
    }
    
})



/* 


if(process.argv.length === 2){
    console.log('Please enter place')
}
else{
    
    
}


*/

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Article not found' 
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        error:'404 Page' 
    })
})

app.listen(port, ()=>{
    console.log('Server is UP on port 3000')
})
// app.com
// app.com/help
// app.com/about