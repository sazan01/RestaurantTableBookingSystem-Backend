const mongoose = require('mongoose');
const Table = mongoose.model("Tables",{
    tableName: {
        type: String
    },

    tableSize: {
        type: String
    },

    Price: {
        type: String
    },

    tableImage: {
        type: String
    }, 

})


module.exports = Table;