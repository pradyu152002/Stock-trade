var stockRate=0,returns=0,capital = 10000,investedAmount=0,startTime,endTime,timeElapsed;

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');



app.get("/",function(req,res){
  res.render("home",{capitalAmount:capital,earnings:returns});
});

app.post("/stockSelect",function(req,res){
   console.log("You have selected stock "+req.body.stocks);
   switch (req.body.stocks) {
     case "1":
       stockRate=1.4;
       console.log(stockRate);
     break;

     case "2":
       stockRate=1.1;
       console.log(stockRate);
     break;

     case "3":
       stockRate=0.8;
       console.log(stockRate);
     break;

     case "4":
       stockRate=1.3;
       console.log(stockRate);
     break;

     case "5":
       stockRate=0.7;
       console.log(stockRate);
     break;

     case "6":
       stockRate=0.6;
       console.log(stockRate);
     break;

     case "7":
       stockRate=1.1;
       console.log(stockRate);
     break;

     case "8":
       stockRate=1.2;
       console.log(stockRate);
     break;

     case "9":
       stockRate=0.9;
       console.log(stockRate);
     break;

     case "10":
       stockRate=1.3;
       console.log(stockRate);
     break;

     default:
       console.log("check stock");

   }

});

app.post("/buy",function(req,res){
  if(investedAmount === 0){
    if(req.body.investmentAmount>capital){
      console.log("Cannot invest due to capital deficit");
      res.redirect("/");
    }else{
      investedAmount = req.body.investmentAmount;
      capital -= investedAmount;
      console.log("You have invested "+investedAmount+" rs.");
      console.log("Youre left with "+capital+" rs.");
      startTime = new Date();
      console.log("start time is:");
      console.log(startTime);
      res.redirect("/")
    }

  }else{
    console.log("Cannot invest twice!!")
    res.render("restrict");
  }

});


app.post("/sell",function(req,res){
 if(returns === 0){
   endTime = new Date();
   console.log("end time is:");
   console.log(endTime);
   timeElapsed = (endTime-startTime)/1000;
   console.log("Time elapsed since investment is: ");
   console.log(timeElapsed);
   if(timeElapsed<10){
     console.log("Cannot sell within 10 seconds of investment");
     res.render("timer");
   }else{
     console.log("Invested amount is "+investedAmount);
     console.log("Selected stock rate is "+stockRate);
     returns = investedAmount*stockRate;
     console.log("You have earned "+returns+" rs.");
     res.render("success",{capitalAmount:capital,earnings:returns});
   }

 }else{
    console.log("Cannot sell twice!!");
    res.render("restrict");
 }


});



app.listen(3000,function(){
  console.log("Server running on port 3000");
});
