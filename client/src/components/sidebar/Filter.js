/* 
   Code adapted from Filter Component by Cam Bass
   https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385
*/
import React from 'react'

// Components
import FilterDrowdown from "./FilterDropdown"
import FilterButton from "./FilterButton"

export default function Filter(props) {
  const { 
    multiSelectExpanded, 
    setMultiSelectExpanded, 
    currentFilters, 
    setFilterQuery,
    categoryName,
    filterCategory,
    setFilterCategory
  } = props

  return (
    <>
      <FilterButton 
        setMultiSelectExpanded={setMultiSelectExpanded}
        multiSelectExpanded={multiSelectExpanded}
        categoryName={categoryName}
      />

      {multiSelectExpanded && (
        <FilterDrowdown
          currentFilters={currentFilters}
          filterQuery={setFilterQuery}
          filterCategory={filterCategory}
          categoryName={categoryName}
        />
      )}

    </>
  )
}

/*
<button 
          id="filterSearch" 
          onClick={() => setFilterClicked(!filterClicked)}>
          Filter
        </button>
        <div 
          className="filter-menu" 
          style={{ display: filterClicked ? 'block' : 'none' }}>
          <label htmlFor="crop-type-filter">Crop Type:</label>
          {
            // TODO: add nesting for both filter categories
            // get list of crop categories and print
            cropFilters.map((cropType) => (
              <div className="crop-type-filter" key={cropType.id}>
                <label>
                  <input 
                    type="checkbox" 
                    name={cropType.type} 
                    value={cropType.type} 
                  />
                  {cropType.type}
                </label>
              </div>
            ))

            // get list of livestock categories and print
          }
        </div>
*/