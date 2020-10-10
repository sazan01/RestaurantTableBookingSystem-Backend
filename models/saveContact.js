const mongoose = require('mongoose');

const Contacts = mongoose.model("Contacts",{
    name: {
        type: String
    },

    email: {
        type: String
    },

    phone: {
        type: String
    },

    sub: {
        type: String
    }, 

    message: {
        type: String
    }, 

})


module.exports = Contacts;