import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Graphs from './Graphs';
import DropShadow from 'react-native-drop-shadow';

/**
 * Profile Preset provided by bootday.com
 * https://www.bootdey.com/react-native-snippet/16/profile-detail
 */

const FarmPage = props => {
  const farm = props.route.params
  var historicalData = [];
  var currentData = [];
  // Generate an array of strings to be mapped
  // Separates current and historical data included in century farm application
  for (const [key, value] of Object.entries(farm.farmData)) {
    if (value && key !== '' && value !== '') {
      switch (key) {
        case 'Crops or livestock historically raised on property':
          historicalData.push(`${key}: ${value}`);
          break;
        case 'Ethnic origin of original owners':
          historicalData.push(`${key}: ${value}`);
          break;
        case 'Origin of original owners':
          historicalData.push(`${key}: ${value}`);
          break;
        case 'Original Acreage':
          historicalData.push(`${key}: ${value}`);
          break;
        case 'Original Owner':
          historicalData.push(`${key}: ${value}`);
          break;
        case 'Please describe attachments':
          // Describes attatchments of pdf that can be downloaded
          // separately on the OCFRP website. We don't use these at the moment,
          // but they could be downloaded and displayed here later
          break;
        case 'Please explain':
          // more pdf info we don't want to display right now
          break;
        case 'Year of Property Acquisition':
          historicalData.push(`${key}: ${value}`);
          break;
        // Remaining cases have unnecessary info
        case 'Application on file':
          break;    
        case 'Genealogical information included':
          break;
        case 'Other':
          break;
        default:
          currentData.push(`${key}: ${value}`);
      }
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {farm.url !== '0' ? (
          <View style={styles.imageCard}>
            <Image style={styles.avatar} source={{uri: farm.url}} /> 
            <DropShadow style={[styles.shadow]}>
              <View style={styles.imageOverlay}>
                <Text style={styles.farmNameImg}>{farm.farmName}</Text>
                <Text style={styles.subTitleImg}>
                  Est.{farm.farmData['Year of Property Acquisition']}
                </Text>
              </View>
            </DropShadow>
          </View> 
        ) : (
          <View style={[styles.card, styles.profileCard]}> 
            <Text style={styles.farmName}>{farm.farmName}</Text>
            <Text style={styles.subTitle}>
              Est.{farm.farmData['Year of Property Acquisition']}
            </Text>
          </View>
        )}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Data</Text>
          {currentData.map((info, key) => (
            <Text key={key} style={styles.bodyText}>
              {info}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historical Data</Text>
          {historicalData.map((info, key) => (
            <Text key={key} style={styles.bodyText}>
              {info}
            </Text>
          ))}
        </View>
        
        <View style={styles.graphsCard}>
          <Text style={styles.cardTitle}>Graphs</Text>
          <View style={styles.graphsContainer}>
            <Graphs
              years={farm.years}
              precipData={farm.precipData}
              tminData={farm.tminData}
              tmaxData={farm.tmaxData}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor: '#DCDCDC'
  },
  cardTitle:{
    color:'#000',
    fontSize:22,
    marginBottom:5,
  },
  avatar:{
    width:250,
    height:300,
    borderRadius:10,
  },
  card:{
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    padding:10,
    marginTop:10,
  },
  imageOverlay:{
    position:'relative',
    padding:'2%',
    backgroundColor:'#FFF',
    alignItems:'center',
    marginBottom:5,
    borderRadius:10
  },
  profileCard:{
    alignItems: 'center',
    marginTop:5,
  },
  imageCard:{
    alignItems: 'center',
    marginTop:5,
  },
  farmNameImg:{
    position:'relative',
    fontSize:22,
    color:'#000',
  },
  farmName:{
    fontSize:22,
    color:'#000',
  },
  subTitle: {
    color:'#808080',
    fontSize:14,
    marginBottom:1
  },
  subTitleImg: {
    position:'relative',
    color:'#808080',
    fontSize:14,
    marginBottom:1
  },
  graphsContainer:{
    height: 'auto',
  },
  graphsCard:{
    marginTop:10,
  },
  bodyText:{
    color:'#808080',
    margin:5
  },
  shadow: {
    position:'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: .7,
    shadowRadius: 2,
  },
});

export default FarmPage;
