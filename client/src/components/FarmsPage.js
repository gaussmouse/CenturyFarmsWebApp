import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { Tabs } from 'react-simple-tabs-component';
import 'react-simple-tabs-component/dist/index.css';
import { hPrecipitation } from "../historicPrecipitationData";
import { historicMaxTemp } from "../historicMaxTempData";
import { historicMinTemp } from "../historicMinTemp";
import { futureMaxTemp } from "../futureMaxTempData";
import { futureMinTemp } from "../futureMinTempData";
import { futurePrecipitation } from "../futurePrecipitationData";
//import Graphs from "./Graphs";
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryLegend, VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { useParams } from "react-router-dom";

let farmID = "";

const FarmDetails = () => {
  farmID = useParams();
  farmID = farmID.id;
}

// Component Example
const CurrDataTab = () => {
  FarmDetails();
  return (
    <>
      <h3>Current Farm Data</h3>
     <p>{FarmDescList(farmID)}</p>
     <p>{CurrOwnerList(farmID)}</p>
     <p>{CurrFarmList(farmID)}</p>
     <p>{LocationList(farmID)}</p>
    </>
  )
}

const PastDataTab = () => {
  FarmDetails();
    return (
      <>
        <h3>Historical Farm Data</h3>
        <p>{OriginalOwnerList(farmID)}</p>
        <p>{FarmPastList(farmID)}</p>
      </>
    )
  }

 const HistoricClimateGraphTab = () => {
  FarmDetails();
  const labels = ["1920", "1921", "1922", "1923", "1924", "1925", "1926", "1927", "1928", "1929", "1930", "1931", "1932", "1933", "1934", "1935", "1936", "1937", 
  "1938", "1939", "1940", "1941", "1942", "1943", "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", 
  "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973",
  "1974", "1975", "1976", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992",
  "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", 
  "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];
  const celsiusMaxTemps = Object.values(historicMaxTemp[farmID]);
  const fahrenheitMaxTemps = celsiusMaxTemps.map(temp => (temp * 9/5) + 32);

  const celsiusMinTemps = Object.values(historicMinTemp[farmID]);
  const fahrenheitMinTemps = celsiusMinTemps.map(temp => (temp * 9/5) + 32);
  return (
    <div>
      <VictoryChart maxDomain={{ y: 2000, x: 101}} height={150} width={340}>
      <VictoryLabel 
        text="Precipitation Over Time" 
        x={170} 
        y={30} 
        textAnchor="middle"
        padding={0}
        style={{ fontSize: 10 }}
        />
        <VictoryAxis 
          label="Year"
          tickCount={21}
          style={{
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 5}
            }}
          tickValues={labels}
          />
        <VictoryAxis dependentAxis
          label="Precipitation (mm)"
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 5}
            }}
          />
        <VictoryBar width={50} style={{data: {fill: "#66ccff"}}} data={Object.values(hPrecipitation[farmID])} />
      </VictoryChart>
 
      <VictoryChart maxDomain={{ y: 75, x: 101}} minDomain={{ y: 25, x: 0}} height={150} width={340}>
      <VictoryLabel 
        text="Temperature Over Time" 
        x={170} 
        y={30} 
        textAnchor="middle"
        padding={0}
        style={{ fontSize: 10 }}
        />
        <VictoryLine 
          data={fahrenheitMaxTemps}
          style={{data: {stroke: "red", strokeWidth: 0.25}}}
          />
        <VictoryLine 
          data={fahrenheitMinTemps}
          style={{data: {stroke: "blue", strokeWidth: 0.25}}}
          />
         <VictoryLegend x={295} y={50}
            orientation="vertical"
            gutter={10}
            title="Key"
            style={{ 
              border: { stroke: "black" }, 
              title: {fontSize: 4},
              labels: {fontSize: 3 }
              }}
            data={[
              { name: "Average Max \nTemperature", symbol: { fill: "red" } },
              { name: "Average Min \nTemperature", symbol: { fill: "blue" } },
            ]}
            centerTitle
      /> 
        <VictoryAxis 
          label="Year"
          tickCount={21}
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 3}
            }}
          tickValues={labels}
          />
        <VictoryAxis dependentAxis
          label="Temperature (F)"
          tickCount={10}
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 3}
            }}
          />
      </VictoryChart> 

    </div>
  )
}

