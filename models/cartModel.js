const mongoose = require('mongoose');
const crypto = require('crypto');

const cartSchema = new mongoose.Schema({
    items: {
        type: Array,
        nested: {
            id_item: { type: String },
            cnt: { type: Number }
        },
        required: true,
        default: [{id_item: 'Nothing', cnt: 11}]
    },
    dateExpires: Date
})

cartSchema.pre('save', async function(next) {
    this.dateExpires = Date.now() +  7 * 24 * 60 * 60 * 1000;
})

const modelCart = mongoose.model('Cart', cartSchema);
module.exports = modelCart;