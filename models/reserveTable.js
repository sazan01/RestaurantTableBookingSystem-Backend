const mongoose = require('mongoose');

const Reservation = mongoose.model("Reservation",{
    date: {
        type: String
    },

    time: {
        type: String
    },

    num: {
        type: String
    },

    name: {
        type: String
    }, 

})


module.exports = Reservation;