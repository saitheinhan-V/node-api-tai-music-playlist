const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// const config = process.env;
dotenv.config();
const port = process.env.PORT || 3001;
const path = require('path')
const imageDir = path.join(__dirname,'uploads'); 

const home_route = require('./routes/home_route');
const chart_route = require('./routes/chart_route');
const more_route = require('./routes/more_route');
const file_upload = require('./routes/file_upload');

app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use(bodyParser.json({limit: '50mb'}))
.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
.use(express.static(imageDir)) //call image from uploads folder in project
.use('/api',home_route)
.use(file_upload)
.use(express.json())
.use(express.urlencoded({ extended: true }))
// .get('/', (req, res) => res.render('pages/index'))
.use('/test',(req, res) => {
  res.json({
    message: "TEST successful"
  })
})




// This should be the last route else any after it won't work
app.use("/", (req, res) => {
    res.status(404).json({
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });

app.listen(port,()=>{
    console.log('Server is listening at ',port);
});