const FutureClimateGraphTab = () => {
  FarmDetails();
  const futureLabels = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036",
  "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"];
  const celsiusMaxTemps = Object.values(futureMaxTemp[farmID]);
  const fahrenheitMaxTemps = celsiusMaxTemps.map(temp => (temp * 9/5) + 32);

  const celsiusMinTemps = Object.values(futureMinTemp[farmID]);
  const fahrenheitMinTemps = celsiusMinTemps.map(temp => (temp * 9/5) + 32);
  return (
    <div>
      <VictoryChart maxDomain={{ y: 1500, x: 29}} height={150} width={340}>
      <VictoryLabel 
        text="Precipitation Over Time" 
        x={170} 
        y={30} 
        textAnchor="middle"
        padding={0}
        style={{ fontSize: 10 }}
        />
        <VictoryAxis 
          label="Year"
          tickCount={28}
          style={{
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 5}
            }}
          tickValues={futureLabels}
          />
        <VictoryAxis dependentAxis
          label="Precipitation (mm)"
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 5}
            }}
          />
        <VictoryBar width={50} style={{data: {fill: "#66ccff"}}} data={Object.values(futurePrecipitation[farmID])} />
      </VictoryChart>
 
      <VictoryChart maxDomain={{ y: 75, x: 29}} minDomain={{ y: 25, x: 0}} height={150} width={340}>
      <VictoryLabel 
        text="Temperature Over Time" 
        x={170} 
        y={30} 
        textAnchor="middle"
        padding={0}
        style={{ fontSize: 10 }}
        />
        <VictoryLine 
          data={fahrenheitMaxTemps}
          style={{data: {stroke: "red", strokeWidth: 0.25}}}
          />
        <VictoryLine 
          data={fahrenheitMinTemps}
          style={{data: {stroke: "blue", strokeWidth: 0.25}}}
          />
         <VictoryLegend x={295} y={50}
            orientation="vertical"
            gutter={10}
            title="Key"
            style={{ 
              border: { stroke: "black" }, 
              title: {fontSize: 4},
              labels: {fontSize: 3 }
              }}
            data={[
              { name: "Average Max \nTemperature", symbol: { fill: "red" } },
              { name: "Average Min \nTemperature", symbol: { fill: "blue" } },
            ]}
            centerTitle
      /> 
        <VictoryAxis 
          label="Year"
          //tickCount={28}
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 3}
            }}
          tickValues={futureLabels}
          />
        <VictoryAxis dependentAxis
          label="Temperature (F)"
          tickCount={10}
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: {padding: 25, fontSize: 8},
            tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
            ticks: {stroke: "grey", size: 3}
            }}
          />
      </VictoryChart> 

    </div>
  )
}

// Tabs structure Array
const tabs = [
  {
    label: 'Current Data', // Tab Title - String
    Component: CurrDataTab // Tab Body - JSX.Element
  },
  {
    label: 'Historic Data',
    Component: PastDataTab
  },
  {
    label: 'Historic Climate Graphs',
    Component: HistoricClimateGraphTab
  },
  {
    label: 'Future Climate Graphs',
    Component: FutureClimateGraphTab
  }
]

export default function App() {
  return (
    <div className='App'>

      <Tabs tabs={tabs} /* Props */ />
    </div>
  )
}
 
const FarmDesc = (props) => (
    <div>
        <p><b>Farm Name:</b> {props.record.name}</p>
        <p><b>Award Type:</b> {props.record.awardType}</p>
        <p><b>Year of Award:</b> {props.record.yearOfAward}</p>
    </div>
);

const CurrOwner = (props) => (
    <div>
        <p><b>Current Owner Name:</b> {props.record.name}</p>
        <p><b>Relationship to Original Owners:</b> {props.record.relationshipToOriginalOwners}</p>
    </div>
);

const CurrFarm = (props) => (
  <div>
      <p><b>Current Acreage:</b> {props.record.currentAcreage}</p>
      <p><b>Acreage Farmed Today:</b> {props.record.acreageFarmedToday}</p>
      <p><b>Generations on Farm:</b> {props.record.gensOnFarm}</p>
      <p><b>Crops:</b> {props.record.cropID}</p>
      <p><b>Livestock:</b> {props.record.livestockID}</p>
  </div>
);

const Location = (props) => (
    <div>
        <p><b>Address:</b> {props.record.address}</p>
        <p><b>County:</b> {props.record.county}</p>
        <p><b>GPS Location:</b> {props.record.gpsLocation}</p>
        <p><b>Legal Description:</b> {props.record.legalDescription}</p>
    </div>
);

