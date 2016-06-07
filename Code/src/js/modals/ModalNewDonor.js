define(["react", "./dist/js/forms/EditForm.js", "start/models/Donor"], function (React, FormDonor, UserModel) {
  var ModalForm = React.createClass({
    getInitialState: function () {
      return {
        successSave: false
      };
    },
    saveModalForm: function () {
      var self = this;
      if (this.refs.formComponent.isValidForm()) {
        var donor = _.extend(_.omit(this.refs.formComponent.getDonorsValues(), ['mapPoint']), {
          x: mapPoint.x,
          y: mapPoint.y,
          wkid: mapPoint.spatialReference.wkid
        });
        UserModel.save(donor);
        socket.on('added new donor', function (donor, editLink) {
          donor.editLink = editLink;
          map.addNewDonor(donor);
          self.refs.formComponent.showEditionLink(editLink);
          self.setState(_.extend(self.state, { successSave: true }));
        });
      }
    },
    closeModalForm: function () {
      this.refs.formComponent.clearFormValues();
      $('#donorsModal').modal('hide');
    },
    render: function () {
      var saveSuccess = classNames('', this.props.className, { 'hide': !this.state.successSave });
      return (
        <div className="modal fade" tabIndex="-1" role="dialog" id="donorsModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Donors Information</h4>
              </div>
              <div className="modal-body">
                <FormDonor data-user={this.handleUserDataChange} ref="formComponent"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.closeModalForm}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.saveModalForm}>Save</button>
                <div className={saveSuccess}>
                  <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Saved
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  });
  return ModalForm;
});
