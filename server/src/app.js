const express = require('express')
const app = express()
app.listen(3400, function()
{console.log(`Server is listening on port 3400`)})
module.exports = app;