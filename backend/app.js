const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/eroor');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const multer = require('multer');
const path = require('path')

//config
dotenv.config({path: 'backend/config/.env'})

app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(multer({ dest: 'backend/uploads/', limits: { fileSize: 10 * 1024 * 1024 } }).single('image'));




//Routes
const userRoutes = require('./routes/userRoutes');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');


app.use('/api/v1' , product);
app.use('/api/v1' , userRoutes);
app.use('/api/v1' , order);
app.use('/api/v1' , payment);


app.use(express.static(path.join(__dirname, "../front_end/build")))

app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname, "../front_end/build/index.html"))
})

//middleware for error

app.use(errorMiddleware)

module.exports = app
