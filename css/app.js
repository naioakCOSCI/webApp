const express=require('express');
const app=express();

app.get('/',function(req,res){
    res.json({message: 'Ahoy!'});
});

app.get("/parameter/:message", function(req, res) {
  const { params } = req; 
  res.json({ message: "Ahoy!", params});
});

// app.listen(9000,function(){
//     console.log("Application is running on port 9000");
// });

//use arrow function format
app.listen(9500, () => {
  console.log("Application is running on port 9500");
});