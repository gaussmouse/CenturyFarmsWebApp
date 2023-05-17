import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-simple-tabs-component/dist/index.css";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import HistoricClimateGraphs from "./HistoricClimateGraphs";
import FutureClimateGraphs from "./FutureClimateGraphs";

let farmID = "";
var farmPicList = [];

const FarmDetails = () => {
  farmID = useParams();
  farmID = farmID.id;
};

function FarmSynposis() {
  const [currentData, setCurrentData] = useState("");
  const [showFull, setShowFull] = useState(false);
  const limit = 700;

  useEffect(() => {
    async function fetchData() {
      const farmDescResponse = await fetch(`https://century-farms.herokuapp.com/farmdesc/farmPastID/` + farmID);

      const farmDescRecords = await farmDescResponse.json();

      let synposis = farmDescRecords[0].synposis;

      setCurrentData(synposis);
    }

    fetchData();
  }, []);

  const toggleShowFull = () => {
    setShowFull(!showFull);
  };

  const renderData = () => {
    if (currentData.length > limit) {
      return (
        <div style={{ textAlign: "left", marginLeft: "350px", marginRight: "350px", marginBottom: "30px", marginTop: "30px" }}>
          {showFull ? currentData : `${currentData.substring(0, limit)}...`}
          <button onClick={toggleShowFull}>{showFull ? "Read less" : "Read more"}</button>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "left", marginLeft: "350px", marginRight: "350px", marginBottom: "30px", marginTop: "30px" }}>
          {currentData}
        </div>
      );
    }
  };

  return renderData();
}

