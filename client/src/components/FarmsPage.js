import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-simple-tabs-component/dist/index.css';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import HistoricClimateGraphs from './HistoricClimateGraphs';
import FutureClimateGraphs from "./FutureClimateGraphs";

let farmID = "";
var farmPicList = []

const FarmDetails = () => {
  farmID = useParams();
  farmID = farmID.id;
}

function FarmData() {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const farmDescResponse = await fetch(`/farmdesc/farmPastID/` + farmID);
      const locationResponse = await fetch(`/location/id/` + farmID);
      const pastFarmResponse = await fetch(`/pastFarm/id/` + farmID);
    
      const farmDescRecords = await farmDescResponse.json();
      const locationRecords = await locationResponse.json();
      const pastFarmRecords = await pastFarmResponse.json();

      const newData = [];
      const coordinates = [];
      coordinates.push(locationRecords[0].latitude);
      coordinates.push(locationRecords[0].longitude);
      const formattedCoords = `(${coordinates.join(', ')})`;

      if (farmDescRecords[0].name) {
        newData.push(`Farm name: ${farmDescRecords[0].name}`);
      } else {
        newData.push(`Farm name: Farm name not found`);
      }

      if (locationRecords[0].address) {
        newData.push(`Address: ${locationRecords[0].address}`);
      } else {
        newData.push(`Address: Address not found`);
      }

      if (locationRecords[0].county) {
        newData.push(`County: ${locationRecords[0].county}`);
      } else {
        newData.push(`County: County not found`);
      }

      if (farmDescRecords[0].awardType) {
        newData.push(`Award Type: ${farmDescRecords[0].awardType}`);
      } else {
        newData.push(`Award Type: Award type not found`);
      }

      if (pastFarmRecords[0].yearPropertyAcquisition) {
        newData.push(`Year of Property Acquisition: ${pastFarmRecords[0].yearPropertyAcquisition}`);
      } else {
        newData.push(`Year of Property Acquisition: Year of property acquisition not found`);
      }

      if (locationRecords[0].latitude && locationRecords[0].longitude) {
        newData.push(`GPS Coordinates: ${formattedCoords}`);
      } else {
        newData.push(`GPS Coordinates: GPS coordinates not found`);
      }

      setCurrentData(newData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <FarmSinglePicture />
      <div style={{ textAlign: 'center' }}>
        {currentData.map((data, index) => {
          const [label, value] = data.split(': ');
          return (
            <p key={index}>
              <b>{label}:</b> {value}
            </p>
          );
        })}
      </div>
    </div>
  )
}

function CurrentFarmData() {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const currFarmResponse = await fetch(`/currentFarm/id/` + farmID);
      const currOwnerResponse = await fetch(`/currentOwner/id/` + farmID);
    
      const currentOwnerRecords = await currOwnerResponse.json();
      const currentFarmRecords = await currFarmResponse.json();

      const newData = [];

      const cropList = await getCropNames(currentFarmRecords[0].cropID);
      const livestockList = await getLivestockNames(currentFarmRecords[0].livestockID);

      if (currentOwnerRecords[0].name) {
        newData.push(`Current Owner: ${currentOwnerRecords[0].name}`);
      } else {
        newData.push(`Current Owner: Current owner not found`);
      }

      if (currentOwnerRecords[0].relationshipToOriginalOwners) {
        newData.push(`Relationship to Original Owner: ${currentOwnerRecords[0].relationshipToOriginalOwners}`);
      } else {
        newData.push(`Relationship to Original Owner: Relationship not found`);
      }

      if (currentFarmRecords[0].currentAcreage) {
        newData.push(`Current Acreage: ${currentFarmRecords[0].currentAcreage}`);
      } else {
        newData.push(`Current Acreage: Current acreage not found`);
      }

      newData.push(`Crops: ${cropList}`);
      newData.push(`Livestock: ${livestockList}`);

      console.log(newData);
      setCurrentData(newData);
    }

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {currentData.map((data, index) => {
        const [label, value] = data.split(': ');
        return (
          <p key={index}>
            <b>{label}:</b> {value}
          </p>
        );
      })}
    </div>
  )
}

