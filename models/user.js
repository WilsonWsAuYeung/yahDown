var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


// Checks email length
let emailLengthChecker = (email) => {
  if (!email) {
    return false;
  } else {
    // Check the length of e-mail string is above 6 characters and under 30
    if (email.length < 6 || email.length > 30) {
      return false;
    } else {
      return true;
    }
  }
};

// Checks if string is valid format
let validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    // StackOverflow expression
    var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};

// Email Validators
var emailValidators = [{
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  }
];

// Checks username length
let usernameLengthChecker = (username) => {
  if (!username) {
    return false;
  } else {
    // Check the length of e-mail string is above 5 characters and under 15
    if (username.length < 5 || username.length > 15) {
      return false;
    } else {
      return true;
    }
  }
};

// Checks if username is valid format
let validUsername = (username) => {
  if (!username) {
    return false;
  } else {
    // Checks if username format is valid
    var regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
};

// Username validators
const usernameValidators = [{
    validator: usernameLengthChecker,
    message: 'Username must be at least 5 characters but no more than 15'
  },
  {
    validator: validUsername,
    message: 'Username must not have any special characters'
  }
];

// Checks Password Length
let passwordLengthChecker = (password) => {
  if (!password) {
    return false;
  } else {
    if (password.length < 8 || password.length > 20) {
      return false;
    } else {
      return true;
    }
  }
};

// Valid password Format
let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false;
  } else {
    var regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password);
  }
};

// Password validators
const passwordValidators = [{
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];

// User Model and checks if Valid
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: emailValidators
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: usernameValidators
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidators
  }
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password'))
    return next();
  // Apply encryption
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err)
      return next(err);
    this.password = hash;
    next();
  });
});

// Checks if identical passwords
userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);