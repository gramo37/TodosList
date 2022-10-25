const mongoose = require('mongoose');

const sampleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more number of characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    }
});

// A event that will run before a user is saved in database
sampleSchema.pre("save", async function (next) {

})

// Functions in model
sampleSchema.methods.getJWTToken = function () {
    
}

const sampleModel = new mongoose.model("User", sampleSchema);   // Creates a collection with name: "Users"

module.exports = sampleModel;