const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Name should be present"],
        trim: true
    },
    title: {
        type: String,
        unique: true,
        required: [true, "Please put price"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price should be added"]
    },
    images: {
        type: [String],
        required: [true, "Provide Images"]
    },
    cnt: {
        type: Number,
        required: [true, "Please provide amount you want to put into DB"]
    }
})

module.exports = mongoose.model('Watches', watchSchema);