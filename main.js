const express = require('express');
const app = express();
const dotenv = require('dotenv');

// const config = process.env;
dotenv.config();
const port = process.env.PORT || 3001;
const path = require('path')

const home_route = require('./routes/home_route');
const chart_route = require('./routes/chart_route');
const more_route = require('./routes/more_route');




// app.use('/api',home_route);
// app.use('/api',chart_route);
// app.use('/api',more_route);
app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use('/api',home_route)
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