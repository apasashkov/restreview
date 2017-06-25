var mongoose=require('mongoose');
//Schema  setup
var restrauntSchema=new mongoose.Schema({
  name:String,
  price:Number,
  image:String,
  description:String,
  locatiob:String,
  lat:Number,
  lng:Number,
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  },
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
  
});

module.exports=mongoose.model("Restaraunt",restrauntSchema);
