const http=require('http');
const app=require('./app');
const port=process.env.PORT || 3000;
const connectToDb=require('./db/db');
const dotenv=require('dotenv');
const {intializeSocket}=require('./socket');
dotenv.config();

connectToDb();

const server=http.createServer(app);

intializeSocket(server);

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})