/* 
   Component adapted from CategoryInput Component by Cam Bass
   https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385
*/
import React from 'react'

export default function FilterInput(props) {
  const { currentFilters, filterQuery, filter, index } = props

  function handleChange(event) {
    if (event.target.checked) {
        filterQuery([...currentFilters, event.target.value])
    } else {
        filterQuery((prevState) =>
        prevState.filter((prevItem) => prevItem !== event.target.value)
      )
    }
  }

  function checkedInput(value) {
    return currentFilters.includes(value)
  }

  return (
    <>
      <div key={index} className='multi-select'>
        <label>{filter.label}</label>
        <input 
          key={index} 
          type="checkbox" 
          name="filter" 
          checked={checkedInput(filter.value)}
          value={filter.value}
          className="multi-select-input"
          onChange={handleChange} />
      </div>
    </>
  )
}