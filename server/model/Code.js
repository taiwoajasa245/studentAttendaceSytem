const mongoose = require('mongoose');
const uuid = '18F07'; 

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        default: uuid
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Code', codeSchema)
