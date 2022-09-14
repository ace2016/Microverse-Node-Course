'use strict';

/**
 * Main server configuration
 */
const config = {};

config.mongoURI = {
    dev: 'mongodb://localhost:27017/microverse',
    test: 'mongodb://localhost:27017/test'
};

module.exports = config;
