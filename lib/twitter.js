'use strict'
require('dotenv').config()
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN
})

export const searchTweets = async (q, count) => {
  return client.get('search/tweets', {q, count})
}
