import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";

const FarmDetails = () => {
  const { id } = useParams();
  return id;
};

function FarmData() {
  let farmID = FarmDetails();
  console.log(farmID);
  const [currentData, setCurrentData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const farmDescResponse = await fetch(`/farmdesc/farmPastID/` + farmID);
      const farmDescRecords = await farmDescResponse.json();
      const farmName = farmDescRecords[0].name;
      setCurrentData(farmName);
    }

    fetchData();
  }, [farmID]);

  return <>{currentData.toString()}</>;
}

function MyTabs(props) {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const hostname = window.location.hostname;
  const currentPage = window.location.href;
  const port = window.location.port;
  let farmID = FarmDetails();
  let url = "";
  let homePage = "";
  if (port !== "") {
    url = "http://" + hostname + ":" + port + "/farms/" + farmID;
    homePage = "http://" + hostname + ":" + port;
  } else {
    url = "https://" + hostname + "/farms/" + farmID;
    homePage = "https://" + hostname;
  }
  console.log(pathname);
  console.log(url);
  console.log(currentPage);

  /*
   * Sets styles of sidebar, map, and open/close buttons when
   * called inside onClick from the open/close buttons
   */
  function toggleLocationSidebar() {
    var sidebar = document.getElementById("locationSidebar");
    var map = document.getElementById("main");
    var openButton = document.getElementById("openLocationSidebar");
    var closeButton = document.getElementById("closeLocationSidebar");

    // Toggle sidebar visibility
    if (sidebar.style.left === "-400px" || sidebar.style.left === "") {
      sidebar.style.left = "0";
      map.style.marginLeft = "400px";
      openButton.style.display = "none";
      closeButton.style.display = "block";
    } else {
      sidebar.style.left = "-400px";
      map.style.marginLeft = "0";
      openButton.style.display = "block";
      closeButton.style.display = "none";
    }
  }

  return (
    <>
      <MDBNavbar
        fixed="top"
        expand="lg"
        dark
        style={{ backgroundColor: "#23374b" }}
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <FarmData farmID={props.farmID} />
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav>
              <MDBNavbarLink
                active={currentPage === url}
                aria-current="page"
                href={url}
              >
                Farm Data
              </MDBNavbarLink>
              <MDBNavbarLink
                active={currentPage === `${url}/historicgraph`}
                href={`${url}/historicgraph`}
              >
                Historic Climate Graphs
              </MDBNavbarLink>
              <MDBNavbarLink
                active={currentPage === `${url}/futuregraph`}
                href={`${url}/futuregraph`}
              >
                Future Climate Graphs
              </MDBNavbarLink>
              <MDBNavbarLink
                active={currentPage === `${url}/pictures`}
                href={`${url}/pictures`}
              >
                Farm Pictures
              </MDBNavbarLink>
              <MDBNavbarLink href={`${homePage}`}>Back to Map</MDBNavbarLink>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default MyTabs;
