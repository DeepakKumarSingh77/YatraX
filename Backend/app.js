const express=require('express');
const app=express();
const cors=require('cors');
const userRoutes=require('./routes/user.routes');
const cookieparser=require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const map=require('./routes/map.routes');
const rides=require('./routes/rides.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/map',map);
app.use('/rides', rides);

module.exports=app;
