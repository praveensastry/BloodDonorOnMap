define([], function () {
  return {
    defaults: {
      _id: "",
      firstName: "",
      lastName: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      address: "",
      bloodGroup: "",
      mapPoint: {},
      sms: {},
      x: 0,
      y: 0,
      wkid: 0,
    },
    attributes: {
      _id: "",
      firstName: "",
      lastName: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      address: "",
      bloodGroup: "",
      mapPoint: {},
      sms: {},
      x: 0,
      y: 0,
      wkid: 0,
    },
    save: function (donor) {
      socket.emit('newdonor', donor);
    }
  };
});
