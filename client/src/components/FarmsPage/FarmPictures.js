import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./FarmsPageNav";

var farmPicList = [];

const FarmDetails = () => {
    const { id } = useParams();
    return id;
  };

  const FarmPictures = () => {
    PictureList();
    if (farmPicList.length < 1) {
      return (
      <div>
        <NavBar />
        <h1 style={{ textAlign: "center", paddingTop: '70px' }}>This farm has no pictures</h1>
      </div>
      )
    }
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "60px", // Add margin top to create space for the navbar
        }}
      >
        <NavBar />
        {farmPicList.map((url) => (
          <img
            key={url}
            src={url}
            alt="pic"
            style={{ display: "block", minWidth: "500px", maxHeight: "800px" }}
          />
        ))}
      </div>
    );
  };

  function PictureList() {
    let farmID = FarmDetails();
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

export default FarmPictures;