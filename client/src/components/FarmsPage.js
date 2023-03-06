import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { Tabs } from 'react-simple-tabs-component'
import 'react-simple-tabs-component/dist/index.css'
//import Graphs from "./Graphs";

// Component Example
const CurrDataTab = () => {
  return (
    <>
      <h3>Current Farm Data</h3>
     <p>{FarmDescList()}</p>
     <p>{CurrOwnerList()}</p>
     <p>{CurrFarmList()}</p>
     <p>{LocationList()}</p>
    </>
  )
}

const PastDataTab = () => {
    return (
      <>
        <h3>Historical Farm Data</h3>
        <p>{OriginalOwnerList()}</p>
        <p>{FarmPastList()}</p>
      </>
    )
  }

// const ClimateGraphTab = () => {
//   <View style={styles.graphsCard}>
//     <Text style={styles.cardTitle}>Graphs</Text>
//     <View style={styles.graphsContainer}>
//       <Graphs years={farm.years} precipData={farm.precipData} tminData={farm.tminData} tmaxData={farm.tmaxData}/>
//     </View>
//   </View>
// }

// Tabs structure Array
const tabs = [
  {
    label: 'Current Data', // Tab Title - String
    Component: CurrDataTab // Tab Body - JSX.Element
  },
  {
    label: 'Historical Data',
    Component: PastDataTab
  }
  // {
  //   label: 'Climate Graphs',
  //   Component: ClimateGraphTab
  // }
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
 
function FarmDescList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getFarmDesc() {
     const response = await fetch(`http://localhost:5000/farmdesc/farmPastID/1`);
     //console.log(response);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getFarmDesc();
 
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

function CurrOwnerList() {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getCurrOwner() {
       const response = await fetch(`http://localhost:5000/currentOwner/id/1`);
   
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
   
       const records = await response.json();
       console.log(records);
       setRecords(records);
     }
   
     getCurrOwner()
    
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

   function CurrFarmList() {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getCurrFarm() {
       const response = await fetch(`http://localhost:5000/currentFarm/id/1`);
   
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
     
     //console.log(records.gensOnFarm);
     getCurrFarm()
    
      return;
    }, [records.length]);
   
    function currFarmList() {
       return records.map((record) => {
        console.log(record.cropID);
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

   function LocationList() {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getCurrLocation() {
       const response = await fetch(`http://localhost:5000/location/id/1`);
   
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
   
       const records = await response.json();
       setRecords(records);
     }
   
     getCurrLocation()
    
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

   function OriginalOwnerList() {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getOriginalOwner() {
        const response = await fetch(`http://localhost:5000/originalOwner/id/1`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        setRecords(records);
      }
    
      getOriginalOwner();
    
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

   function FarmPastList() {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getFarmPast() {
        const response = await fetch(`http://localhost:5000/pastFarm/id/1`);
        //console.log(response);
    
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
    
      getFarmPast();
    
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

  //  const styles = StyleSheet.create({
  //   graphsContainer:{
  //     height: 'auto',
  //   },
  //   graphsCard:{
  //     marginTop:10,
  //   }
  // });
