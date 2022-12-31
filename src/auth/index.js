/* eslint-disable no-underscore-dangle */
const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-unused-vars
const db = require('../db/connection');
const User = require('../models/userEntry');

require('dotenv').config();

const router = express.Router();

// any route in here is pre-pended with /auth

const signupSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-z ,.'-]+$/i)
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-z ,.'-]+$/i)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
      // Password requires a minimum of 8 and maximum of 30 characters, at least one
      // uppercase letter, one lowercase letter, one number and one special character.
    )
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
}).with('email', 'password');

router.get('/', (req, res) => {
  res.json({
    message: '🔐',
  });
});

function unableToLogin(res, next) {
  res.status(422);
  const error = new Error('Unable to login');
  next(error);
}

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
    (error, token) => {
      if (error) {
        unableToLogin(res, next);
      } else {
        res.json({ token });
      }
    },
  );
}

router.post('/signup', (req, res, next) => {
  const result = signupSchema.validate(req.body);
  //   _.capitalize();
  if (!result.error) {
    User.findOne({ email: req.body.email }, (user) => {
      // if user === null then no user exists so register them
      if (!(user === null)) {
        // there is already a user in the db with this username
        // respond with error!
        const error = new Error(`The email ${req.body.email} already exists`);
        res.status(409);
        next(error);
      } else {
        // hash password and insert user with hashed password
        bcrypt.hash(req.body.password, 12).then(async (hashedPassword) => {
          const fullName = `${_.capitalize(req.body.firstName)} ${_.capitalize(
            req.body.lastName,
          )}`;
          const newUser = {
            name: fullName,
            password: hashedPassword,
            email: req.body.email,
          };

          await User.create(newUser, (err, createdUser) => {
            if (err) {
              res.status(422);
              next(err);
            } else {
              delete newUser.password;
              createTokenSendResponse(createdUser, res, next);
            }
          });
        });
      }
    });
  } else {
    res.status(422);
    next(result.error);
  }
});

const loginSchema = Joi.object({
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
    )
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
}).with('email', 'password');

router.post('/login', (req, res, next) => {
  const result = loginSchema.validate(req.body);
  if (!result.error) {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, foundUser) => {
        if (foundUser) {
          // found user so now need to compare password
          bcrypt
            .compare(req.body.password, foundUser.password)
            .then((match) => {
              // match will be true if passwords match and false if they do not
              if (match) {
                // password is correct so assign JWT and log the person in
                createTokenSendResponse(foundUser, res, next);
              } else {
                unableToLogin(res, next);
              }
            });
        } else {
          unableToLogin(res, next);
        }
      },
    );
  } else {
    unableToLogin(res, next);
  }
});

module.exports = router;
