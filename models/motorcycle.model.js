const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the motorcycle model :
// the motorcycle model contains :
// manufacturer (example : Honda, Yamaha, Suzuki, Ducati...)
// displacement (example: 1000cc, 765cc or 250 cc, this variable can be just a number)
// weight
// riderId
let motorSchema = new Schema({
    manufacturer: { type: String, required: true },
    displacement: { type: String, required: true },
    weight: { type: Number, required: true },
    riderId: { type: Schema.Types.ObjectId, ref: 'Rider' }
}, {
        collection: 'motorcycles'
    });

// Export the Motor model
let motorcycle = mongoose.model('motorcycles', motorSchema);

module.exports = { motorcycle }