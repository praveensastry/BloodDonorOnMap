define(["react", "start/commons"], function (React) {
  var DonorInfo = React.createClass({
    getInitialState: function () {
      return donorForPatient || {};
    },
    componentWillMount: function (){
      var self = this;
      donorForPatient.callback = function (data) {
        self.setState(data);
      };
    },
    render: function () {
      return (
        <form role="form" className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="firstName">First Name</label>
            <div className="col-sm-9">
              <p name="firstName">{this.state.firstName}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="lastName">Last Name</label>
            <div className="col-sm-9">
              <p name="lastName" >{this.state.lastName}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="email">Email</label>
            <div className="col-sm-9">
              <p name="email">{this.state.email}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="phoneNumber">Phone Number</label>
            <div className="col-sm-9">
              <p name="phoneNumber">{this.state.phoneNumber}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="contactName">Contact Name</label>
            <div className="col-sm-9">
              <p name="contactName">{this.state.contactName}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="address">Address</label>
            <div className="col-sm-9">
              <p name="address">{this.state.address}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="bloodGroup">Blood Group</label>
            <div className="col-sm-9">
              <p name="bloodGroup">{this.state.bloodGroup}</p>
            </div>
          </div>
        </form>
      )
    }
  });
  return DonorInfo;
});
