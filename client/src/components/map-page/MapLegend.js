import React from 'react';

// Stylesheets
import "../stylesheets/legend.css"

export default function MapLegend() {
  return (
    <div className="map-legend">
      <div className="legend-item">
        <span className="marker non-interviewed"></span>
        <span className="legend-label">Non-interviewed</span>
      </div>
      <div className="legend-item">
        <span className="marker interviewed"></span>
        <span className="legend-label">Interviewed</span>
      </div>
    </div>
  );
};
