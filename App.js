const express = require('express');

const App=express()

App.use(express.json())

const port=process.env.ENV_PORT || 1818


App.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})