function PastFarmData() {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pastFarmResponse = await fetch(`/pastFarm/id/` + farmID);
      const originalOwnerResponse = await fetch(`/originalOwner/id/` + farmID);
    
      const originalOwnerRecords = await originalOwnerResponse.json();
      const pastFarmRecords = await pastFarmResponse.json();

      const newData = [];

      const cropList = await getCropNames(pastFarmRecords[0].cropID);
      const livestockList = await getLivestockNames(pastFarmRecords[0].livestockID);

      if (originalOwnerRecords[0].name) {
        newData.push(`Original Owner: ${originalOwnerRecords[0].name}`);
      } else {
        newData.push(`No original owner found`);
      }

      if (originalOwnerRecords[0].origin) {
        newData.push(`Origin: ${originalOwnerRecords[0].origin}`);
      } else {
        newData.push(`Origin: Origin of original owner not found`);
      }

      if (pastFarmRecords[0].originalAcreage) {
        newData.push(`Original Acreage: ${pastFarmRecords[0].originalAcreage}`);
      } else {
        newData.push(`Original Acreage: Original acreage not found`);
      }

      newData.push(`Crops: ${cropList}`);
      newData.push(`Livestock: ${livestockList}`);

      console.log(newData);
      setCurrentData(newData);
    }

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {currentData.map((data, index) => {
        const [label, value] = data.split(': ');
        return (
          <p key={index}>
            <b>{label}:</b> {value}
          </p>
        );
      })}
    </div>
  )
}

function MyTabs() {
  return (
    <Tabs>
      <FarmDetails />
      <PictureList />
      <TabList>
        <Tab>Farm Data</Tab>
        <Tab>Historic Climate Graphs</Tab>
        <Tab>Future Climate Graphs</Tab>
        <Tab>Farm Pictures</Tab>
        <Tab>Back to Map</Tab>
      </TabList>
      <TabPanel>
        <h2 style={{ textAlign: 'center' }}>General Farm Information</h2>
        <FarmData/>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ textAlign: 'center' }}>Current Farm Information</h2>
            <CurrentFarmData />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ textAlign: 'center' }}>Historic Farm Information</h2>
            <PastFarmData />
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <FarmSinglePicture />
        <HistoricClimateGraphs />
      </TabPanel>
      <TabPanel>
        <FarmSinglePicture />
        <FutureClimateGraphs />
      </TabPanel>
      <TabPanel>
        <FarmPicture />
      </TabPanel>
      <TabPanel>
        <BackTab />
      </TabPanel>
    </Tabs>
  );
}

export default function App() {
  return (
    <div>
      <MyTabs />
    </div>
  )
}

const BackTab = () => {
    window.location.href='/'
}

const FarmPicture = () => {
  if (farmPicList.length < 1) {
    return(
      <h1 style={{ textAlign: 'center' }}>This farm has no pictures</h1>
    ); // don't render anything if farmPicList is empty
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {farmPicList.map((url) => (
        <img key={url} src={url} alt="pic" 
        style={{ display: 'block', minWidth: '200px', maxHeight: '400px' }}/>
      ))}
    </div>
  );
}


const FarmSinglePicture = () => {
  if (farmPicList.length < 1) {
    return null; // don't render anything if farmPicList is empty
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <img src={farmPicList[0]} alt="pic" 
          style={{ display: 'block', minWidth: '200px', maxHeight: '400px' }}/>
    </div>
  );
}

   function PictureList() {
    const [records, setRecords] = useState([]);
    
    useEffect(() => {
      async function getFarmPictures() {
        const response = await fetch(`/farmdesc/farmCurrentID/` + farmID);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        if (records[0].pictures.length > 0){
          const pictures = records[0].pictures;
          const picList = pictures.split(";");
          farmPicList = picList;
          console.log(farmPicList);
        }
        else{
          farmPicList = [];
        }
    
        setRecords(records);
      }
    
      getFarmPictures();
    
      return;
    }, [records.length]);
    
    return null;
   }

   async function getCropNames(cropIdList){
    if (cropIdList === ""){
      return "No crops";
    }
      let cropNames = cropIdList.split(';');
   
      for (let i = 0; i < cropNames.length; i++){
        let nameID = cropNames[i];
        const response = await fetch(`/crop/id/` + nameID);
        const records = await response.json();
        cropNames[i] = records[0].name;
      }

      var cropString = cropNames.join(", ");

      return cropString;
   }

   async function getLivestockNames(livestockIdList){
    if (livestockIdList === ""){
      return "No livestock";
    }
    let livestockNames = livestockIdList.split(';');
 
    for (let i = 0; i < livestockNames.length; i++){
      let livestockID = livestockNames[i];
      const response = await fetch(`/livestock/id/` + livestockID);
      const records = await response.json();
      livestockNames[i] = records[0].name;
    }

    var livestockString = livestockNames.join(", ");

    return livestockString;
 }

//  async function GetFutureMaxTemp(id){
//     const response = await fetch(`/fmaxt/id/` + id);
//     const records = await response.json();
//     return records;
//  }

//  async function GetFutureMinTemp(id){
//     const response = await fetch(`/fmint/id/` + id);
//     const records = await response.json();
//     return records;
//  }

//  async function GetFuturePercipitation(id){
//     const response = await fetch(`/fpercipitation/id/` + id);
//     const records = await response.json();
//     return records;
//  }