const express = require('express');
const app = express();
const port = 5001;

const home_route = require('./routes/home_route');
const chart_route = require('./routes/chart_route');
const more_route = require('./routes/more_route');


app.use('/api',home_route);
app.use('/api',chart_route);
app.use('/api',more_route);

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