function FarmData() {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const farmDescResponse = await fetch(`https://century-farms.herokuapp.com/farmdesc/farmPastID/` + farmID);
      const locationResponse = await fetch(`https://century-farms.herokuapp.com/location/id/` + farmID);
      const pastFarmResponse = await fetch(`https://century-farms.herokuapp.com/pastFarm/id/` + farmID);

      const farmDescRecords = await farmDescResponse.json();
      const locationRecords = await locationResponse.json();
      const pastFarmRecords = await pastFarmResponse.json();

      const newData = [];

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
        newData.push(
          `Year of Property Acquisition: ${pastFarmRecords[0].yearPropertyAcquisition}`
        );
      } else {
        newData.push(
          `Year of Property Acquisition: Year of property acquisition not found`
        );
      }

      setCurrentData(newData);
    }

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FarmSinglePicture />
      <div style={{ textAlign: "left", paddingLeft: "20px" }}>
        {currentData.map((data, index) => {
          const [label, value] = data.split(": ");
          return (
            <p key={index}>
              <b>{label}:</b> {value}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function CurrentPastFarmData() {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const currFarmResponse = await fetch(`https://century-farms.herokuapp.com/currentFarm/id/` + farmID);
      const currOwnerResponse = await fetch(`https://century-farms.herokuapp.com/currentOwner/id/` + farmID);
      const pastFarmResponse = await fetch(`https://century-farms.herokuapp.com/pastFarm/id/` + farmID);
      const originalOwnerResponse = await fetch(`https://century-farms.herokuapp.com/originalOwner/id/` + farmID);

      const currentOwnerRecords = await currOwnerResponse.json();
      const currentFarmRecords = await currFarmResponse.json();
      const originalOwnerRecords = await originalOwnerResponse.json();
      const pastFarmRecords = await pastFarmResponse.json();

      const newData = [];

      const currentCropList = await getCropNames(currentFarmRecords[0].cropID);
      const currentLivestockList = await getLivestockNames(
        currentFarmRecords[0].livestockID
      );

      const pastCropList = await getCropNames(pastFarmRecords[0].cropID);
      const pastLivestockList = await getLivestockNames(
        pastFarmRecords[0].livestockID
      );
      
      let owner = "Current owner not found";
      let pastOwner = "Original owner not found";
      let relationship = "Relationship not found";
      let origin = "Origin not found";
      let originalAcreage = "Original acreage not found";
      let currentAcreage = "Current acreage not found";
      
      if (currentOwnerRecords[0].name) {
        owner = currentOwnerRecords[0].name;
      }
      if (originalOwnerRecords[0].name) {
        pastOwner = originalOwnerRecords[0].name;
      }
      if (currentOwnerRecords[0].relationshipToOriginalOwners) {
        relationship = currentOwnerRecords[0].relationshipToOriginalOwners;
      }
      if (originalOwnerRecords[0].origin) {
        origin = originalOwnerRecords[0].origin;
      }
      if (currentOwnerRecords[0].currentAcreage) {
        currentAcreage = currentOwnerRecords[0].currentAcreage;
      }
      if (pastFarmRecords[0].originalAcreage) {
        originalAcreage = pastFarmRecords[0].originalAcreage;
      }
      
      newData.push({label: "Owner", currentValue: owner, pastValue: pastOwner,
                    label2: "Relationship to Original Owners:", relationship: relationship, 
                    label3: "Origin:", origin: origin,
      });

      newData.push({ label: "Acreage", currentValue: currentAcreage, pastValue: originalAcreage });

      newData.push({ label: "Crops", currentValue: currentCropList, pastValue: pastCropList });
      newData.push({ label: "Livestock", currentValue: currentLivestockList, pastValue: pastLivestockList });

      setCurrentData(newData);
    }

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <table style={{ border: "1px solid black", margin: "0 auto"}}>
        <thead>
          <tr>
          <th style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}></th>
          <th style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>Current</th>
          <th style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>Original</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((data, index) => {
            return (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}><b>{data.label}</b></td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>{data.currentValue} <br /> <b>{data.label2}</b> {data.relationship}</td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>{data.pastValue} <br /> <b>{data.label3}</b> {data.origin}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
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
        <h2 style={{ textAlign: "center" }}>General Farm Information</h2>
        <FarmData />
        <FarmSynposis />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ textAlign: "center" }}>Current and Past Farm Information</h2>
            <CurrentPastFarmData />
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
  );
}

const BackTab = () => {
  window.location.href = "/";
};

const FarmPicture = () => {
  if (farmPicList.length < 1) {
    return <h1 style={{ textAlign: "center" }}>This farm has no pictures</h1>; // don't render anything if farmPicList is empty
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {farmPicList.map((url) => (
        <img
          key={url}
          src={url}
          alt="pic"
          style={{ display: "block", minWidth: "200px", maxHeight: "400px" }}
        />
      ))}
    </div>
  );
};

const FarmSinglePicture = () => {
  if (farmPicList.length < 1) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="https://lh3.googleusercontent.com/pw/AJFCJaVfD7cohOKrZFEQNQIf-wCtqvtmjB-zIFycNX2xcbXScwF5PiiGgxCE_84s9Diz9-IhbjqEUfkTxDpIFrAVyxnTiuiTsH2r256joAi45LuYKcdTTt0Q20TtpFh9EkUVQX2YLFuE8E1XPje7mCFBr1QF1STMaXgyd1paxTjTHFcf3gQ4a-bn8ZldcL-LHXefaOo6Fumz8134wNSQwZPBm58p8LNFPjO055FuL0SGaeCP0_ptRbEzdkq4rKho1a0yufG5FNvUyoomIh8zjsy3I-GwiRpdP0VAaU7nzKsV3SIAJq0vahQdwP-YOKwcR8RZw-GBV6JcpTRKBImLUyc0jlfN1ieQJ6Y8bfGyBNgs82mtV5nFxdmT9nI0P4yL8tsQ0J5c55Yo6pabTS3iyVdxlFfz63I-TH2S8NpljX0RoWtjaLXSezxULMHlAhXCOeFP6NjAlYPh9JWVgMjdp5G0bAA-GLhq7pUchMgX-gIHPvacJqOUOp-jmkxsLS2VMnmb4WG8TQWX3pi398SSZaTWZtPuwVqFE7waQewILixXNCjB5hB1s9rR7X8suUD3A313gtFyVk1CoxneJjWroLslDk3x0jTOeH1BVWq79-mGEGmxim4pSMlIa_pYzzT-Sl07TCZFw6dQosvWVXpY-BKyH8t9TlMK6g4z9DtzW2c88J7Ex0weTjsyD7ClGXelMQR8KNw3WFKYc1Gz1HYeManPksj_Bbfn1Xv2-AaJ3u3EjD3O9ZfedXNwa72G0rS35MCd1qndBeyb9B1ZYEKkDtTwHDqH2e0ASFl5X2QuDLmuGIHoiQ_2uMcT6IaZ6j18o2cyCQB4vtwCaxt1qNsaGOQAMkrOMeVFUecMLjD9P6Nl8gZnddtwg9XsvjedG7Kueyyo8cOLiNwD9issxs4dZ_pTwMRq8DGqcMop1ZPHjmxiOPSkK4ucayv3=w400-h400-s-no?authuser=0"
          alt="pic"
          style={{ display: "block", minWidth: "250px", maxHeight: "250px" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={farmPicList[0]}
        alt="pic"
        style={{ display: "block", minWidth: "400px", maxHeight: "400px" }}
      />
    </div>
  );
};

function PictureList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getFarmPictures() {
      const response = await fetch(`https://century-farms.herokuapp.com/farmdesc/farmCurrentID/` + farmID);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      if (records[0].pictures.length > 0) {
        const pictures = records[0].pictures;
        const picList = pictures.split(";");
        farmPicList = picList;
        console.log(farmPicList);
      } else {
        farmPicList = [];
      }

      setRecords(records);
    }

    getFarmPictures();

    return;
  }, [records.length]);

  return null;
}

async function getCropNames(cropIdList) {
  if (cropIdList === "") {
    return "No crops";
  }
  let cropNames = cropIdList.split(";");

  for (let i = 0; i < cropNames.length; i++) {
    let nameID = cropNames[i];
    const response = await fetch(`https://century-farms.herokuapp.com/crop/id/` + nameID);
    const records = await response.json();
    cropNames[i] = records[0].name;
  }

  var cropString = cropNames.join(", ");

  return cropString;
}

async function getLivestockNames(livestockIdList) {
  if (livestockIdList === "") {
    return "No livestock";
  }
  let livestockNames = livestockIdList.split(";");

  for (let i = 0; i < livestockNames.length; i++) {
    let livestockID = livestockNames[i];
    const response = await fetch(`https://century-farms.herokuapp.com/livestock/id/` + livestockID);
    const records = await response.json();
    livestockNames[i] = records[0].name;
  }

  var livestockString = livestockNames.join(", ");

  return livestockString;
}