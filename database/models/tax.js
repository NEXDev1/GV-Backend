const { Schema, model } = require('mongoose');

const taxSchema = new Schema({
  taxName: {
    type: String,
    unique: true,
    required: true
  },
  taxPercentage: {
    type: Number,
    required: true
  }
});

const TaxModel = model('Tax', taxSchema);

module.exports = TaxModel;
