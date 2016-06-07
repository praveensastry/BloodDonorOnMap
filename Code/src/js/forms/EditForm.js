define(["react", "models"], function (React, UserModel) {
  var FormDonor = React.createClass({
    getInitialState: function () {
      return _.extend(UserModel.defaults, {
        phoneNotValid: false,
        emailNotValid: false,
        successSave: false
      });
    },
    clearFormValues: function () {
      this.setState(UserModel.defaults);
    },
    getDonorsValues: function () {
      return this.state;
    },
    isValidPhone: function () {
      var phoneRegex = /[^0-9]/;
      var isValid = true;
      if (!this.state.phoneNumber || this.state.phoneNumber === "") {
        this.setState({
          phoneNotValidMessage: 'Phone Number is required field',
          phoneNotValid: true
        });
        isValid = false;
      } else if (phoneRegex.test(this.state.phoneNumber)){
        this.setState({
          phoneNotValidMessage: 'Phone Number incorrect format',
          phoneNotValid: true
        });
        isValid = false;
      }
      return isValid;
    },
    isValidEmail: function () {
      var mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      var isValid = true;
      if (!this.state.email || this.state.email === "") {
        this.setState({
          emailNotValidMessage: 'Email is required field',
          emailNotValid: true
        });
        isValid = false;
      } else if (!mailRegex.test(this.state.email)){
        this.setState({
          emailNotValidMessage: 'Email incorrect format',
          emailNotValid: true
        });
        isValid = false;
      }
      return isValid;
    },
    isValidForm: function () {
      return this.isValidEmail() & this.isValidPhone();
    },
    handleUserDataChange: function (ev) {
      var newState = {};
      newState[ev.target.name] = ev.target.value;
      this.setState(_.extend(this.state, newState));
    },
    showEditionLink: function (editLink) {
      this.setState(_.extend(this.state, {
        successSave: true,
        linkEdit: editLink
      }));
    },
    render: function () {
      var emailAddress = classNames('help-block', this.props.className, { 'not-valid-field': this.state.emailNotValid });
      var phoneNumber = classNames('help-block', this.props.className, { 'not-valid-field': this.state.phoneNotValid });
      var successSave = classNames('form-group', this.props.className, { 'hide': !this.state.successSave });
      return (
        <form role="form" className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="firstName">First Name</label>
            <div className="col-sm-9">
              <input type="text" name="firstName" className="form-control" value={this.state.firstName} onChange={this.handleUserDataChange}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="lastName">Last Name</label>
            <div className="col-sm-9">
              <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleUserDataChange}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="email">Email</label>
            <div className="col-sm-9">
              <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleUserDataChange}/>
              <span className={emailAddress}>{this.state.emailNotValidMessage}</span>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="phoneNumber">Phone Number</label>
            <div className="col-sm-9">
              <input type="text" name="phoneNumber" className="form-control" value={this.state.phoneNumber} onChange={this.handleUserDataChange}/>
              <span className={phoneNumber}>{this.state.phoneNotValidMessage}</span>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="contactName">Contact Name</label>
            <div className="col-sm-9">
              <input type="text" name="contactName" className="form-control" value={this.state.contactName} onChange={this.handleUserDataChange}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="address">Address</label>
            <div className="col-sm-9">
              <input type="text" name="address" className="form-control" value={this.state.address} onChange={this.handleUserDataChange}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="bloodGroup">Blood Group</label>
            <div className="col-sm-9">
              <input type="text" name="bloodGroup" className="form-control" value={this.state.bloodGroup} onChange={this.handleUserDataChange}/>
            </div>
          </div>
          <div className={successSave}>
            <label className="col-sm-3 control-label" htmlFor="donorLink">Edit / Remove Donor at:</label>
            <div className="col-sm-9">
              <a href={this.state.linkEdit}>{this.state.linkEdit}</a>
            </div>
          </div>
        </form>
      );
    }
  });
  return FormDonor;
});
