const mongoose= require("mongoose");

const SlotSchema = new mongoose.Schema({
    
})

const AdventureDetailSchema = mongoose.Schema({
    adventureId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"adventure",
        required: true
    },
    description :{
        type:String,
        required: true
    },
    subtitile:{
        type:String,
        required: true
    },
    openingTime:{
        type:String,
        required: true,
        default: "10:00"
    },
    closingTime:{
        type : Strimg ,
        required: true,
        default: "18:00"
    },
    onlineBoooking:{
        type:Boolean,
        required: true,
        default: trusted,
    },

})

const AdventureDetailModel =  mongoose.model("adventuredetaild" , AdventureDetailSchema);

module.exports = AdventureDetailModel;