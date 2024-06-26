const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/eroor');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const multer = require('multer');
const path = require('path')
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//config
dotenv.config({ path: './config/.env' })

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(multer({ dest: 'backend/uploads/', limits: { fileSize: 10 * 1024 * 1024 } }).single('image'));



// const spec = swaggerJsdoc({
//     failOnErrors: true,
//     definition: {
//         openapi: '3.1.0',
//         info: {
//             title: 'Assure You Api',
//             version: '1.0.0',
//             description: 'Buy anything'
//         },
//         servers: [
//             {
//                 url: 'https://assure-you-new.onrender.com'
//             }
//         ]
//     },
//     apis: ["./routes/*.js", "./controllers/*.js"]
// })

//Routes
const userRoutes = require('./routes/userRoutes');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');


app.use('/api/v1', product);
app.use('/api/v1', userRoutes);
app.use('/api/v1', order);
app.use('/api/v1', payment);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));


app.use(express.static(path.join(__dirname, "../front_end/build")));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "../front_end/build/index.html"))
})

// app.get('*/', function (req, res) {
//     res.redirect('https://assure-you-client.vercel.app/')
// })


//middleware for error

app.use(errorMiddleware)

module.exports = app
