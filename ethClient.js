'use strict';

require('dotenv').config();
const { API_URL, API_URL_WS } = process.env;

module.exports = Web3 => ({
    web3http: new Web3(new Web3.providers.HttpProvider(API_URL)),
    web3: new Web3(new Web3.providers.WebsocketProvider(API_URL_WS))
})