/* 
   Component adapted from FilterDropdown Component by Cam Bass
   https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385
*/
import React, { useState, useEffect } from 'react'

// Components
import FilterInput from "./FilterInput"

export default function FilterInputContainer(props) {
  const { currentFilters, filterQuery, filterCategory, categoryName } = props;


  return (
    <div className='filter-container'>
      <div className='filter-container-header'>
        {categoryName} type
      </div>

      {filterCategory.map((filter, index) => (
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

