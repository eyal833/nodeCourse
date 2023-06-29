const axios = require('axios');
const cheerio = require('cheerio');

const getRate = async (symbol) => {
  const url = `https://www.google.com/finance/quote/${symbol}-USD`;
  const selector = ".YMlKec.fxKbKc";
  const {data} = await axios.get(url);

  // Use cheerio to load the HTML
  const $ = cheerio.load(data);

  // Now you can scrape values using jQuery-like syntax
  const value = $(selector).text().replace(",","");
  return value;
}
module.exports = getRate;
