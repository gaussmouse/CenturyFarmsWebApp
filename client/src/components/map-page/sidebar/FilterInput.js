/* 
   Component adapted from CategoryInput Component by Cam Bass
   https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385
*/
import React, { useState } from 'react'

export default function FilterInput(props) {
  const { currentFilters, filterQuery, filter, index } = props;
  const [checked, setChecked] = useState(currentFilters.includes(String(filter.value)));

  function handleChange(event) {
    const value = event.target.value;
    setChecked(event.target.checked);
    if (event.target.checked) {
      
        filterQuery([...currentFilters, value]);
      
    } else {
      filterQuery(currentFilters.filter(item => item !== value));
    }
    //console.log(value);
    //console.log(currentFilters)
  }

  return (
    <>
      <div key={index} className='multi-select'>
        <label>{filter.label}</label>
        <input 
          key={index} 
          type="checkbox" 
          name="filter" 
          checked={checked}
          value={filter.value}
          className="multi-select-input"
          onChange={handleChange} />
      </div>
    </>
  )
}