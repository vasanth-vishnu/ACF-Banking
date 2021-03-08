const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// now after the schema is created now u can name it whatever you want 
const blogSchema =new Schema({
    title:{
        type:String,
        required: true
    },
    snippet : {
        type:String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

},{ timestamps: true });
const blog=mongoose.model('Blog',blogSchema);
module.exports=blog;