import React from 'react';

export default function FarmListings({
  farms,
  validFarms,
  searchQuery,
  interviewedFarms,
  flyToFarm
}) {
  return (
    <div id='listings' className='listings'>
        <div className='heading'>
            <h1>Century Farm Locations</h1>
            <div className="interviewed-farm-label">
                (*Interviewed)
            </div>
        </div>
      {farms
        .filter(farm => {
          if (validFarms.length === 0 || (validFarms && validFarms.includes(farm.properties.id))) {
            return true;
          }
          return false;
        })
        .filter(farm => {
          if (searchQuery === '' || 
            farm.properties.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
          return false; 
        })
        .sort((a, b) => a.properties.name.localeCompare(b.properties.name)) // Sort farms alphabetically
        .map((farm) => { 
          const isInterviewed = interviewedFarms.includes(farm.properties.id);            
          return (
          <div key={farm.properties.id} className="item">
            <button 
              id={"link-" + farm.properties.id} 
              className={`title ${isInterviewed ? 'interviewed' : ''}`} 
              onClick={() => {flyToFarm(farm)}}>
              {farm.properties.name}
            </button>
            <div className="details">{farm.properties.address}</div>
          </div>
          );
        })
      }
    </div>
  );
}
