const { Schema,mongoose } = require('mongoose');

mongoose.connect("mongodb+srv://akash:Akashnikam%4025@cluster0.ljso97z.mongodb.net/paytm")
// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const AccountSchema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId, ref:"Users", required:true},
    balance:{
        type:Number,
        required: true
    }
})

// Create a model from the schema
const users = mongoose.model('Users', userSchema);
const account = mongoose.model('Account', AccountSchema);

module.exports = {
	users,
    account
};