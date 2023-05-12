import React, {useRef, useState, useEffect} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Filter from "../components/sidebar/Filter";
import SearchBar from "../components/sidebar/SearchBar";
import ActiveFilters from  "../components/sidebar/ActiveFilters"
import FarmListings from "../components/sidebar/FarmListings"
import PopupTutorial from "../components/PopupTutorial"
import { FaQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
//import { historicMaxTemp } from '../historicMaxTempData';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCropFilters, setCropFilterQuery] = useState([]);
  const [currentLivestockFilters, setLivestockFilterQuery] = useState([]);
  const [cropMultiSelectExpanded, setCropMultiSelectExpanded] = useState(false);
  const [livestockMultiSelectExpanded, setLivestockMultiSelectExpanded] = useState(false);
  const [cropFilters, setCropFilters] = useState([]);
  const [livestockFilters, setLivestockFilters] = useState([]);
  const [crops, setCrops] = useState([]);
  const [livestock, setLivestock] = useState([]);

  const [currentFarmInfo, setCurrentFarmInfo] = useState([]);
  const [validFarms, setValidFarms] = useState([]);
  const [interviewedFarms, setInterviewedFarms] = useState([]);

  const [historicPrecipitationData, setHistoricPrecipitationData] = useState([]);
  const [historicMaxTemps, sethistoricMaxTemps] = useState([]);
  const [historicMinTemps, setHistoricMinTemps] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  /*
  * Initializes map
  */
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    const initializeMap = async () => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      // Get climate data for each farm marker pop-up window
      //const historicPrecipitationData = getHistoricPrecipitation();
      //const historicMaxTemps = getHistoricPrecipitation();
      //const historicMinTemps = getHistoricPrecipitation();
      //setHistoricPrecipitationData(historicPrecipitationData);
      //sethistoricMaxTemps(historicMaxTemps);
      //setHistoricMinTemps(historicMinTemps);
      
      // Define interviewed farms for visual differentiation
      const interviewedFarms = await getInterviewedFarms();
      setInterviewedFarms(interviewedFarms);

      // Define farms and create map markers
      const farmData = await getFarmLocations();  
      setFarms(farmData);  
      mapFarmLocations(farmData, interviewedFarms);

      // Define crop and livestock filters
      const cropFilters = await getCropFilters();
      const livestockFilters = await getLivestockFilters();
      setCropFilters(cropFilters);
      setLivestockFilters(livestockFilters);
      
      // Define crops and livestock for farm filtering
      const crops = await getCrops();
      const livestock = await getLivestock();
      setCrops(crops);
      setLivestock(livestock);

      // Define currentFarmInfo for farm filtering
      const currentFarmInfo = await getCurrentFarmInfo();
      setCurrentFarmInfo(currentFarmInfo);

    }
    initializeMap();
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

  }, [lng, lat, zoom]);

  
  /*
  * Set farms to display based on active crop/livestock filters
  */
  useEffect(() => {
    // Fetch crop & livestock IDs that have matching type IDs to the current filters
    const validCrops = crops.filter(crop => {
      let cropTypeID = crop.typeID.split(";");  // crops may have multiple types delimited by ;
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

    // Create list of valid farm IDs based on presence of valid crop/livestock
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
    //console.log(validFarms);

    // Check farmcurrent's crop & livestock IDs to match against valid crop/livestock IDs
    // Make filterd list of farm IDs
  }, [searchQuery, crops, livestock, currentFarmInfo,
    currentCropFilters, currentLivestockFilters]);

  /*
    * Sets new longitude, latitude, zoom on move
    */
  useEffect(() => {
    if (!map.current) return; // Wait for map to initialize
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
  * Gets historic precipitation data for 100+ years
  */
  const getHistoricPrecipitation = async () => {
    const response = await fetch(`/hPercipitation`);
    //console.log(response);
    
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    //console.log(records);
    let hPrecipitationData = records.map(hPrecipData => (
      {
        id: hPrecipData.farmID,
        data: Object.values(hPrecipData).filter(val => typeof val === 'number')
      }
    ));
    console.log(hPrecipitationData);
    return hPrecipitationData;
  };

  /*
  * Shows farm locations on map
  */
  const mapFarmLocations = (
    farmData, 
    interviewedFarms
    ) => {
    map.current.on('load', () => {
      // Add a popup for each marker
      farmData.forEach((farm) => {
        /*
        // historicPrecipitationData is a Promise here, needs fixing
        console.log(historicPrecipitationData);
        historicPrecipitationData.forEach(hPrecipData => {
          if (hPrecipData.id === farm.id) {
            return true;
          }
          return false;
        })
        const hPrecipitationData = historicPrecipitationData.filter(hPrecipData => {
          if (hPrecipData.id === farm.id) {
            return true;
          }
          return false;
        }).map(hPrecipData => hPrecipData.data);
        const hMaxTemp = historicMaxTemps.filter(hMaxT => {
          if (hMaxT.id === farm.id) {
            return true;
          }
          return false;
        }).map(hMaxT => hMaxT.data);
        const hMinTemp = historicMinTemps.filter(hMinT => {
          if (hMinT.id === farm.id) {
            return true;
          }
          return false;
        }).map(hMinT => hMinT.data);
        */

        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true
        }).setHTML(
          `<h3>${farm.properties.name}</h3><p>${farm.properties.address}</p><a href="/farms/${farm.properties.id}">
          More Info</a>`
        );

        const markerColor = interviewedFarms.includes(farm.properties.id) ? 'rgb(255, 208, 0)' : '#25921B';

        const marker = new mapboxgl.Marker({
          color: markerColor,
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
    
    // Alphabetize list and place "Other" category at the end
    cropFilters.sort((a, b) => {
      if (a.label === 'Other crops' && b.label !== 'Other crops') {
        return 1;
      } else if (a.label !== 'Other crops' && b.label === 'Other crops') {
        return -1;
      } else {
        return a.label.localeCompare(b.label);
      }
    });

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

    // Alphabetize list and place "Other" category at the end
    livestockFilters.sort((a, b) => {
      if (a.label === 'Other' && b.label !== 'Other') {
        return 1;
      } else if (a.label !== 'Other' && b.label === 'Other') {
        return -1;
      } else {
        return a.label.localeCompare(b.label);
      }
    });

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
  * Gets current farm info to create valid farm ID list for farm filtering
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
    
    //console.log(currentFarmInfo);
    return currentFarmInfo;
  }

  /*
  * Gets interviewed farms info for visually differentiation
  */
  const getInterviewedFarms = async () => {
    const response = await fetch(`/farmdesc/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let farms = records.map(interviewedFarm => (
      {
        ID: interviewedFarm.farmCurrentID,
        interviewed: interviewedFarm.interviewed
      }
    ));
    
    //console.log(farms);
    const interviewedFarms = farms.filter(interviewedFarm => {
      if (interviewedFarm.interviewed === "yes") {
        return true;
      }
      return false;
    }).map(interviewedFarm => interviewedFarm.ID);

    //console.log(interviewedFarms);
    return interviewedFarms;
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
  * Code adapted by Cam Bass (https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385)
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
        <div id='filter-wrapper'>
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
        </div>

        <ActiveFilters
          activeFilters={currentCropFilters}
          filterNames={cropFilters}
          filterCategory="Crop"
        />

        <ActiveFilters
          activeFilters={currentLivestockFilters}
          filterNames={livestockFilters}
          filterCategory="Livestock"
        />

        <FarmListings 
          farms={farms}
          validFarms={validFarms}
          searchQuery={searchQuery}
          interviewedFarms={interviewedFarms}
          flyToFarm={flyToFarm}
        />
      </div>

      <div id="main">
      <button id="qbtn" className="question-mark-container" onClick={() => openModal()}>
        ?
      </button>
        <button 
          id="openLocationSidebar" 
          className="openbtn" 
          onClick={toggleLocationSidebar}>
            ☰ Farm Locations
        </button>
        <div ref={mapContainer} className="map-container" />
        <PopupTutorial 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
    
  );
}