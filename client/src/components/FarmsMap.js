/**
 * FarmsMap Component
 * Main screen of the application
 *
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
//import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapboxGL, {Marker} from '@rnmapbox/maps';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
require('dotenv').config();

let AlertView = RNBottomActionSheet.AlertView;

// Mapbox access
// TODO: abstract token
MapboxGL.setAccessToken(process.env.MAPBOX_ACCESS_KEY);

/** Farm Data
 * Currently stored in a json file in the root directory
 * Could be converted into a database and queried from via an API
 * Hess' Cloud Dev course (CS493) teaches much of this
 *
 * This will become outdated each year as more farms are awarded
 * the Century Farm title. When this happens, download the latest version of the .csv at
 * http://ocfrp.library.oregonstate.edu/public/farms
 * follow the update instructions included in generateFarmJSON.py and run it
 * (or use a more elegant, automated way)
 */
const data = require('../farms.json');

//----------------------Styles----------------------
const styles = StyleSheet.create({
  infowindow: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  map: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
});

const FarmsMap = ({navigation, search}) => {
  const [farms, setFarms] = useState(data);
  var searchedFarms = [];
  const [selectedFarm, setSelectedFarm] = useState({});
  const [climateData, setClimateData] = useState({
    'year':[0],
    'yday':[0],
    'prcp (mm/day)':[0],
    'tmax (deg c)':[0],
    'tmin (deg c)':[0],
  });
  // 30 year averages for info window
  const [prcpAvg, setPrcpAvg] = useState('loading...');
  const [tempMaxAvg, setTempMaxAvg] = useState('loading...');
  const [tempMinAvg, setTempMinAvg] = useState('loading...');
  // 30 year average function
  const avg = array => array.reduce((a, b) => a + b) / array.length;

  //----------------------Search Functionality----------------------
  useEffect(() => {
    searchedFarms = []; // wipes previous searches from searchedFarms
    if (search !== '') {
      farms.find(farm => {
        // Look through all farm objects within farms
        // If any of the values of that farm object contain the user's EXACT search
        if (Object.values(farm).toString().toLowerCase()
          .includes(search.toLowerCase())
          // OR any of the farmData values have the user's EXACT search
          || Object.values(farm.farmData).toString().toLowerCase()
          .includes(search.toLowerCase())) {
          searchedFarms.push(farm); // add to searchedFarms
          // Exact is emphasized because it will look for a perfect substring
          // so searching for apples; barley will show different farms
          // than typing barley; apples
          // hosting this info on a db  and querying will make searching this much easier
        }
      });
      setFarms(searchedFarms);
    } else {
      // search field was empty, display all data
      setFarms(data);
    }
  }, [search]);

  //----------------------API Query----------------------
  /**
   * Requests data from daymet API
   * obtains climate data from 1980 to most recent year available (up to 2021 as of May, 2022)
   * Documentation: https://daymet.ornl.gov/web_services
   * Specifically, we are querying Single Pixel Data. Not their Gridded Subsets
   */
  const getClimateData = async (lat, lon) => {
    try {
      const response = await fetch(`https://daymet.ornl.gov/single-pixel/api/data?lat=${lat}&lon=${lon}&vars=tmax,tmin,prcp&format=json`);
      const json = await response.json();
      setClimateData(json.data);
      return json.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MapboxGL.MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 44.71,
          longitude: -122.96,
          latitudeDelta: 1.7,
          longitudeDelta: 1.7,
        }}
        mapType="satellite"
      >
        {Object.entries(farms).map(([key, farm]) => (
          // Place a marker for all farm objects inside farms array
          <Marker
            key={key} // to make react happy
            coordinate={{latitude: farm.latitude, longitude: farm.longitude}}
            pinColor="#360071"
            onPress={() => {
              getClimateData(farm.latitude, farm.longitude);
              if (climateData['tmax (deg c)'].length > 1) {
                // If we have actual queried data, not defaults
                const arrayLength = climateData['tmax (deg c)'].length;
                setPrcpAvg(avg(climateData['prcp (mm/day)'].slice(arrayLength - (365 * 30))).toFixed(2));
                setTempMaxAvg(avg(climateData['tmax (deg c)'].slice(arrayLength - (365 * 30))).toFixed(2));
                setTempMinAvg(avg(climateData['tmin (deg c)'].slice(arrayLength - (365 * 30))).toFixed(2));
                // Get prcp 30 year average
              }

              AlertView.Show({
                title: farm.name,
                message: `prcp: ${prcpAvg}mm\ntmax: ${tempMaxAvg}\u00B0C\ntmin: ${tempMinAvg}\u00B0C`,
                positiveText: 'Learn More',
                positiveBackgroundColor: '#eeffee',
                positiveTextColor: '#006500',
                negativeText: 'Exit',
                negativeBackgroundColor: 'red',
                negativeTextColor: '#006500',
                theme: 'light',
                onPositive: () => {
                  // navigate to this farm's page
                  navigation.navigate('FarmPage', {
                    farmName: farm.name,
                    longitude: farm.longitude,
                    latitude: farm.latitude,
                    farmData: farm.farmData,
                    url: farm.url.toString(),
                    years: climateData['year'],
                    precipData: climateData['prcp (mm/day)'],
                    tmaxData: climateData['tmax (deg c)'],
                    tminData: climateData['tmin (deg c)'],
                  });
                },
                onNegative: () => {
                  // Closes the panel by default
                },
              });
            }}
          /> // end Marker
        ))}
      </MapboxGL.MapView>
    </>
  );
};

export default FarmsMap;
