const    express = require('express'),
         cors = require('cors'),
         morgan = require('morgan'),
         AppError = require('./utils/appError'),
         globalErrorHandler = require('./controllers/errorController'),
         userRouter = require('./routes/userRoutes'),
         cartRouter = require('./routes/cartRoutes'),
         watchRouter = require('./routes/watchRoutes');

const app = express();


                /*   Middleware  */

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080/',
    optionsSuccessStatus: 200
}))
                /*   Routes     */
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/watches', watchRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;