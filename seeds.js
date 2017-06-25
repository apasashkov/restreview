var mongoose=require('mongoose');
var Restaraunt=require("./models/restaraunt.js");
var Comment=require("./models/comment.js");

var data=[
  {
    name:"Best restaraunt",
    image:"https://cdn.pixabay.com/photo/2014/09/13/21/30/dinner-table-444434__340.jpg",
    description:"Hexagon marfacenester, pork belly celiacalvia yr    bushwick meggings flannel austin vexillologist. Food truck narwhal cred, celiac hoodie roof party lo-fi irony ugh fashion axe kogi organic taxidermy hexagon occupy. Poke heirloom church-key drinking vinegar migas. Lyft gluten-free bitters, thundercats before theyold   out fingerstache vinyl gochujang echo park prism portland godard. Enamel pin brooklyn flexitarianwag, roof party man bun vegan drinking vineg ar. Single-origin coffee mumblecore crucifix, wolf tote bag beard banh mi locavore keffiyeh gastropub. Semiotics distillery farm-to-table, asymmetrical beard man bun chambray trust fund. Coloring book kogi pitchfork paleo meggings iPhone pabst wayfarers plaidemiotics poutine cronut besp oke post-ironicubway tile. Snackwave portland poutine, gentrify listi cle viceeitan craft beer mustache poke pok pok keffiyeh. Etsy portlan d adaptogen hashtag williamsburg DIY edison bulb vice pork belly viral next level lyft cred chicharrones yuccie."
  },
  {
    name:"My favourite rest",
    image:"https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952__340.jpg",
    description:"Hexagon marfacenester, pork belly celiacalvia yr    bushwick meggings flannel austin vexillologist. Food truck narwhal cred, celiac hoodie roof party lo-fi irony ugh fashion axe kogi organic taxidermy hexagon occupy. Poke heirloom church-key drinking vinegar migas. Lyft gluten-free bitters, thundercats before theyold   out fingerstache vinyl gochujang echo park prism portland godard. Enamel pin brooklyn flexitarianwag, roof party man bun vegan drinking vineg ar. Single-origin coffee mumblecore crucifix, wolf tote bag beard banh mi locavore keffiyeh gastropub. Semiotics distillery farm-to-table, asymmetrical beard man bun chambray trust fund. Coloring book kogi pitchfork paleo meggings iPhone pabst wayfarers plaidemiotics poutine cronut besp oke post-ironicubway tile. Snackwave portland poutine, gentrify listi cle viceeitan craft beer mustache poke pok pok keffiyeh. Etsy portlan d adaptogen hashtag williamsburg DIY edison bulb vice pork belly viral next level lyft cred chicharrones yuccie."
  },
  {
    name:"Restaraunt for everyone",
    image:"https://cdn.pixabay.com/photo/2012/12/20/10/13/table-71380__340.jpg",
    description:"Hexagon marfacenester, pork belly celiacalvia yr    bushwick meggings flannel austin vexillologist. Food truck narwhal cred, celiac hoodie roof party lo-fi irony ugh fashion axe kogi organic taxidermy hexagon occupy. Poke heirloom church-key drinking vinegar migas. Lyft gluten-free bitters, thundercats before theyold   out fingerstache vinyl gochujang echo park prism portland godard. Enamel pin brooklyn flexitarianwag, roof party man bun vegan drinking vineg ar. Single-origin coffee mumblecore crucifix, wolf tote bag beard banh mi locavore keffiyeh gastropub. Semiotics distillery farm-to-table, asymmetrical beard man bun chambray trust fund. Coloring book kogi pitchfork paleo meggings iPhone pabst wayfarers plaidemiotics poutine cronut besp oke post-ironicubway tile. Snackwave portland poutine, gentrify listi cle viceeitan craft beer mustache poke pok pok keffiyeh. Etsy portlan d adaptogen hashtag williamsburg DIY edison bulb vice pork belly viral next level lyft cred chicharrones yuccie."
  },
  {
    name:"Good place",
    image:"https://cdn.pixabay.com/photo/2013/09/05/10/38/restaurant-bern-179046__340.jpg",
    description:"Hexagon marfacenester, pork belly celiacalvia yr    bushwick meggings flannel austin vexillologist. Food truck narwhal cred, celiac hoodie roof party lo-fi irony ugh fashion axe kogi organic taxidermy hexagon occupy. Poke heirloom church-key drinking vinegar migas. Lyft gluten-free bitters, thundercats before theyold   out fingerstache vinyl gochujang echo park prism portland godard. Enamel pin brooklyn flexitarianwag, roof party man bun vegan drinking vineg ar. Single-origin coffee mumblecore crucifix, wolf tote bag beard banh mi locavore keffiyeh gastropub. Semiotics distillery farm-to-table, asymmetrical beard man bun chambray trust fund. Coloring book kogi pitchfork paleo meggings iPhone pabst wayfarers plaidemiotics poutine cronut besp oke post-ironicubway tile. Snackwave portland poutine, gentrify listi cle viceeitan craft beer mustache poke pok pok keffiyeh. Etsy portlan d adaptogen hashtag williamsburg DIY edison bulb vice pork belly viral next level lyft cred chicharrones yuccie."
  },
  {
    name:"Strange place",
    image:"https://cdn.pixabay.com/photo/2017/05/29/15/54/brandy-2354051__340.jpg",
    description:"Hexagon marfacenester, pork belly celiacalvia yr    bushwick meggings flannel austin vexillologist. Food truck narwhal cred, celiac hoodie roof party lo-fi irony ugh fashion axe kogi organic taxidermy hexagon occupy. Poke heirloom church-key drinking vinegar migas. Lyft gluten-free bitters, thundercats before theyold   out fingerstache vinyl gochujang echo park prism portland godard. Enamel pin brooklyn flexitarianwag, roof party man bun vegan drinking vineg ar. Single-origin coffee mumblecore crucifix, wolf tote bag beard banh mi locavore keffiyeh gastropub. Semiotics distillery farm-to-table, asymmetrical beard man bun chambray trust fund. Coloring book kogi pitchfork paleo meggings iPhone pabst wayfarers plaidemiotics poutine cronut besp oke post-ironicubway tile. Snackwave portland poutine, gentrify listi cle viceeitan craft beer mustache poke pok pok keffiyeh. Etsy portlan d adaptogen hashtag williamsburg DIY edison bulb vice pork belly viral next level lyft cred chicharrones yuccie."
  }
]


function  seedDB(){
  ////remove all restaraunts
  Restaraunt.remove({},function(err){
    if(err){
      console.log(err);
    } else {
      console.log('remove restaraunts');
     
      //add restaraunts 
      data.forEach(function(seed){
        Restaraunt.create(seed,function(err,createdRestaraunt){
          if(err){
            console.log(err);
          }else {
            console.log("Added restaraunt");
            //create a comment
            Comment.create({
              text:"this place is great and I wish there was wi fi",
              author:"Homer"
            },function(err,comment){
              if(err){
                console.log(err);
              } else {
                createdRestaraunt.comments.push(comment);
                createdRestaraunt.save();
                console.log("created new comment")
              }
            })
          }
        });
      })
    }
  });
}

module.exports=seedDB;
