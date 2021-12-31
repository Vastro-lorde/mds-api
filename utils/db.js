// Database connection function
const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DATABASE_URL ||'mongodb://localhost:27017/mater-dei-db'
// 
const mongodb = async ()=> { 
 
    try {
       await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
            
            console.log(`Database connection successful!`)    
    } catch (err) {
        console.log(DB)
        console.log(err)     
        
    }
    
    }
    
module.exports = mongodb;