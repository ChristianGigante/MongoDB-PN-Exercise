const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the motorcycle model :
// the motorcycle model contains :
// manufacturer (example : Honda, Yamaha, Suzuki, Ducati...)
// displacement (example: 1000cc, 765cc or 250 cc, this variable can be just a number)
// weight
// riderId
let motorcycleSchema = new Schema({
    manufacturer: { type: String, required: true },
    displacement: { type: String, required: true },
    weight: { type: String, required: true },
    riderId: { type: Schema.Types.ObjectId, ref: 'riders' }
}, {
        collection: 'motorcycles'
    });

let motorcycle = mongoose.Schema('motorcycle', motorcycleSchema);
// Don't forget to export the Rider model :

module.exports = { motorcycle }