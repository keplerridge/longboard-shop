const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        let user = await db.user.check_user(email);
        user = user[0];
        if(user){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register(email, hash);
        newUser = newUser[0];
        delete newUser.password;
        let userCart = await db.user.create_user_cart(newUser.user_id);
        userCart = userCart[0]
        newUser = {...newUser, ...userCart}
        session.user = newUser;
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        let user = await db.user.check_user(email);
        user = user[0];
        if(!user){
            return res.status(400).send('Email not found')
        }
        const foundUser = bcrypt.compareSync(password, user.password);
        if(foundUser){
            delete user.password;
            session.user = user;
            res.send(session.user);
        } else {
            res.status(400).send('Incorrect Password')
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getSessionUser: (req, res) => {
        const {user} = req.session;

        if(user){
            res.send(user)
        } else {
            res.send('')
        }
    },
    updateEmail: (req, res) => {
        const {id} = req.params;
        const {email} = req.body;
        req.app.get('db').user.update_email(email, id)
        .then(email => res.status(200).send(email))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    updatePassword: (req, res) => {
        const {id} = req.params;
        const {password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        req.app.get('db').user.update_password(hash, id)
        res.sendStatus(200)
    }
}