import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import FarmsMap from './FarmsMap';
import {SearchBar} from '@rneui/themed';

/**
 * Overlaps FarmsMap component
 * Contains the search bar component
 * The search logic is found in FarmsMap
 *
 * Important: takes navigation variable from Routings.js
 * For app navigation to work, this must be passed into all
 * child components that navigate away from FarmsMap
 */
const Wrapper = ({navigation}) => {
  const [search, setSearch] = useState('');

  // Updates search hook to be most recent entry by user
  // Called by onChangeText which is part of SearchBar component
  // SearchBar is from rneui
  // Could be changed if a better react native search bar is found
  // Just make sure to pass the user's search entry to FarmsMap
  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View>
      <FarmsMap navigation={navigation} search={search} />
      <SearchBar
        style={styles.view}
        placeholder="Search farms, crops, etc..."
        onChangeText={updateSearch}
        value={search}
        searchIcon={{name: 'magnifying-glass', type: 'foundation'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
});

export default Wrapper;
