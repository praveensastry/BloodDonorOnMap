define(['react', './dist/js/modals/ModalInfoDonor.js', './dist/js/modals/ModalNewDonor.js'],
function (React, ModalInfoDonor, ModalForm) {
  var MapClass = React.createClass({
    donorActive: function (e) {
      map.activeState = 'donor';
      this.setState({
        activeState: 'donor'
      });
    },
    patientActive: function (e) {
      map.activeState = 'patient';
      this.setState({
        activeState: 'patient'
      });
    },
    isDonorActive: function () {
      return this.state.activeState === 'donor' ? '✔' : '';
    },
    isPatientActive: function () {
      return this.state.activeState === 'patient' ? '✔' : '';
    },
    getInitialState: function () {
      return {
        activeState: 'patient'
      };
    },
    render: function() {
      return (
        <div id="map-content">
          <div id="map">
          </div>
          <button id="donors" onClick={this.donorActive} className="btn btn-success">
          {this.isDonorActive() + ' Donor'}
          </button>
          <button id="patients" onClick={this.patientActive} className="btn btn-danger">
          {this.isPatientActive() + ' Patient'}
          </button>
          <ModalForm ref="modalForm"/>
          <ModalInfoDonor data="donorForPatient"/>
        </div>
      );
    }
  });
  return MapClass;
});
