import React from 'react'

export default function SearchBar(props) {
  const { setQuery } = props

  function handleChange(event) {
    setQuery(event.target.value)
  }

  return (
    <div id="locationSearch" className="search">
    <input 
      type="text" 
      onChange={handleChange} 
      placeholder="Search farms.." 
      title="Search by name"
    /> 
    </div>
  )
}