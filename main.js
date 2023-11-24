import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Draw, Modify, Snap} from 'ol/interaction';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

// Create a vector source and layer for drawing features
const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ff5533',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ff553355'
      })
    })
  })
});
map.addLayer(vectorLayer);

// Create draw interaction for drawing polygons, lines, and points
const draw = new Draw({
  source: vectorSource,
  type: 'Polygon' // Change the type to 'LineString' or 'Point' for drawing lines or points
});
map.addInteraction(draw);

// Create modify interaction for modifying drawn features
const modify = new Modify({
  source: vectorSource
});
map.addInteraction(modify);

// Create snap interaction for snapping to existing features
const snap = new Snap({
  source: vectorSource
});
map.addInteraction(snap);

// Add the eurLines polygon to the map
const eurLines = [
  { lat: 75, lng: 250 },
  { lat: 75, lng: 145 },
  { lat: -45, lng: 250 },
  { lat: 75, lng: 250 },
  { lat: 75, lng: 145 },
  { lat: -45, lng: 145 },
  { lat: -45, lng: 145 },
  { lat: -45, lng: 250 },
];

// 21.380000	21.600000	
// 26.360000	-33.430000
// 46.560000	56.570000	
// 70.700000	-68.400000
// Add the eurLines polygon to the map
const euCoord = [
  { lat: 21.380000, lng: -21.600000 },
  { lat: 26.360000, lng: 33.430000 },
  { lat: 70.700000, lng: 68.400000 },
  { lat: 46.560000, lng: -56.570000 },
];

const euPolygon = new Feature({
  geometry: new Polygon([euCoord.map(coord => fromLonLat([coord.lng, coord.lat]))])
});
vectorSource.addFeature(euPolygon);

const eurPolygon = new Feature({
  geometry: new Polygon([eurLines.map(coord => fromLonLat([coord.lng, coord.lat]))])
});
vectorSource.addFeature(eurPolygon);
// const vectorLayer2 = new VectorLayer({
//   source: vectorSource,
//   style: new Style({
//     fill: new Fill({
//       color: 'rgba(255, 255, 255, 0.2)'
//     }),
//     stroke: new Stroke({
//       color: '#ffcc33',
//       width: 2
//     }),
//     image: new CircleStyle({
//       radius: 7,
//       fill: new Fill({
//         color: '#ffcc33'
//       })
//     })
//   })
// });
// map.addLayer(vectorLayer2);