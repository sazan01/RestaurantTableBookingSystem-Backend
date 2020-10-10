const mongoose = require('mongoose');

const Order = mongoose.model("Order",{
    name: {
        type: String
    },

    email: {
        type: String
    },

    dishname: {
        type: String
    },

    time: {
        type: String
    }, 

})


module.exports = Order;