/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require("bcrypt");
var Promise = require("bluebird");
module.exports = {
  attributes: {
    fullname: {
      type: "STRING",
      required: true
    },
    matricNumber: {
      type: "STRING",
      required: true
    },
    sex: {
      type: "STRING",
      in: ['Male', 'Female']
    },
    profilePicture: {
      type: "STRING"
    },
    password: {
      type: "string",
      minLength: 6,
      protected: true,
      required: true
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function (values, cb) {
    if (values.password) {
      bcrypt.hash(values.password, 10, function (err, hash) {
        if (err) return cb(err);
        values.password = hash;
        cb();
      });
    }
  },
  comparePassword: function (password, user) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) reject(err);

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  }
};

