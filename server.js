const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const compression = require ('compression');
require('dotenv').config();
const userRouter = require ('./Routes/user');
const adminRouter = require ('./Routes/admin');
const postRouter = require ('./Routes/posts');
const eventRouter = require ('./Routes/events');
//create server object
const app = express();
app.use(express.json());
app.use(cors());
app.use(cors());

app.use(compression());

//Database connectivity
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open',() => console.log(`MongoDB connection is established`));

//port
const port = process.env.PORT || 5000;
const server = app.listen(port , console.log(`server is running on port ${port}`));
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/posts',postRouter);
app.use('/events',eventRouter);
module.exports = app;
