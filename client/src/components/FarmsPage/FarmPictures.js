import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./FarmsPageNav";
import "../stylesheets/farm-data.css";

const FarmDetails = () => {
  const { id } = useParams();
  return id;
};

const FarmPictures = () => {
  const farmID = FarmDetails();
  const [farmPicList, setFarmPicList] = useState([]);

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
        setFarmPicList(picList);
      } else {
        setFarmPicList([]);
      }
    }

    getFarmPictures();
  }, [farmID]);

  if (farmPicList.length > 0) {
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
            className="mobile" // Add the "desktop" class to the img element
            style={{
              display: "block",
              width: "100%", // Set width to 100% for both mobile and desktop
              height: "auto", // Allow the height to adjust proportionally
              maxWidth: "500px", // Set the maximum width for desktop
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: "center", paddingTop: "70px" }}>
        This farm has no pictures
      </h1>
    </div>
  );
};

export default FarmPictures;
