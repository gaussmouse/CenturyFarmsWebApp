import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./FarmsPageNav";
import FarmSinglePicture from "./SinglePicture";

// Stylesheets
import "../stylesheets/farm-data.css";

const FarmDetails = () => {
  const { id } = useParams();
  return id;
};

function FarmSynopsis() {
  const farmID = FarmDetails();
  const [currentData, setCurrentData] = useState("");
  const [showFull, setShowFull] = useState(false);
  const limit = 700;

  useEffect(() => {
    async function fetchData() {
      const farmDescResponse = await fetch(
        `https://century-farms.herokuapp.com/farmdesc/farmPastID/` + farmID
      );

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
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "30px auto",
      maxWidth: "700px",
      padding: "0 20px",
      textAlign: "left",
    };

    const buttonStyle = {
      marginTop: "10px",
    };

    if (currentData.length > limit) {
      return (
        <div style={containerStyle}>
          {showFull ? currentData : `${currentData.substring(0, limit)}...`}
          <button style={buttonStyle} onClick={toggleShowFull}>
            {showFull ? "Read less" : "Read more"}
          </button>
        </div>
      );
    } else {
      return <div style={containerStyle}>{currentData}</div>;
    }
  };

  return renderData();
}

function FarmGeneralData() {
  const farmID = FarmDetails();
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const farmDescResponse = await fetch(
        `https://century-farms.herokuapp.com/farmdesc/farmPastID/` + farmID
      );
      const locationResponse = await fetch(
        `https://century-farms.herokuapp.com/location/id/` + farmID
      );
      const pastFarmResponse = await fetch(
        `https://century-farms.herokuapp.com/pastFarm/id/` + farmID
      );

      const farmDescRecords = await farmDescResponse.json();
      const locationRecords = await locationResponse.json();
      const pastFarmRecords = await pastFarmResponse.json();

      const newData = [];

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
    <div className="outer-container">
      <FarmSinglePicture />

      <div className="data-container">
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
  let farmID = FarmDetails();
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const currFarmResponse = await fetch(
        `https://century-farms.herokuapp.com/currentFarm/id/` + farmID
      );
      const currOwnerResponse = await fetch(
        `https://century-farms.herokuapp.com/currentOwner/id/` + farmID
      );
      const pastFarmResponse = await fetch(
        `https://century-farms.herokuapp.com/pastFarm/id/` + farmID
      );
      const originalOwnerResponse = await fetch(
        `https://century-farms.herokuapp.com/originalOwner/id/` + farmID
      );

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

      newData.push({
        label: "Owner",
        currentValue: owner,
        pastValue: pastOwner,
        label2: "Relationship to Original Owners:",
        relationship: relationship,
        label3: "Origin:",
        origin: origin,
      });

      newData.push({
        label: "Acreage",
        currentValue: currentAcreage,
        pastValue: originalAcreage,
      });

      newData.push({
        label: "Crops",
        currentValue: currentCropList,
        pastValue: pastCropList,
      });
      newData.push({
        label: "Livestock",
        currentValue: currentLivestockList,
        pastValue: pastLivestockList,
      });

      setCurrentData(newData);
    }

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <table style={{ border: "1px solid black", margin: "0 auto" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            ></th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Current
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Original
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((data, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <b>{data.label}</b>
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {data.currentValue} <br /> <b>{data.label2}</b>{" "}
                  {data.relationship}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {data.pastValue} <br /> <b>{data.label3}</b> {data.origin}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

async function getCropNames(cropIdList) {
  if (cropIdList === "") {
    return "No crops";
  }
  let cropNames = cropIdList.split(";");

  for (let i = 0; i < cropNames.length; i++) {
    let nameID = cropNames[i];
    const response = await fetch(
      `/crop/id/` + nameID
    );
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
    const response = await fetch(
      `/livestock/id/` + livestockID
    );
    const records = await response.json();
    livestockNames[i] = records[0].name;
  }

  var livestockString = livestockNames.join(", ");

  return livestockString;
}

export default function FarmData() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "80px" }}>
        <h2 style={{ textAlign: "center" }}>General Farm Information</h2>
        <FarmGeneralData />
        <FarmSynopsis />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ textAlign: "center" }}>
              Current and Past Farm Information
            </h2>
            <CurrentPastFarmData />
          </div>
        </div>
      </div>
    </div>
  );
}
