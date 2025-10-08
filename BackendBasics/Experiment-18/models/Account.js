const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;