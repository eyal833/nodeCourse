const mongoose = require('mongoose');
const getRate = require('./scrape');
const symbolValue = require('../models/mongo/symbol-value');
const config = require('config');
const mysql = require('mysql2');
const util = require('util');

// Create a Mongoose schema for the data you want to save
const rateSchema = new mongoose.Schema(symbolValue.SymbolValueSchema);

// Create a Mongoose model based on the schema
const Rate = mongoose.model('Rate', rateSchema);

// Function to save the rate to MongoDB
async function saveRate(rate) {
    try {
      // Create a new Rate document
      const newRate = new Rate({ rate, symbol });
  
      // Save the document to MongoDB
      await newRate.save();
  
      console.log('Rate saved:', newRate);
    } catch (error) {
      console.error('Error saving rate:', error);
    }
  }
  
  const loop = async (connection) => {
    const symbols = await connection.query(`
        select distinct symbol from symbols 
    `)
    console.log ("loop: found this symbol array: "+ symbols);
    const promises = [];
    symbols.forEach(symbol => promises.push(getRate(symbol)));
    await Promise.allSettled(promises);
    console.log("looped through " + symbols)

    setTimeout(() => loop(connection), config.get('worker.interval'));
}

    (async () => {
        await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);
    
        const connection = mysql.createConnection({
            host: config.get('mysql.host'),
            user: config.get('mysql.user'),
            password: config.get('mysql.password'),
            database: config.get('mysql.database'),
            port: config.get('mysql.port'),
        })
    
        connection.connect = util.promisify(connection.connect);
        connection.query = util.promisify(connection.query);
    
        await connection.connect();
    
        console.log('connected to mysql');
    
        loop(connection);
        
    })();