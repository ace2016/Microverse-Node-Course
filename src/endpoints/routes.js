'use strict';

/**
 * Load express library
 */
const express = require('express');

/**
 * Load enpoints files
 */
const event = require('./event.endpoint.js');

/**
 * API Endpoints defined for REST
 */
const routes = (app) => {
    app.use('/event', event);
};

module.exports = routes;
