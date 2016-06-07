var chai = require('../Code/node_modules/chai');
var expect = chai.expect;
var Donor = require('../Code/server/Schemas/Donors');

describe('Donor Model Tests', function() {
  it('Should create a new Donor', function() {
  	var donorData = {
      firstName: 'first',
	  lastName: 'last',
	  contactName: 'fl',
	  phoneNumber: '1234567890',
	  email: 'test@gmail.com',
	  address: 'At the worlds end',
	  bloodGroup: 'JS +ve',
	  x: 30,
	  y: 50,
	  wkid: 123456
    };
  	var donor = new Donor(donorData);    
    donor.save(function(err) {
      expect(err).to.be.null;
      expect(donor.firstName).to.equal('first');
      expect(donor.lastName).to.equal('last');
      expect(donor.contactName).to.equal('fl');
      expect(donor.phoneNumber).to.equal('1234567890');
      expect(donor.email).to.equal('test@gmail.com');
      expect(donor.address).to.equal('At the worlds end');
      expect(donor.bloodGroup).to.equal('JS +ve');
      expect(donor.x).to.equal(30);
      expect(donor.y).to.equal(50);
      expect(donor.wkid).to.equal(123456);
      expect(donor).to.have.property('createdAt');
      expect(donor).to.have.property('updatedAt');
    });
  });

  it('should find donor by id', function() {
    Donor.findOne({ id: '1234abcd' }, function(err, donor) {
      expect(err).to.be.null;
      expect(donor.id).to.equal('1234abcd');
    });
  });

  it('should delete a donor', function() {
    Donor.remove({ id: '1234abcd' }, function(err) {
      expect(err).to.be.null;
    });
  });

});