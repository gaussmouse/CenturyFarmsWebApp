/* 
   Component adapted from FilterButton Component by Cam Bass
   https://cambass.medium.com/building-a-category-filter-with-reactjs-mern-stack-193f46ff385
*/
import React from 'react'

// Images
import Arrow from "../../../images/arrow.svg"

export default function FilterButton(props) {
  const { multiSelectExpanded, setMultiSelectExpanded, categoryName } = props;

  return (
    <>
      <div 
        className='filter-dropdown' 
        onClick={() => setMultiSelectExpanded(!multiSelectExpanded)}
        style={{ backgroundColor: multiSelectExpanded ? `#fff` : ``}}
      >
        <span className='filter-title' >{categoryName === "Crop" ? categoryName + 's' : categoryName}</span>
        <img
          alt=""
          src={Arrow}
          style={{
            transform: multiSelectExpanded ? `rotate(180deg)` : `rotate(0deg)`,
            transitionDuration: `150ms`,
          }}
        />
      </div>
    </>
  )
}