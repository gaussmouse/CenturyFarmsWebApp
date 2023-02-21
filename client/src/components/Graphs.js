/**
 * Graphs Component
 * 
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

 /**
  * Victory native is our visualization tool for graphs on individual farm pages
  * 
  * Documentation: https://formidable.com/open-source/victory/docs/native/
  * Most of its documentation is for React, not React Native
  * but most (if not all) of the components work the same
  * and can be imported with the same name
  */
import {
  VictoryBar, 
  VictoryChart, 
  VictoryAxis, 
  VictoryLine 
} from 'victory-native';

// --------------------------------------------------------------------------------------------------------
// Graphs min and max temperature averages by year
// Takes in daymet climate data
const TempGraph = ({years, data_min, data_max}) => {
  var unique_years = [...new Set(years)];
  var temp_min_obj = [];
  var temp_max_obj = [];
  var min_averages = [];
  var max_averages = [];

  // Array setup for computing averages
  for (var i = 0; i < data_min.length; i++) {
    const min_data = (1.8 * data_min[i]) + 32
    const max_data = (1.8 * data_max[i]) + 32
    temp_min_obj.push({x: years[i], y: min_data});
    temp_max_obj.push({x: years[i], y: max_data});
  }

  // Compute yearly temp averages store them in max_averages & min_averages
  for (var i = 0; i < unique_years.length; i++) {
    var temp_min_by_year = temp_min_obj.filter(res =>
      res.x.toString().includes(unique_years[i].toString()),
    );
    const temp_min_average =
      temp_min_by_year.reduce((total, next) => total + next.y, 0) /
      temp_min_by_year.length;
    min_averages.push({x: unique_years[i], y: temp_min_average});

    var temp_max_by_year = temp_max_obj.filter(res =>
      res.x.toString().includes(unique_years[i].toString()),
    );
    const temp_max_average =
      temp_max_by_year.reduce((total, next) => total + next.y, 0) /
      temp_max_by_year.length;
    max_averages.push({x: unique_years[i], y: temp_max_average});
  }

  return (
    <View style={graphStyles.container}>
      <VictoryChart maxDomain={{y: 100}}>
        <VictoryAxis
          dependentAxis
          style={{
            grid: {stroke: '#D9D9D9', strokeWidth: 1},
          }}/>
        <VictoryAxis
          tickFormat={t => `${t}`}
          style={{
            grid: {stroke: '#D9D9D9', strokeWidth: 1},
          }}/>
        <VictoryLine
          style={{
            data: {stroke: 'blue'},
            parent: {border: '1px solid #ccc'},
          }}
          data={min_averages}
        />
        <VictoryLine
          style={{
            data: {stroke: '#e4211c'},
            parent: {border: '1px solid #ccc'},
          }}
          data={max_averages}
        />
      </VictoryChart>
    </View>
  );
}

// Graphs precipitation averages by year
// Takes in daymet climate data
const PrecipGraph = ({years, data}) => {
  var unique_years = [...new Set(years)]
  var data_obj = []
  var precipData = []

  // Array setup for computing average
  for (var i = 0; i < data.length; i++) {
    data_obj.push({x: years[i], y: data[i], y0: 0});
  }

  // Compute yearly precip average for each year and store it in precipData
  for (var i = 0; i < unique_years.length; i++) {
    var data_by_year = data_obj.filter(res =>
      res.x.toString().includes(unique_years[i].toString()),
    );
    const average =
      data_by_year.reduce((total, next) => total + next.y, 0) /
      data_by_year.length;
    precipData.push({x: unique_years[i], y: average, y0: 0});
  }

  return (
    <View style={graphStyles.container}>
      <VictoryChart maxDomain={{y: 15}}>
        <VictoryAxis 
          dependentAxis 
          style={{
            grid: {stroke: '#D9D9D9', strokeWidth: 1},
          }}/>
        <VictoryAxis 
          tickFormat={t => `${t}`}
          style={{
            grid: {stroke: '#D9D9D9', strokeWidth: 1},
          }}/>
        <VictoryBar
          width={350}
          style={{data: {fill: '#66ccff'}}}
          data={precipData}
        />
      </VictoryChart>
    </View>
  );
}

const graphStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});

// --------------------------------------------------------------------------------------------------------
// Display all graphs
const Graphs = ({years, precipData, tmaxData, tminData}) => {
  return (

    <View>
      <Text style={styles.titleText}>Temperature (°F)</Text>
      <TempGraph years={years} data_min={tminData} data_max={tmaxData}/>
      <Text style={styles.titleText}>Precipitation (Inches)</Text>
      <PrecipGraph years={years} data={precipData}/>
    </View>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  allText: {
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  titleText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 26,
    backgroundColor: '#fff',
  }
});

export default Graphs;
