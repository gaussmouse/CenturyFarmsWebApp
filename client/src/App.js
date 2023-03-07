// App behaves as the navigation wrapper
// Components of the program are found in /components

// TODO: Convert mobile "StyleSheet" inside react-components to .css file or start fresh
//import './App.css';
import * as React from 'react';
/// mapbox styling
import 'mapbox-gl/dist/mapbox-gl.css';
// Use Route and Routes to define different application routes
import { Route, Routes } from "react-router-dom";
// Import needed components for routings
//import Wrapper from './components/Wrapper';
import FarmPage from "./components/FarmsPage";
import FarmsMap from "./components/FarmsMap";

// Application component routing
// Home page is a map with an overlaid search bar
// TODO: routing to individual farms
// TODO: redo inheritance of "navigation" variable into Wrapper, FarmsPage
const App = () => {
  return(
    <Routes>
        <Route path="/" element={<FarmsMap />}/> 
        <Route path="/farms" element={<FarmPage />}/>
    </Routes>
  )
}

export default App;
