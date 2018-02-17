var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')
var secure = require('express-force-https')
// create the express app
var app = express()
// create middleware to handle the serving the app
app.use(secure)
app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )

// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})
// Create default port to serve the app on
var port = process.env.PORT || 5000
app.listen(port)
// Log to feedback that this is actually running
console.log('Server started on port ' + port)