const OriginalOwner = (props) => (
  <div>
      <p><b>Name:</b> {props.record.name}</p>
      <p><b>Origin:</b> {props.record.origin}</p>
      <p><b>Ethnic Origin:</b> {props.record.ethnicOrigin}</p>
  </div>
);

const FarmPast = (props) => (
  <div>
      <p><b>Year of Property Acquisition:</b> {props.record.yearPropertyAcquisition}</p>
      <p><b>Original Acreage:</b> {props.record.originalAcreage}</p>
      <p><b>Crops:</b> {props.record.cropID}</p>
      <p><b>Livestock:</b> {props.record.livestockID}</p>
  </div>
);
 
function FarmDescList(id) {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getFarmDesc(id) {
     const response = await fetch(`http://localhost:5000/farmdesc/farmPastID/` + id);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getFarmDesc(id);
 
   return;
 }, [records.length]);

 
 // This method will map out the records on the table
 function farmDescList() {
   return records.map((record) => {
     return (
       <FarmDesc
         record={record}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
    <p>{farmDescList()}</p>
   </div>
 );
}

function CurrOwnerList(id) {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getCurrOwner(id) {
       const response = await fetch(`http://localhost:5000/currentOwner/id/` + id);
   
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
   
       const records = await response.json();
       setRecords(records);
     }
   
     getCurrOwner(id)
    
      return;
    }, [records.length]);
   
    function currOwnerList() {
       return records.map((record) => {
         return (
           <CurrOwner
             record={record}
             key={record._id}
           />
         );
       });
     }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
       <p>{currOwnerList()}</p>
      </div>
    );
   }

   function CurrFarmList(id) {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getCurrFarm(id) {
       const response = await fetch(`http://localhost:5000/currentFarm/id/` + id);
   
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
   
       const records = await response.json();
       records[0].cropID = await getCropNames(records[0].cropID);
       records[0].livestockID = await getLivestockNames(records[0].livestockID);
       setRecords(records);
     }
     
     getCurrFarm(id)
    
      return;
    }, [records.length]);
   
    function currFarmList() {
       return records.map((record) => {
         return (
           <CurrFarm
             record={record}
             key={record._id}
           />
         );
       });
     }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
       <p>{currFarmList()}</p>
      </div>
    );
   }   

   function LocationList(id) {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getCurrLocation(id) {
       const response = await fetch(`http://localhost:5000/location/id/` + id);
   
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
   
       const records = await response.json();
       setRecords(records);
     }
   
     getCurrLocation(id)
    
      return;
    }, [records.length]);
   
    function locationList() {
       return records.map((record) => {
         return (
           <Location
             record={record}
             key={record._id}
           />
         );
       });
     }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
       <p>{locationList()}</p>
      </div>
    );
   }

   function OriginalOwnerList(id) {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getOriginalOwner(id) {
        const response = await fetch(`http://localhost:5000/originalOwner/id/` + id);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        setRecords(records);
      }
    
      getOriginalOwner(id);
    
      return;
    }, [records.length]);
   
    
    // This method will map out the records on the table
    function originalOwnerList() {
      return records.map((record) => {
        return (
          <OriginalOwner
            record={record}
            key={record._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
       <p>{originalOwnerList()}</p>
      </div>
    );
   }

   function FarmPastList(id) {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getFarmPast(id) {
        const response = await fetch(`http://localhost:5000/pastFarm/id/` + id);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        records[0].cropID = await getCropNames(records[0].cropID);
        records[0].livestockID = await getLivestockNames(records[0].livestockID);
        setRecords(records);
      }
    
      getFarmPast(id);
    
      return;
    }, [records.length]);
   
    
    // This method will map out the records on the table
    function farmPastList() {
      return records.map((record) => {
        return (
          <FarmPast
            record={record}
            key={record._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
       <p>{farmPastList()}</p>
      </div>
    );
   }

   async function getCropNames(cropIdList){
    if (cropIdList === ""){
      return "No crops";
    }
      let cropNames = cropIdList.split(';');
   
      for (let i = 0; i < cropNames.length; i++){
        let nameID = cropNames[i];
        const response = await fetch(`http://localhost:5000/crop/id/` + nameID);
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
      const response = await fetch(`http://localhost:5000/livestock/id/` + livestockID);
      const records = await response.json();
      livestockNames[i] = records[0].name;
    }

    var livestockString = livestockNames.join(", ");

    return livestockString;
 }