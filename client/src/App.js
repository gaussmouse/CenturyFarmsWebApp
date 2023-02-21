// App behaves as the navigation wrapper
// Components of the program are found in /components

// TODO: Convert mobile "StyleSheet" inside react-components to .css file or start fresh
import './App.css';
import * as React from 'react';
// Use Route and Routes to define different application routes
import { Route, Routes } from "react-router-dom";
// Import needed components for routings
import Wrapper from './reactComponents/Wrapper';
import FarmPage from "./reactComponents/FarmPage";
import FarmsMap from "./reactComponents/FarmsMap";

// Application component routing
// Home page is a map with an overlaid search bar
// TODO: routing to individual farms
// TODO: redo inheritance of "navigation" variable into Wrapper, FarmsPage
const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Wrapper />}>
              <Route index element={<FarmsMap />}/>
          </Route>
          <Route path="" element={<FarmPage />}/>
        </Routes>
    </div>
  )
}

export default App;
