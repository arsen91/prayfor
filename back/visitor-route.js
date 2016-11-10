var express = require('express');
var visitorRouter = express.Router();
var _  = require('lodash');

var Visitor = require('./visitor');

visitorRouter.route('/register')
    .get(function(req, res) {
        Visitor.find(function(err, visitors) {
            if (err) {
                res.json({success: false, err: err});
            } else {
                res.json({success: true, visitors: visitors});
            }
        });
    })
    .post(function(req, res) {
        var name = req.body.name,
            email = req.body.email || '',
            church = req.body.church,
            visitor = new Visitor({
                name: name,
                email: email,
                church: church
            });

        visitor.save(function(err, vis) {
            if (err) {
                res.json({ success: false, error: err});
            } else {
                res.json({success: true});
            }
        });
    });

module.exports = visitorRouter;