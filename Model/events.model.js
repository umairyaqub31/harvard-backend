const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({

    past: {
        type: String
    },
    current: {
        type: String
    },
    future: {
        type: String
    }
});
const Events = mongoose.model('Event',eventSchema)
module.exports = Events;