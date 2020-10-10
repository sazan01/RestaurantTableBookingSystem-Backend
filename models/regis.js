const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },

    email: {
        type: String
    },

    pass: {
        type: String
    },

    re_pass: {
        type: String
    }, 

    usertype: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


})

//checking username and password 
userSchema.statics.checkCrediantialsDb = async(email, pass) => {
    const user1 = await User.findOne({ email: email, pass: pass })
    return user1;
}

//token generating part
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisloginuser')

    console.log(token);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    console.log("Login initiated");
    console.log(user);
    return token;
}




const User = mongoose.model('User', userSchema);
module.exports = User;