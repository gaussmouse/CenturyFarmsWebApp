import React, {useRef, useState, useEffect} from 'react';
import Filter from "../sidebar/Filter";
import SearchBar from "../sidebar/SearchBar";
import ActiveFilters from  "../sidebar/ActiveFilters";
import FarmListings from "../sidebar/FarmListings";

// Plugins
import ClickAwayListener from '@mui/base/ClickAwayListener';

// Stylesheets
import "../../stylesheets/inputs/sidebar.css"

export default function SidebarDrawer(props) {
    const {
        toggleLocationSidebar,
        setSearchQuery, 
        cropMultiSelectExpanded,
        setCropMultiSelectExpanded,
        currentCropFilters,
        setCropFilterQuery,
        cropFilters,
        setCropFilters,
        livestockMultiSelectExpanded,
        setLivestockMultiSelectExpanded,
        currentLivestockFilters,
        setLivestockFilterQuery,
        livestockFilters,
        setLivestockFilters,
        farms,
        validFarms,
        searchQuery,
        interviewedFarms,
        flyToFarm
    } = props;

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

    
return (
    <div id="locationSidebar" className="sidebar"> 
    <button 
        id="closeLocationSidebar" 
        className="closebtn" 
        onClick={toggleLocationSidebar}>
            ×
    </button>
    <SearchBar setQuery={setSearchQuery} />
    <div className="subheading">
        <h2>Filter by Current:</h2>
    </div>
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
    );
}