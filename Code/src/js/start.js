define([
  "react",
  "esri/Color",
  "esri/geometry/Point",
  "esri/geometry/webMercatorUtils",
  "esri/graphic",
  "esri/layers/FeatureLayer",
  "esri/map",
  "esri/SpatialReference",
  "esri/symbols/SimpleMarkerSymbol",
  "./dist/js/map.js"
], function (React, Color, Point, webMercatorUtils, Graphic, FeatureLayer, Map, SpatialReference, SimpleMarkerSymbol, MapElement){

  React.render(<MapElement/>, document.getElementById('content'), function () {
    var sms;
    var OBJECTID_COUNTER = 1000;
    var TRACKID_COUNTER = 1;
    var supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function (){
      orientationChanged();
    }, false);

    map = new Map("map", {
      basemap: "streets"
    });
    map.on("load", mapLoadedHandler);


    function mapLoadedHandler(maploadEvent){
      map.activeState = 'patient';
      sms = new SimpleMarkerSymbol().setColor(new Color([255, 0, 0])).setSize(8);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
        navigator.geolocation.watchPosition(showLocation, locationError);
      }
      map.on("click", function (ev) {
        if (ev && map.activeState === "donor") {
          //Trigger a modal when Donor clicks
          mapPoint = ev.mapPoint.toJson();
          $('#donorsModal').modal('show');
        } else {
          donorForPatient.attributes = _.find(donors, function (donor) {
            var mapPoint = ev.mapPoint.toJson();
            var x = window.parseFloat(donor.x); var y = window.parseFloat(donor.y);
            var tolerance = 50;
            var similarLong = mapPoint.x < (x + tolerance) && mapPoint.x > (x - tolerance);
            var similarLat = mapPoint.y < (y + tolerance) && mapPoint.y > (y - tolerance);
            return similarLong && similarLat;
          });
          //Patient action on click
          if (donorForPatient.attributes) {
            donorForPatient.callback(donorForPatient.attributes);
            $('#modalDonorInfo').modal('show');
          }
        }
      });
      map.addNewDonor = function (donor) {
        donor.graphic = map.graphics.add(new Graphic(new Point(donor.x, donor.y, new SpatialReference(donor.wkid)), sms));
        donors.push(donor);
      };
      _.defer(function () {
        socket = io("http://localhost:3000/");
        socket.on('newdonor', function (donor) {
          map.addNewDonor(donor);
        });
        socket.on('updated donor', function (donor) {
          var donorLocal = _.find(donors, function (donorLoc) {
            return donorLoc._id === donor._id;
          });
          donorLocal = _.extend(donorLocal, donor);
        });
        function updateDonors(donorsDb) {
          donors.length = 0;
          map.graphics.clear();
          _.each(donorsDb, function (donor) {
            donors.push(donor);
            map.graphics.add(new Graphic(new Point(donor.x, donor.y, new SpatialReference(donor.wkid)), sms));
          });
        }
        socket.on('actual donors', updateDonors);
      });
    }
    function locationError(error){
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permission to access Location is Denied");
          break;

        case error.POSITION_UNAVAILABLE:
          alert("Unable to Fetch Current Location");
          break;

        case error.TIMEOUT:
          alert("Operation Timed out. Please try again");
          break;

        default:
          alert("unknown error");
          break;
      }
    }

    function zoomToLocation(location){
      var pt = webMercatorUtils.geographicToWebMercator(new Point(location.coords.longitude,
        location.coords.latitude));
      map.centerAndZoom(pt, 16);
    }

    function showLocation(location){
      if (location.coords.accuracy <= 500) {
        var now = new Date();
        var attributes = {};
        attributes.OBJECTID = OBJECTID_COUNTER;
        attributes.DATETIME = now.getTime();
        attributes.TrackID = TRACKID_COUNTER;

        OBJECTID_COUNTER++;
        TRACKID_COUNTER++;

        var pt = webMercatorUtils.geographicToWebMercator(new Point(location.coords.longitude,
          location.coords.latitude));
        var graphic = new Graphic(new Point(pt, map.spatialReference), null, attributes);
      }
      else {
        console.warn("Point cannot be added due to low accuracy: " + location.coords.accuracy);
      }
    }

    function orientationChanged(){
      if (map) {
        map.reposition();
        map.resize();
      }
    }
  });
});
