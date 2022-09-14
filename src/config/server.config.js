'use strict';

/**
 * Main server configuration
 */
const config = {
    port: process.env.NODE_ENV === 'dev' ? 4000 : 3000,
    url: 'localhost',
    env: process.env.ENV === 'dev' ? 'dev' : 'test'
};

module.exports = config;
