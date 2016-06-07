define(["react", "./dist/js/forms/InfoForm.js"], function (React, DonorInfo) {
  var ModalInfoDonor = React.createClass({
    render: function () {
      return (
        <div className="modal fade" tabIndex="-1" role="dialog" id="modalDonorInfo">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Donors Information</h4>
              </div>
              <div className="modal-body">
                <DonorInfo />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  });
  return ModalInfoDonor;
});
