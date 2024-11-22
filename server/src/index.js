import express from 'express';
import routes from './routes.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`); 
//     next();
// }); 

const url = 'mongodb://localhost:27017/';
mongoose.connect(url, { dbName: 'collection' })
        .then(() => console.log('DB connected'))
        .catch(err => {
            console.log(`DB failed: ${err}`)});

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));

app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.use('/static', express.static('src/public')); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authMiddleware);
app.use(routes);

app.listen(3000, () => console.log('Server is runnung on http://localhost:3000'));
