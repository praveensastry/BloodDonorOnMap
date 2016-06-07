var fs = require('fs');
var Handlebars = require('handlebars');
var donorEdit = fs.readFileSync(__dirname + '/../donor-edit.hbs', 'utf8');
var template = Handlebars.compile(donorEdit);
var Donor = require('../Schemas/Donors.js');
var _ = require('lodash');
var donorValidations = require('../SchemaValidations/DonorValidation.js');

var donorService =  {
  socket: null,
  templateEdit: function (req, res) {
    Donor.findById(req.params.user_id, function (err, donor) {
      res.send(template(donor));
    });
  },
  saveNewDonor: function (donorData) {
    var donor = new Donor(_.omit(donorData, ['_id']));
    return donor.save();
  },
  editDonor: function (donorData) {
    var self = this;
    if (donorValidations.isValid(donorData)) {
      Donor.findById(donorData._id, function (err, donor) {
        donor.firstName = donorData.firstName;
        donor.lastName = donorData.lastName;
        donor.contactName = donorData.contactName;
        donor.phoneNumber = donorData.phoneNumber;
        donor.email = donorData.email;
        donor.address = donorData.address;
        donor.bloodGroup = donorData.bloodGroup;
        donor.save(donorData).then(function () {
          Donor.find({}, function (err, donors) {
            self.socket.actualDonors(donors);
          });
        });
      });
    } else {
      //To-Do: Handle error here
    }
  },
  deleteDonor: function (donorId) {
    var self = this;
    Donor.findByIdAndRemove(donorId).then(function (err) {
      Donor.find({}, function (err, donors) {
        self.socket.actualDonors(donors);
      });
    });
  },
  updateAll: function () {
    var self = this;
    Donor.find({}, function (err, donors) {
      if (err) {
        console.log('error', err);
      }
      self.socket.actualDonors(donors);
    });
  },
  getActualDonors: function () {
    var self = this;
    Donor.find({}, function (err, donors) {
      if (err) {
        console.log('error', err);
      }
      self.socket.setActualDonors(donors);
    });
  }
}


module.exports = donorService;
