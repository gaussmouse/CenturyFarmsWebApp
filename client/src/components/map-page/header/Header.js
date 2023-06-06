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
import "../../stylesheets/header.css"

export default function Header(props) {
  //const {toggleLocationSidebar} = useState(props);
  const [showNav, setShowNav] = useState(false);
  const {
    isTutorialOpen, 
    setIsTutorialOpen, 
    isAboutOpen, 
    setIsAboutOpen
  } = props;

  function openTutorialModal() {
      setIsTutorialOpen(true);
  }

  function openAboutModal() {
    setIsAboutOpen(true);
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
            <MDBNavbarLink href='#' onClick={() => openAboutModal()}>About</MDBNavbarLink>
            <MDBNavbarLink href='#' onClick={() => openTutorialModal()}>How To Use</MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}