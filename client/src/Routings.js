import * as React from 'react';
// Use Route and Routes to define different application routes
import { Route, Routes } from "react-router-dom";
// Import needed components for routings
import Wrapper from './reactComponents/Wrapper';
import FarmPage from "./reactComponents/FarmPage";
import FarmsMap from "./reactComponents/FarmsMap";

// Used for navigating to a specific farm's page
// TODO: routing to individual farms
// TODO: redo inheritance of "navigation" variable into Wrapper, FarmsPage
const Routings = () => (
    <Routes>
        <Route path="/" element={<Wrapper />}>
            <Route index element={<FarmsMap />}/>
        </Route>
        <Route path="/farms" element={<FarmPage />}/>
    </Routes>
)

/* 
    // The original Routings.js required native-stack which is only for mobile
    <Stack.Screen
        name="Wrapper"
        component={Wrapper}
        options={{headerShown: false}}
    />
    <Stack.Screen name="FarmPage" component={FarmPage} options={{title: ""}} />
*/

export default Routings;