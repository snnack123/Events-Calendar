const express = require("express");
const router = express.Router();
const db = require("../models");
const Users = db.users;
var jwt = require('../node_modules/jsonwebtoken')

const bcrypt = require("bcrypt");
const secret = "my_forum";

router.post("/add-user", async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    let new_user = {
        id: req.body.id,
        full_name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        activation_code: req.body.random_number,
        activated: 0,
        posts_created: 0,
        posts_deleted: 0,
        years_old: req.body.yearsOld
    };

    Users.create(new_user)
        .then(() => {
            res.send('Adaugat cu succes!');
        })
        .catch((err) => {
            res.send(err)
        });

});

router.post('/login', async (req, res) => {
    let data = req.body;
    let userFound = {};

    Users.findOne({ where: { email: data.email } })
        .then((user) => {
            if (String(user) === 'null') {
                userFound.msg = 'Nu exista acest utilizator';
                res.send(userFound);
            }
            else {
                bcrypt.compare(data.password, user.password)
                    .then(async function (result) {
                        if (result) {
                            let response = {};
                            if (Number(user.activated) === 1) {
                                let token = jwt.sign({
                                    email: user.email,
                                },
                                    secret, { expiresIn: 60 * 60 }
                                );
                                response.token = token;
                                response.msg = "Ai dreptul sa accesezi resursele!";
                                response.user = user;
                                res.send(response);
                            } else {
                                response.msg = 'Trebuie sa activezi contul!'
                                response.user = user;
                                res.send(response);
                            }
                        } else {
                            userFound.msg = 'Parola este gresita';
                            res.send(userFound);
                        }
                    })
            }


        })
        .catch((err) => console.log(err));
})

router.post('/getAccount', async (req,res) => {
    let email = req.body.email;
    
    Users.findOne({ where: { email: email } })
    .then((user) => {
        let response = {};
        if (String(user) === 'null') {
            response.msg = 'Nu exista acest utilizator';
            response.found = 0;
            res.send(response);
        }
        else {
            response.msg = 'Acest utilizator exista!';
            response.user = user;
            response.found = 1;
            res.send(response);
        }      
    })
    .catch((err) => console.log(err));
})

router.post('/checkExistAccount', async (req, res) => {
    let data = req.body;
    let userFound = {};

    Users.findOne({ where: { email: data.email } })
        .then((user) => {
            if (String(user) === 'null') {
                userFound.exist = 0;
                res.send(userFound);
            }
            else {
                userFound.exist = 1;
                res.send(userFound);
            }
        })
        .catch((err) => console.log(err));
})

router.put("/activeAccount/:id", (req, res) => {
    Users.update({ activated: 1 }, {
        where: { id: req.params.id },
    })
        .then((num) => {
            if (num == 1) {
                let response = {}
                let token = jwt.sign({
                    email: req.body.email,
                },
                    secret, { expiresIn: 60 * 60 }
                );
                response.token = token;
                response.msg = "Ai dreptul sa accesezi resursele!";
                res.send(response);
            } else {
                res.send({
                    message: `Nu pot actualiza informatiile pentru contul cu id=${req.params.id}.`,
                });
            }
        })
});




module.exports = router;