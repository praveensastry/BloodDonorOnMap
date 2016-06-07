(function() {
  'use strict';

  var pathRX = new RegExp(/\/[^\/]+$/)
    , locationPath = location.pathname.replace(pathRX, '');

  require({
    async: true,
    parseOnLoad: true,
    packages: [{
      name: 'react',
      location: locationPath + 'bower_components/react',
      main: 'react'
    }, {
      name: 'reactDOM',
      location: locationPath + 'node_modules/react-dom/dist',
      main: 'react-dom.min'
    }, {
      name: 'models',
      location: locationPath + 'dist/js/models',
      main: 'Donor'
    }, {
      name: 'start',
      location: locationPath + 'dist/js',
      main: 'start'
    }]
  }, ['start']);

})();
