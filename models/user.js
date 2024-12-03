const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], // Simple email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Ensuring password has a minimum length
    },
    work: {
        type:String,
        required:true,
        workType:["chef", "manager","waiter", "owner"],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Auto-populate with the current date and time
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Auto-update when user info is modified
    },
});

// Middleware to update the `updatedAt` field before saving the document
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
