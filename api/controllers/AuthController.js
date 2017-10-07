/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function (req, res) {
        var matricNumber = req.param('matricNumber');
        var password = req.param('password');

        verifyParams(res, matricNumber, password);

        User.findOne({ matricNumber: matricNumber }).then(function (user) {
            if (!user) {
                return invalidMatricNumberOrPassword(res);
            }
            signInUser(req, res, password, user);
        }).catch(function (err) {
            return invalidMatricNumberOrPassword(res);
        })
    }
};


function signInUser(req, res, password, user) {
    User.comparePassword(password, user).then(function (valid) {
        if (!valid) {
            return this.invalidMatricNumberOrPassword();
        } else {
            var responseData = {
                user: user,
                token: generateToken(user.id)
            };
            return ResponseService.json(200, res, "Successfully signed in", responseData);
        }
    }).catch(function (err) {
        return this.invalidMatricNumberOrPassword();
    })
};


function invalidMatricNumberOrPassword(res) {
    return ResponseService.json(401, res, "Invalid Matric Number or password")
};

function verifyParams(res, email, password) {
    if (!email || !password) {
        return ResponseService.json(401, res, "Matric Number and password required")
    }
};


function generateToken(user_id) {
    return JwtService.issue({ id: user_id })
};

