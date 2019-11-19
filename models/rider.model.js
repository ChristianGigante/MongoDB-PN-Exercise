const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Rider model
let RiderSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Date, required: true },
    score: { type: [Number], required: false },
}, {
        collection: 'riders'
    });

// Export the Rider model
let Rider = mongoose.model('Rider', RiderSchema);
module.exports = { Rider }