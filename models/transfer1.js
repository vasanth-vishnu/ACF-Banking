const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const transSchema=new Schema({
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    },
    Amount:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    }

});
const us1=mongoose.model('Transfertable',transSchema);
module.exports=us1;

