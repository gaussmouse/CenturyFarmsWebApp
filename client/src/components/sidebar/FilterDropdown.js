/* 
   Component adapted from FilterDropdown Component by Cam Bass
   https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385
*/
import React, { useState, useEffect } from 'react'

// Components
import FilterInput from "./FilterInput"

export default function FilterInputContainer(props) {
  const { currentFilters, filterQuery } = props
  const [cropFilters, setCropFilters] = useState([])
  const [livestockFilters, setLivestockFilters] = useState([])

  useEffect(() => {
  /*
  * Gets crop categories for farm search filter
  */
  const getCropFilters = async () => {
    const response = await fetch(`/croptype/`);

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
    setCropFilters(cropFilters);
    console.log(cropFilters);
  }
  getCropFilters();

  /*
  * Gets livestock categories for farm search filter
  */
  const getLivestockFilters = async () => {
    const response = await fetch(`/livestocktype/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    let livestockFilters = records.map(livestockType => (
      {
        id: livestockType.livestockTypeID,
        type: livestockType.type
      }
    ));
    setLivestockFilters(livestockFilters);
  }
  //getLivestockFilters()
  }, [setCropFilters, setLivestockFilters]);

  return (
    <div className='filter-container'>
      <div className='filter-container-header'>
        Crop type
      </div>

      {cropFilters.map((filter, index) => (
        <FilterInput 
          key={index}
          currentFilters={currentFilters}
          filterQuery={filterQuery}
          filter={filter}
          index={index}
        />
      ))}
    </div>
  )
}