import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';


// Stylesheets
import "../stylesheets/header.css"

export default function Header(props) {
  //const {toggleLocationSidebar} = useState(props);
  const [showNav, setShowNav] = useState(false);

    /*
  * Sets styles of sidebar, map, and open/close buttons when
  *   called inside onClick from the open/close buttons
  */
    function toggleLocationSidebar() {
        var sidebar = document.getElementById('locationSidebar');
        var map = document.getElementById('main');
        var openButton = document.getElementById('openLocationSidebar');
        var closeButton = document.getElementById('closeLocationSidebar');
      
        // Toggle sidebar visibility
        if (sidebar.style.left === '-400px' || sidebar.style.left === '') {
          sidebar.style.left = '0';
          map.style.marginLeft = '400px';
          openButton.style.display = 'none';
          closeButton.style.display = 'block';
        } else {
          sidebar.style.left = '-400px';
          map.style.marginLeft = '0';
          openButton.style.display = 'block';
          closeButton.style.display = 'none';
        }
      }

  return (
    <>
      <MDBNavbar fixed='top' expand='lg' dark style={{ backgroundColor: '#23374b' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Century Farms App</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
          <MDBNavbarLink active aria-current='page' href='#'>
              Home
            </MDBNavbarLink>
            <MDBNavbarLink href='#'>About</MDBNavbarLink>
            <MDBNavbarLink href='#'>How To Use</MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}