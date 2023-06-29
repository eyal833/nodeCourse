const mongoose = require('mongoose');

const SymbolValueSchema = new mongoose.Schema({
    symbol: String,
    value: Number,
    createdAt: { type: Date, default: Date.now },
});

const SymbolValue = mongoose.model('SymbolValue', SymbolValueSchema);

module.exports = SymbolValue;