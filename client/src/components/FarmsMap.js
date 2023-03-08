import React, {useRef, useState, useEffect} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = "add token here"; // not sure if this format works, token previously pasted directly in

export default function FarmsMap () {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.96);
  const [lat, setLat] = useState(44.71);
  const [zoom, setZoom] = useState(8);

  const [farms, setFarms] = useState([])
  // -----------------------------------------------------------------------------
  /*
  // TODO: attempt at incorporating existing structures
  var searchedFarms = []
  const [selectedFarm, setSelectedFarm] = useState({})
  const [climateData, setClimateData] = useState({
    "year":[0],
    "yday":[0],
    "prcp (mm/day)":[0],
    "tmax (deg c)":[0],
    "tmin (deg c)":[0]
  })
  // 30 year averages for info window
  const [prcpAvg, setPrcpAvg] = useState("loading...")
  const [tempMaxAvg, setTempMaxAvg] = useState("loading...")
  const [tempMinAvg, setTempMinAvg] = useState("loading...")
  // 30 year average function
  const avg = (array) => array.reduce((a, b) => a + b) / array.length
  */
 // ------------------------------------------------------------------------------

  /*
  * Initializes map
  */
  useEffect(() => {
    if (map.current) return; // initialize map only once
    const initializeMap = async () => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [lng, lat],
        zoom: zoom
      });
      const farmData = await getFarmLocations();
      setFarms(farmData);
      showFarmLocations(farmData);
    }
    initializeMap();
  }, [lng, lat, zoom]);

  /*
  * Gets farm locations to populate map with location markers
  */
    const getFarmLocations = async () => {
      const response = await fetch(`http://localhost:5000/location/`);
      console.log(response);
      
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      console.log(records);
      //setFarms(records);
      let farmPins = records.map(farm => (
        {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [farm.longitude, farm.latitude]
          },
          properties: {
              //farmName: farm.name,
              address: farm.address
          }
        }
      ));
      return farmPins;
    };

  /*
  * Show farm locations on map
  */
    const showFarmLocations = (farmData) => {
      map.current.on('load', () => {
        // Add a layer to use the image to represent the data.
        // Add an image to use as a custom marker
        map.current.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          (error, image) => {
          if (error) throw error;
          map.current.addImage('custom-marker', image);
          // Add a GeoJSON source
            map.current.addSource('points', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: farmData
              }
            });
          
          map.current.addLayer({
            id: 'points',
            type: 'symbol',
            minzoom: 0,
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            },
          });
        });
      });
    }
      
  
  /*
  * Sets new longitude, latitude, zoom on move
  */
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
    
  //----------------------API Query----------------------
  /**
   * Requests data from daymet API 
   * obtains climate data from 1980 to most recent year available (up to 2021 as of May, 2022)
   * Documentation: https://daymet.ornl.gov/web_services
   * Specifically, we are querying Single Pixel Data. Not their Gridded Subsets
   */
  /*
  const getClimateData = async (lat, lon) => {
    try {
      const response = await fetch(`https://daymet.ornl.gov/single-pixel/api/data?lat=${lat}&lon=${lon}&vars=tmax,tmin,prcp&format=json`);
      const json = await response.json();
      setClimateData(json.data);
      return json.data;
    } catch (error) {
      console.error(error)
    }
  }
  */


  return (
    <div>
      <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <div className='heading'>
          <h1>Farm locations</h1>
        </div>
        <div id='listings' className='listings'></div>
      </div>
      <div ref={mapContainer} className="map-container" />
      <a href="/farms">
         Click Here to Redirect to Farms page
    </a>
    </div>
    
  );
}
