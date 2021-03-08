const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const accountSchema=new Schema({
    Name:{type:String,required:true},
    Accountno:{type:String,required:true},
    Email:{type:String,required:true},
    CurrentBal:{type:Number,required:true}
});

const acc=mongoose.model('Account',accountSchema);
module.exports=acc;