const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: Object
    }
});

const todoModel = new mongoose.model("todo", todoSchema);

module.exports = todoModel;