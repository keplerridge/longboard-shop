require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller');
const ac = require('./authcontroller');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();
app.use(json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

//authorization endpoints
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);
app.get('/auth/get-session-user', ac.getSessionUser);

//data endpoints
app.get('/api/standard-boards', ctrl.getBoards); //found in the boards component
app.get('/api/boards-by-design/:design', ctrl.getBoardByDesign); //found in the pintail design and drop design components, takes the design name of the board
app.get('/api/boards-price-filter-low', ctrl.filterLowestPrice); //found in the boards component
app.get('/api/boards-price-filter-high', ctrl.filterHighestPrice); //found in the boards component
app.get('/api/boards-low-price-filter/:design', ctrl.filterLowestPriceByDesign); //found in the pintail design and drop design components, takes in the design name of the board
app.get('/api/boards-high-price-filter/:design', ctrl.filterHighestPriceByDesign); //found in the pintail design and drop design components, takes in the design name of the board
app.get('/api/selected-board/:title', ctrl.getSelectedBoard); //found in the boards component
app.get('/api/user-cart/:id', ctrl.getUserCart); //this is found in the cart component, takes the order id

app.post('/api/add-to-cart-standard', ctrl.addToCartStandardProduct); //found in the boards component, taking a req.body with the order_id, board_id, quantity, and price
app.post('/api/complete-order', ctrl.completeOrder); // this is found in the cart component, taking the order_id and the user_id in a req.body
app.put('/api/update-item-quantity/:id', ctrl.updateItemQuantity); //found in the cart display component

app.delete('/api/delete-cart-item/:id', ctrl.deleteCartItem); //this is found in the cart display component, taking the order item id in params

//stripe endpoint
app.post('/api/payment', ctrl.chargeCustomer);

const port = SERVER_PORT || 4400;
app.listen(port, () => console.log(`Coding is happening on port ${port}`));