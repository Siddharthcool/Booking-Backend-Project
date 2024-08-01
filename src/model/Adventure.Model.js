const mongoose = require("mongoose");

const adventureSchema = mongoose.Schema({

    name :{
        type : String,
        required : true
    },
    cityId:{
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    category :{
        type:[String],
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    pricePerHead :{
        type: Number,
        required:true
    },
    currency:{
        type:String,
        default : "INR"
    }

});

var adventureModel = mongoose.model("adventure" , adventureSchema);

module.exports = adventureModel;