var express = require('express');
const Sequelize = require("sequelize");
var morgan = require("morgan");
const cors = require("cors");
var db = require('./models/database');
const e = require('express');
var jwt = require("../backend/node_modules/jsonwebtoken");

const Users = db.users;
const Events = db.events;

const bcrypt = require("bcrypt");
const { response } = require('express');
const secret = "my_forum";

db.sequelize.sync();
var app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


function checkAuthorization(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        req.token = bearerHeader;

        jwt.verify(req.token, secret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    res.json({ message: "Your token expired!" });
                } else {
                    res.json({ message: "Decoding error!" });
                }
            } else {
                next();
            }
        });
    } else {
        res.json({ message: "Missing token!" });
    }
}

app.post("/add-user", async (req, res) => {

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

app.post('/login', async (req, res) => {
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

app.post('/checkExistAccount', async (req, res) => {
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

app.put("/activeAccount/:id", (req, res) => {
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

app.post("/event", checkAuthorization, async (req, res) => {

    let new_event = {
        title: req.body.title,
        description: req.body.description,
        label: req.body.label,
        day: req.body.day,
        user_id: req.body.user_id,
    };

    let response = {};

    Events.create(new_event)
        .then((event) => {
            response.msg = 'Adaugat cu succes!';
            response.added = 1;
            response.id = event.null;
            res.send(response);
        })
        .catch((err) => {
            response.msg = err;
            response.added = 0;
            res.send(response);
        });

});

app.post("/allEventsForUser", (req, res) => {
    let id = req.body.id;

    Events.findAll({ where: { user_id: id } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => console.log(err));
});

app.delete("/event/:id", checkAuthorization, (req, res) => {
    const id = req.params.id;

    let response = {};

    Events.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                response.msg = "Evenimentul a fost sters cu succes!";
                response.deleted = 1;
                res.send(response);
            } else {
                response.msg = `Nu pot sterge evenimentul cu id=${id}.`;
                response.deleted = 0;
                res.send(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

app.put("/event/:id", checkAuthorization, (req, res) => {
    const id = req.params.id;
    Events.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            let response = {};
            if (num == 1) {
                response.updated = 1;
                response.msg = "Informatiile au fost actualizate cu succes.";
                res.send(response);
            } else {
                response.updated = 0;
                response.msg = `Nu pot actualiza informatiile pentru angajatul cu id=${id}.`;
                res.send(response);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Eroare actualizare date pentru id=" + id,
            });
        });
});

