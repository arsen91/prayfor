let express = require('express');
let visitorRouter = express.Router();
let _  = require('lodash');

let Visitor = require('./visitor');

visitorRouter.route('/register')
    .get((req, res) => {
        Visitor.find((err, visitors) => {
            if (err) {
                res.json({success: false, err})
            } else {
                res.json({success: true, visitors});
            }
        });
    })
    .post((req, res) => {
        let name = req.body.name,
            email = req.body.email || '',
            church = req.body.church,
            visitor = new Visitor({
                name,
                email,
                church
            });

        visitor.save((err, vis) => {
            if (err) {
                res.json({ success: false, error: err})
            } else {
                res.json({success: true});
            }
        });
    });

module.exports = visitorRouter;