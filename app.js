const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000
// const baseUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&autoparse=true`

const generateScraperUrl = apiKey => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API.')
})

// TEST productId: B07K8ZC6Y3
// GET Product details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const { apiKey } = req.query

  try {
    const { data } = await axios.get(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`)

    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params
  const { apiKey } = req.query

  try {
    const { data } = await axios.get(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`)

    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params
  const { apiKey } = req.query

  try {
    const { data } = await axios.get(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params
  const { apiKey } = req.query

  try {
    const { data } = await axios.get(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`)

    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))