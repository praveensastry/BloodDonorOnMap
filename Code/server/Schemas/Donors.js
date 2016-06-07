var mongoose = require('mongoose');
var Donor = mongoose.model('Donor', {
  firstName: String,
  lastName: String,
  contactName: String,
  phoneNumber: String,
  email: String,
  address: String,
  bloodGroup: String,
  x: Number,
  y: Number,
  wkid: Number
});
module.exports = Donor;
