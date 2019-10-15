const mongoose = require("mongoose");

let Report = mongoose.model("reports",{
    weather : {
        type : String
    },
    temperature : {
        type : Number
    },
    humidity : {
        type : Number
    },
    name : {
        type : String
    }
})

module.exports = {Report};
