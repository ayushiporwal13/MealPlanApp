import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        set: (username) => username.toLowerCase()
    },
    password:{
        type: String,
        required: true
    },
    preferences: {
        type: [String],
        default: []
    }
});

const User = mongoose.model('User', userSchema);

export default User;