import React, {useRef, useState, useEffect} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import geoJson from "../farms.json";

// const mapboxPrivateToken = await fetch('http://localhost:5000/map-data');

mapboxgl.accessToken = "token here"; // not sure if this format works, token previously pasted directly in

export default function FarmsMap () {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.96);
  const [lat, setLat] = useState(44.71);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });
     
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
     
  return (
    <div>
      <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <a href="/farms">
         Click Here to Redirect to Farms page
    </a>
    </div>
    
  );
}

//    // Create default markers
//geoJson.features.map((feature) =>
//new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
//  );