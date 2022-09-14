'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title:  { type: String, index: true },
  description: String,
  date: { type: String },
});

/**
 * Export event model
 */
module.exports = eventSchema;
