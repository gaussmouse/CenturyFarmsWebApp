import React, {useRef, useState, useEffect} from 'react';
//import Checkbox from './Checkbox';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// public access key - rotated periodically
mapboxgl.accessToken = "add token here"; // not sure if this format works, token previously pasted directly in

export default function FarmsMap () {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.96);
  const [lat, setLat] = useState(44.71);
  const [zoom, setZoom] = useState(8);
  const [farms, setFarms] = useState([]);
  const [searchedFarms, setSearchedFarms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
 
  // -----------------------------------------------------------------------------
  /*
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
      mapFarmLocations(farmData);
    }
    initializeMap();
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, [lng, lat, zoom]);

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

  /*
  seEffect(() => {
    if (searchInput !== "" && farms) {
      const searchedFarms = farms.filter((farm) => {
        if (searchInput === '' || farm.properties.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return farm;
        }
      });
      setSearchedFarms(searchedFarms);
      mapFarmLocations(searchedFarms);
    }
    else {
      //setFarms(farmData);
      mapFarmLocations(farms);
    } 
  }, [searchInput, farms]);
  */

  /*
  * Gets farm locations to populate map with location markers
  */
  const getFarmLocations = async () => {
    const response = await fetch(`/location/`);
    //console.log(response);
    
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    //console.log(records);
    let farmPins = records.map(farm => (
      {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [farm.longitude, farm.latitude]
        },
        properties: {
            name: farm.name,
            county: farm.county,
            id: farm.locationID,
            address: farm.address
        }
      }
    ));
    return farmPins;
  };

  /*
  * Shows farm locations on map
  */
  const mapFarmLocations = (farmData) => {
    map.current.on('load', () => {
      // Add a popup for each marker
      farmData.forEach((farm) => {
        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true
        }).setHTML(
          `<h3>${farm.properties.name}</h3><p>${farm.properties.address}</p><a href="/farms/${farm.properties.id}">
          More Info</a>`
        );
        const marker = new mapboxgl.Marker({
          color: '#25921B',
        })
          .setLngLat(farm.geometry.coordinates)
          .setPopup(popup)
          .addTo(map.current);

           // Add a click event listener to each marker
        marker.getElement().addEventListener('click', () => {
          // Pan to the marker
          map.current.flyTo({
            center: marker.getLngLat(),
            zoom: 15,
          });
        });
      });
    });
  }   

  /*
    * Reorients map to focus on selected farm
    * Code adapted from (https://docs.mapbox.com/help/tutorials/building-a-store-locator/)
    */
  const flyToFarm = (CurrentFeature) => {
    map.current.flyTo({
      center: CurrentFeature.geometry.coordinates,
      zoom: 15
    });
  };

  /*
  * Sets styles of sidebar, map, and open/close buttons when
  *   called inside onClick from the open/close buttons
  */
  function showLocationSidebar() {
    var sidebar = document.getElementById('locationSidebar');
    var map = document.getElementById('main');
    var openButton = document.getElementById('openLocationSidebar');
    var closeButton = document.getElementById('closeLocationSidebar');
  
    // Toggle sidebar visibility
    if (sidebar.style.left === '-400px' || sidebar.style.left === '') {
      sidebar.style.left = '0';
      map.style.marginLeft = '400px';
      openButton.style.display = 'none';
      closeButton.style.display = 'block';
    } else {
      sidebar.style.left = '-400px';
      map.style.marginLeft = '0';
      openButton.style.display = 'block';
      closeButton.style.display = 'none';
    }
  }

 /* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */

  return (
    <div>
      <div id="locationSidebar" className="sidebar"> 
        <button id="closeLocationSidebar" className="closebtn" onClick={showLocationSidebar}>×</button>
        <div id="locationSearch" className="search">
          <input type="text" id="farmSearch" onChange={event => setSearchInput(event.target.value)} placeholder="Search farms.." title="Search by name"/> 
        </div>   
        <div className='heading'>
          <h1>Farm locations</h1>
        </div>
        <div id='listings' className='listings'>
            {farms.filter(farm => {
              if (searchInput === '' || farm.properties.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return farm;
              } 
            }).sort((a, b) => a.properties.name.localeCompare(b.properties.name)) // Sort farms alphabetically
            .map((farm) => (             
              <div key={farm.properties.id} className="item">
                <button id={"link-" + farm.properties.id} className="title" onClick={() => {flyToFarm(farm)}}>{farm.properties.name}</button>
                <div className="details">{farm.properties.address}</div>
              </div>
            ))}
        </div>
      </div> 
      <div id="main">
        <button id="openLocationSidebar" className="openbtn" onClick={showLocationSidebar}>☰ Farm Locations</button>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
    
  );
}