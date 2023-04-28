// App behaves as the navigation wrapper
// Components of the program are found in /components
import * as React from 'react';
/// mapbox styling
import 'mapbox-gl/dist/mapbox-gl.css';
// Use Route and Routes to define different application routes
import { Route, Routes } from "react-router-dom";
// Import needed components for routings
import FarmPage from "./components/FarmsPage";
import FarmsMap from "./components/FarmsMap";

// Application component routing
// Home page is a map with an overlaid search bar
const App = () => {
  return(
    <Routes>
      <Route path="/" element={<FarmsMap />}/> 
      <Route path="/farms/:id" element={<FarmPage />}/>
    </Routes>
  )
}

export default App;
