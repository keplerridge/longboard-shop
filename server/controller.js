const {SECRET_KEY} = process.env
const stripe = require('stripe')(SECRET_KEY)

module.exports = {
    getBoards: (req, res) => {
        req.app.get('db').standard_boards.get_standard_boards()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getBoardBar: (req, res) => {
        req.app.get('db').standard_boards.board_bar()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getBoardByDesign: (req, res) => {
        const {design} = req.params;
        req.app.get('db').standard_boards.get_board_by_design(design)
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    filterLowestPrice: (req, res) => {
       req.app.get('db').standard_boards.filter_lowest_price()
       .then(boards => res.status(200).send(boards))
       .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err))) 
    },
    filterLowestPriceByDesign: (req, res) => {
        const {design} = req.params;
        req.app.get('db').standard_boards.filter_price_by_design_low(design)
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    filterHighestPriceByDesign: (req, res) => {
        const {design} = req.params;
        req.app.get('db').standard_boards.filter_price_by_design_high(design)
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    filterHighestPrice: (req, res) => {
        req.app.get('db').standard_boards.filter_highest_price()
        .then(boards => res.status(200).send(boards))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getSelectedBoard: (req, res) => {
        const {title} = req.params;
        req.app.get('db').standard_boards.get_selected_board(title)
        .then(board => res.status(200).send(board))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getSelectedBoardDesign: (req, res) => {
        const {id} = req.params;
        req.app.get('db').standard_boards.get_selected_board_design(id)
        .then(design => res.status(200).send(design))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getSelectedBoardGrip: (req, res) => {
        const {id} = req.params;
        req.app.get('db').standard_boards.get_selected_board_grip(id)
        .then(grip => res.status(200).send(grip))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getSelectedBoardTrucks: (req, res) => {
        const {id} = req.params;
        req.app.get('db').standard_boards.get_selected_board_trucks(id)
        .then(trucks => res.status(200).send(trucks))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getSelectedBoardWheels: (req, res) => {
        const {id} = req.params;
        req.app.get('db').standard_boards.get_selected_board_wheels(id)
        .then(wheels => res.status(200).send(wheels))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    addToCartStandardProduct: (req, res) => {
        const {order_id, standard_product, quantity, price} = req.body;
        req.app.get('db').cart.add_to_cart_standard_product(order_id, standard_product, quantity, price)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    addToCartCustomProduct: (req, res) => {
        const {design, grip, trucks, wheels, graphic, total, order_id} = req.body;
        req.app.get('db').cart.add_to_cart_custom_product(design, grip, trucks, wheels, total, graphic, order_id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getUserCart: (req, res) => {
        const {id} = req.params;
        req.app.get('db').cart.get_user_cart(id)
        .then(cartItems => res.status(200).send(cartItems))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    updateItemQuantity: (req, res) => {
        const {id} = req.params;
        const {quantity, price} = req.body;
        req.app.get('db').cart.update_item_quantity(quantity, price, id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    deleteCartItem: (req, res) => {
        const {id} = req.params;
        req.app.get('db').cart.delete_cart_item(id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    chargeCustomer: (req, res) => {
        const {amount, token, order_id, user_id, date} = req.body;
        const charge = stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token.id,
            description: 'Test charge'
        }, function(err, charge) {
            if(err){
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
        req.app.get('db').cart.complete_order(order_id, user_id, date)
    },
    getOrderHistory: (req, res) => {
        const {id} = req.params;
        req.app.get('db').user.get_order_history(id)
        .then(orders => res.status(200).send(orders))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getBoardDesigns: (req, res) => {
        req.app.get('db').custom_boards.get_designs()
        .then(designs => res.status(200).send(designs))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getBoardGrips: (req, res) => {
        req.app.get('db').custom_boards.get_grips()
        .then(grips => res.status(200).send(grips))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getBoardTrucks: (req, res) => {
        req.app.get('db').custom_boards.get_trucks()
        .then(trucks => res.status(200).send(trucks))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getBoardWheels: (req, res) => {
        req.app.get('db').custom_boards.get_wheels()
        .then(wheels => res.status(200).send(wheels))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    }
}