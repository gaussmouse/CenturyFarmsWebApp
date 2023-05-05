import React, {useRef, useState, useEffect} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filter from "../components/sidebar/Filter";
import SearchBar from "../components/sidebar/SearchBar";

// Plugins
import ClickAwayListener from '@mui/base/ClickAwayListener';

// Stylesheets
import "./stylesheets/inputs/sidebar.css"

// public access key - rotated periodically
mapboxgl.accessToken = "add token here"; 

export default function FarmsMap () {
  // map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.96);
  const [lat, setLat] = useState(44.71);
  const [zoom, setZoom] = useState(8);
  const [farms, setFarms] = useState([]);

  // search
  //const [searchedFarms, setSearchedFarms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCropFilters, setCropFilterQuery] = useState([]);
  const [currentLivestockFilters, setLivestockFilterQuery] = useState([]);
  const [cropMultiSelectExpanded, setCropMultiSelectExpanded] = useState(false);
  const [livestockMultiSelectExpanded, setLivestockMultiSelectExpanded] = useState(false);
  const [cropFilters, setCropFilters] = useState([]);
  const [livestockFilters, setLivestockFilters] = useState([]);
  const [crops, setCrops] = useState([]);
  //const [validCrops, setValidCrops] = useState([]);
  const [livestock, setLivestock] = useState([]);
  //const [validLivestock, setValidLivestock] = useState([]);
  const [currentFarmInfo, setCurrentFarmInfo] = useState([]);
  const [validFarms, setValidFarms] = useState([]);
 
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

      const cropFilters = await getCropFilters();
      const livestockFilters = await getLivestockFilters();
      setCropFilters(cropFilters);
      setLivestockFilters(livestockFilters);
      
      const crops = await getCrops();
      const livestock = await getLivestock();
      setCrops(crops);
      setLivestock(livestock);

      const currentFarmInfo = await getCurrentFarmInfo();
      setCurrentFarmInfo(currentFarmInfo);
    }
    initializeMap();
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, [lng, lat, zoom]);

  
  useEffect(() => {
    // If currentFilters not null, fetch livestock types & crop types w/IDs that match
    if (currentCropFilters === null && currentLivestockFilters === null) return;
    //console.log(currentCropFilters);
    //console.log(currentLivestockFilters);
    
    // Fetch crop & livestock IDs that have matching type IDs to the current filters
    const validCrops = crops.filter(crop => {
      let cropTypeID = crop.typeID.split(";");
      for (let i = 0; i < cropTypeID.length; i++) {
        if (currentCropFilters.includes(cropTypeID[i])) {
          return true;
        }
      } 
      return false;
    }).map(crop => crop.ID);
    //console.log(validCrops);
     
    const validLivestock = livestock.filter(animal => {
      if (currentLivestockFilters.includes(String(animal.typeID))) {
        return true;
      }
      return false;
    }).map(animal => animal.ID);
    //console.log(validLivestock);

    const validFarms = currentFarmInfo.filter(currentFarm => {
       let currentCrops = currentFarm.cropID.split(";");
       let currentLivestock = currentFarm.livestockID.split(";");
      
      for (let i = 0; i < currentCrops.length; i++) {
        if (validCrops.includes(parseInt(currentCrops[i]))) {
          return true;
        }
      }
      for (let i = 0; i < currentLivestock.length; i++) {
        if (validLivestock.includes(parseInt(currentLivestock[i]))) {
          return true;
        }
      }
      return false;
    }).map(currentFarm => currentFarm.ID);
    setValidFarms(validFarms);
    console.log(validFarms);

    // Check farmcurrent's crop & livestock IDs to match against valid crop/livestock IDs
    // Make filterd list of farm IDs


  }, [searchQuery, crops, livestock, currentFarmInfo,
    currentCropFilters, currentLivestockFilters]);


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
    * Gets crop categories for farm search filter
    */
  const getCropFilters = async () => {
    const response = await fetch(`/cropType/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let cropFilters = records.map(cropType => (
      {
        label: cropType.type,
        value: cropType.cropTypeID
      }
    ));
    
    //console.log(cropFilters);
    return cropFilters;
  }

  /*
  * Gets livestock categories for farm search filter
  */
  const getLivestockFilters = async () => {
    const response = await fetch(`/livestockType/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let livestockFilters = records.map(livestockType => (
      {
        label: livestockType.livestockType,
        value: livestockType.livestockTypeID
      }
    ));
    return livestockFilters;
  }

  /*
  * Gets all crops for farm filtering
  */
  const getCrops = async () => {
    const response = await fetch(`/crop/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let crops = records.map(cropType => (
      {
        ID: cropType.cropID,
        name: cropType.name,
        typeID: cropType.cropTypeID
      }
    ));
    
    //console.log(crops);
    return crops;
  }

  /*
  * Gets all livestock for farm filtering
  */
  const getLivestock = async () => {
    const response = await fetch(`/livestock/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let livestock = records.map(livestockType => (
      {
        ID: livestockType.id,
        name: livestockType.name,
        typeID: livestockType.livestockTypeID
      }
    ));
    
    //console.log(livestock);
    return livestock;
  }

  /*
  * Gets all livestock for farm filtering
  */
  const getCurrentFarmInfo = async () => {
    const response = await fetch(`/currentFarm/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let currentFarmInfo = records.map(currentFarm => (
      {
        ID: currentFarm.farmCurrentID,
        cropID: currentFarm.cropID,
        livestockID: currentFarm.livestockID
      }
    ));
    
    console.log(currentFarmInfo);
    return currentFarmInfo;
  }

  /*
  * Reorients map to focus on selected farm
  * Code adapted from (https://docs.mapbox.com/help/tutorials/building-a-store-locator/)
  */
  const flyToFarm = (CurrentFeature) => {
    toggleLocationSidebar();
    map.current.flyTo({
      center: CurrentFeature.geometry.coordinates,
      zoom: 15
    });
  };

  /*
  * Resets multiselectexpanded state if user clicks away
  * Code by Cam Bass (https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385)
  */
  const handleClickAway = (filterType) => {
    if (filterType === "crop")
      setCropMultiSelectExpanded(false)
    else if (filterType === "livestock")
      setLivestockMultiSelectExpanded(false)
  }

  /*
  * Sets styles of sidebar, map, and open/close buttons when
  *   called inside onClick from the open/close buttons
  */
  function toggleLocationSidebar() {
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
        <button 
          id="closeLocationSidebar" 
          className="closebtn" 
          onClick={toggleLocationSidebar}>
            ×
        </button>

        <SearchBar setQuery={setSearchQuery} />
        
        <ClickAwayListener onClickAway={() => {handleClickAway("crop")}}>
          <div className='outer-filter-container'>
            <Filter 
              multiSelectExpanded={cropMultiSelectExpanded}
              setMultiSelectExpanded={setCropMultiSelectExpanded}
              currentFilters={currentCropFilters} 
              setFilterQuery={setCropFilterQuery}
              categoryName="Crop"
              filterCategory={cropFilters}
              setFilterCategory={setCropFilters}
            />
          </div>
        </ClickAwayListener>

        <ClickAwayListener onClickAway={() => {handleClickAway("livestock")}}>
          <div className='outer-filter-container'>
            <Filter 
              multiSelectExpanded={livestockMultiSelectExpanded}
              setMultiSelectExpanded={setLivestockMultiSelectExpanded}
              currentFilters={currentLivestockFilters} 
              setFilterQuery={setLivestockFilterQuery}
              categoryName="Livestock"
              filterCategory={livestockFilters}
              setFilterCategory={setLivestockFilters}
            />
          </div>
        </ClickAwayListener>

        <div className='heading'>
          <h1>Farm locations</h1>
        </div>
        <div id='listings' className='listings'>
          {farms.filter(farm => {
            if (searchQuery === '' || 
              farm.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              validFarms.includes(farm.properties.id)) {
              return true;
            }
            return false; 
          })
          .sort((a, b) => a.properties.name.localeCompare(b.properties.name)) // Sort farms alphabetically
          .map((farm) => (             
            <div key={farm.properties.id} className="item">
              <button 
                id={"link-" + farm.properties.id} 
                className="title" 
                onClick={() => {flyToFarm(farm)}}>
                 {farm.properties.name}
              </button>
              <div className="details">{farm.properties.address}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="main">
        <button 
          id="openLocationSidebar" 
          className="openbtn" 
          onClick={toggleLocationSidebar}>
            ☰ Farm Locations
        </button>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
    
  );
}