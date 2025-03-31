const express =  require('express');
const app = express();
const bodyParser = require('body-parser');//use to get data from user 
const cors = require('cors'); //it basic use to validate req coming from client port like 3000 in this case it just allow to connect 8080 with 3000, we can configure using it from which port we can connect it.
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");


require('dotenv').config();
require('./Models/db');


const PORT = process.env.PORT || 8080;


app.get('/ping', (req,res)=>{
    res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`)
})