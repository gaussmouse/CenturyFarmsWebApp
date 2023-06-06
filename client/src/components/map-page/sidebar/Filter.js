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
  } = props;

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
