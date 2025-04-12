const express=require('express');
const app=express();
const cors=require('cors');
const userRoutes=require('./routes/user.routes');
const cookieparser=require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/users', userRoutes);

module.exports=app;
