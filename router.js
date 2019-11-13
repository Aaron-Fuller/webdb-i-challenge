const router = require('express').Router();
const knex = require('./data/dbConfig');

//CRUD

//POST


//Middleware 
function validateAccountId(req, res, next) {
    const id = req.params.id;
    knex('accounts')
    .where({ id: id })
    .then(account => {
        !account.length && res.status(404).json({ error: "Account with provided id not found." });
        next();
    })
    .catch(err => res.status(500).json({ error: err }));
}

function validateAccount(req, res, next) {
    const account = req.body;
    !account && res.status(400).json({ error: "Please provide an account." });
    !account.name && res.status(400).json({ error: "Please provide an account name." });
    !account.budget && res.status(400).json({ error: "Please provide an account budget." });
    next();
}

module.exports = router;
