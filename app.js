const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const dbURI='mongodb+srv://vasanth:Vasanth890@node1.nuiqe.mongodb.net/nodesa?retryWrites=true&w=majority';
const {compile}=require('ejs');
const favicon=require('serve-favicon');
var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
const port=process.env.PORT || 2000
app.get('/home',(req,res)=>{
    res.render('index')
});
app.get('/',(req,res)=>{
    res.redirect('/home');
})
app.use(bodyParser.urlencoded({extended:false})); 
const accB=require('./models/account');
const tr=require('./models/transfer1');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use("/favicon.ico", express.static('public/favicon.ico'));
app.get('/accounts',(req,res)=>{
    accB.find().then((result)=>{res.render("ind2",{data:result});console.log("data sent")}).catch((err)=>console.log(err));
})
app.get('/ac',(req,res)=>{
    res.render("ind3");
})

app.get('/transfer',(req,res)=>{
    var ay1=req.session.message;
    fr={};
    console.log(ay1)
    accB.findOne({Name:ay1}).then((result)=>
    {
        accB.find().then((resul)=>{res.render("ind3",{dat:resul,fr:result});console.log("data sent to form");});
        
    }
        ).catch((err)=>console.log(err));

})

app.get('/account/:n',(req,res)=>{
       let r=req.params.n;
        req.session.message = r;
         res.redirect("/transfer");
})
app.get('/Alltransactions',(req,res)=>{
    tr.find().then((result)=>{console.log("dispalying trans data");res.render("ind4",{data:result});}).catch((err)=>console.log(err));
});

app.post('/trans1',(req,res)=>{
    let frn=req.body.fromuser;
    let am=req.body.amount;
    let date=new Date().toLocaleString("en-US",{timeZone:'Asia/Kolkata'})
    let tou=req.body.touser;
    let fin=date.substring(0,8)
    let myDate = date.substring(9,date.length);
    tr.create({
        From:frn,
        To:tou,
        Amount:am,
        Date:fin,
        Time:myDate
    }).then((res)=>{
        console.log("transaction table values inserted");
    }).catch((err)=>console.log(err));
    accB.findOne({
        Name:frn
    }).then((result)=>{
        accB.updateOne({Name:frn},{CurrentBal:String(Number(result.CurrentBal)-Number(am))}).then((re)=>{
            console.log("Updated accounts bal refresh to see");
            accB.findOne({Name:tou}).then((res1)=>{
                accB.updateOne({Name:tou},{CurrentBal:String(Number(res1.CurrentBal)+Number(am))}).then((rr)=>{
                    res.redirect('/accounts');
                }).catch((err)=>console.log(err));
            }).catch((err)=>console.log(err));
        }).catch((err)=>console.log(err))
    }
    ).catch((err)=>console.log(err));
    
    
    
})
function fun2(res){
    accB.find().then((result)=>{res.render("ind2",{data:result});console.log("data sent")}).catch((err)=>console.log(err))

}


mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((res) => app.listen(port,()=>{console.log("server is running.....and connected to db")}))
.catch((err) => console.log(err))




