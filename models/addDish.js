const mongoose = require('mongoose');

const Dish = mongoose.model("Dish",{
    dishName: {
        type: String
    },

    Price: {
        type: String
    },

    Category: {
        type: String
    },

    dishImage: {
        type: String
    }, 

})


module.exports = Dish;