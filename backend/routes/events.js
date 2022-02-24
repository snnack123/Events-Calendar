const express = require("express");
const router = express.Router();
const db = require("../models");
const Events = db.events;
var jwt = require('../node_modules/jsonwebtoken');

const secret = "my_forum";

function checkAuthorization(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        req.token = bearerHeader;

        jwt.verify(req.token, secret, (err) => {
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

router.post('/check', (req,res) => {
    let token = req.body.token;

    if (typeof token !== "undefined") {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    res.json({message: "Your token expired!"});
                } else {
                    res.json({message: "Decoding error!"});
                }
            } else {
                res.json({email: decoded.email})
            }
        });
    } else {
        res.json({ message: "Missing token!" });
    }
})

router.post("/event", checkAuthorization, async (req, res) => {

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

router.post("/allEventsForUser", (req, res) => {
    let id = req.body.id;

    Events.findAll({ where: { user_id: id } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => console.log(err));
});

router.delete("/event/:id", checkAuthorization, (req, res) => {
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

router.put("/event/:id", checkAuthorization, (req, res) => {
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

module.exports = router;