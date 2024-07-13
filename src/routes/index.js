const siteRouter = require('./site');
const userRouter = require('./user');
const orderRouter = require('./order');
const productRouter = require('./product');
const topsalesRouter = require('./topsales');
function route(app) {
    app.use('/', siteRouter);
    app.use('/user', userRouter);
    app.use('/order', orderRouter);
    app.use('/product', productRouter);
    app.use('/topsales', topsalesRouter);
}

module.exports = route;
