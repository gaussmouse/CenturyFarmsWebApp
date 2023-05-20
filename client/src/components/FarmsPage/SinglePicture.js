import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

let farmPicList = [];

const FarmDetails = () => {
    const { id } = useParams();
    return id;
  };

const FarmSinglePicture = () => {
    PictureList();
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
    let farmID = FarmDetails();
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

export default FarmSinglePicture;