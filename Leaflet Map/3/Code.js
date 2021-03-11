// map = L.map("map");
// var center = [32.4, 53.6];
// map.setView([32.4, 53.6], 5);

// var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   // Open Street Map
//   maxZoom: 12,
//   attribution:
//     '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// });
// osm.addTo(map);

// var satimg = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
//   // Satellite Map
//   maxZoom: 12,
//   subdomains: ["mt0", "mt1", "mt2", "mt3"],
// });

// var baseMaps = {
//   "Open Street Map": osm,
//   "Satellite image": satimg,
// };

// var overlays = {};
// L.control.layers(baseMaps, overlays).addTo(map);
//////////////////////////////////////////////////////////////////...///
// var _firstLatLng,
//   _firstPoint,
//   _secondLatLng,
//   _secondPoint,
//   _distance,
//   _length,
//   _polyline;

// map.on("click", function (e) {
//   if (!_firstLatLng) {
//     _firstLatLng = e.latlng;
//     _firstPoint = e.layerPoint;
//     L.marker(_firstLatLng)
//       .addTo(map)
//       .bindPopup("Point A<br/>" + e.latlng + "<br/>" + e.layerPoint)
//       .openPopup();
//   } else {
//     _secondLatLng = e.latlng;
//     _secondPoint = e.layerPoint;
//     L.marker(_secondLatLng)
//       .addTo(map)
//       .bindPopup("Point B<br/>" + e.latlng + "<br/>" + e.layerPoint)
//       .openPopup();
//   }

//   if (_firstLatLng && _secondLatLng) {
//     // draw the line between points
//     L.polyline([_firstLatLng, _secondLatLng], {
//       color: "rgb(0, 0, 0)",
//     }).addTo(map);

//     refreshDistanceAndLength();
//   }
// });

// map.on("zoomend", function (e) {
//   refreshDistanceAndLength();
// });

// function refreshDistanceAndLength() {
//   _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
//   document.getElementById("length").innerHTML = _length;
// }

// 900 * 500
// position: relative;

// import {leaflet-measure} from "./node_modules";

var layerOsm = new L.TileLayer(
  "https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    subdomains: ["server", "services"],
    maxZoom: 19,
    noWrap: true,
    attribution: '<a href="https://www.arcgis.com/">ArcGIS</a>',
  }
);
var satimg = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  // Satellite Map
  maxZoom: 12,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
var map = new L.Map("map", { editable: true }).setView(
  new L.LatLng(32.4, 53.6),
  5
);
map.addLayer(layerOsm);
var baseMaps = {
  "Open Street Map": layerOsm,
  "Satellite image": satimg,
};
var overlays = {};
L.control.layers(baseMaps, overlays).addTo(map);

L.control
  .polylineMeasure({
    position: "topleft",
    unit: "kilometers",
    showBearings: true,
    clearMeasurementsOnStop: false,
    showClearControl: false,
    showUnitControl: false,
  })
  .addTo(map);


polygon.enableEdit();
map.on(
  "editable:vertex:drag editable:vertex:deleted",
  polygon.updateMeasurements,
  polygon
);
