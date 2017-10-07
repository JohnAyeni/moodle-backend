/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');

module.exports = {
    create: function (req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return ResponseService.json(401, res, "Password doesn't match")
        }

        var allowedParameters = [
            "fullname", "matricNumber", "sex", "profilePicture", "password", "confirmPassword"
        ]

        var data = _.pick(req.body, allowedParameters);

        User.create(data).then(function (user) {
            var responseData = {
                user: user,
                token: JwtService.issue({ id: user.id })
            }
            return ResponseService.json(200, res, "User created successfully", responseData)
        }).catch(function (err) {
            sails.log("User Creation Failed");
            sails.log(err);
            sails.log(err.Error);
            if (err.invalidAttributes) {
                return ResponseService.json(400, res, "User could not be created", err.Errors)
            }
        })
    }


};
