var mongoose=require("mongoose");
//we use data association by reference of author
//to commentSchema with the (ref)erence to
//User model. So on comment db entry we will
//store user's is and username
var commentSchema=mongoose.Schema({
  text:String,
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  }
})
var Comment=mongoose.model("Comment",commentSchema);



module.exports=Comment;






