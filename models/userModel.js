const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: [true, "Provide login"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide password"],
        minlength: 6,
        select: false
    },
    passwordConfirm:{
        type: String,
        required: [true, "Provide repeated passport"],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            message: "Password is not the same"
        }
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please provide valid email']
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.checkPassword = async function(candidatePassword, password){
    return await bcrypt.compare(candidatePassword, password);
}

module.exports = mongoose.model('User', userSchema);