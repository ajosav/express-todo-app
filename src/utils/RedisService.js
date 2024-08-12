const { createClient } = require('redis');

const client = createClient();

(async () => client
                .on('error', err => console.log('Redis Client Error', err))
                .on('connect', () => console.log('Redis connection was successful'))
                .connect())()

module.exports = client;