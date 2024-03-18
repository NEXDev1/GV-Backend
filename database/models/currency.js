const { Schema, model } = require('mongoose');

const currencySchema = new Schema({
  currencyName: {
    type: String,
    unique: true,
    required: true
  },
  currencyRate: {
    type: Number,
    required: true
  }
});

const CurrencyModel = model('Currency', currencySchema);

module.exports = CurrencyModel;
