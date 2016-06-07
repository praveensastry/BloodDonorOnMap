//Validations on the Server
var donorValidations = {
  results: [],
  isValidEmail: function (donor) {
    var mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!mailRegex.test(donor.email)) {
      this.results.push('Not valid format email');
    }
  },
  isValidPhone: function (donor) {
    var phoneRegex = /[^0-9]/;
    if (phoneRegex.test(donor.phoneNumber)) {
      this.results.push('Not valid format phone');
    }
  },
  isValid: function (donor) {
    this.isValidEmail(donor);
    this.isValidPhone(donor);
    return this.results.length === 0;
  }
};

module.exports = donorValidations;
