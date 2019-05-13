module.exports = {
    getBoards: (req, res) => {
        req.app.get('db').standard_boards.get_standard_boards()
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
    }
}