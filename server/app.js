const express = require('express');
var cors = require('cors');
const app = express();
const port = 80;

const userRouter = require('./routers/user');

app.use(express.json());
app.use(express.text());
app.use(cors());
app.use('/user',userRouter);

app.get('/',(req,res) => {
    res.send('hellow world');
});

app.listen(port,() => {console.log('server open!')});