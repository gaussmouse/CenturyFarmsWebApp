import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

let farmPicList = [];

const FarmDetails = () => {
  const { id } = useParams();
  return id;
};

const FarmSinglePicture = () => {
  PictureList();
  if (farmPicList.length > 0) {
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
        src="https://lh3.googleusercontent.com/pw/AJFCJaW4fYa4lHzGwtjnROxbeB1GiaWM1AU5DE_y_tozz2pWda94aW61PG0vqGcd84xJz67OsOPUQa9A6gAJGW8mWRIRvyBVG2DGFt0QiDX1_HYMTfSAm3L930xQclWSF84Ke6xAa6G0k0jteRaLlcpZEY8=w400-h400-s-no?authuser=0"
        alt="pic"
        style={{ display: "block", minWidth: "250px", maxHeight: "250px" }}
      />
    </div>
  );
};

function PictureList() {
  let farmID = FarmDetails();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getFarmPictures() {
      const response = await fetch(
        `/farmdesc/farmCurrentID/` + farmID
      );

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

export default FarmSinglePicture;
