import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

// Stylesheets
import "../stylesheets/popup.css"

export default function PopupAbout(props) {
  const {isAboutOpen, setIsAboutOpen} = props;

  function closeModal() {
    setIsAboutOpen(false);
  }

  return (
    <Modal
      open={isAboutOpen}
      onClose={closeModal}
      id="about-modal"
      aria-labelledby="about-modal-title"
      aria-describedby="about-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '50em',
        maxHeight: 'calc(100vh - 10em)',
        p: 3,
        bgcolor: 'background.paper',
        outline: 'none',
        overflow: 'auto',
      }}>
        <Typography id="about-modal-title" variant="h2" component="h2">
          About
        </Typography>
        <Typography id="about-modal-description" variant="body1" component="p" paragraph="true">
          This web application offers users an exploration of century farms in Oregon's Willamette 
          Valley in terms of cultivation types and climate. You can click on the farm location and 
          access information on the year it was created and the crops and animals it used to grow, 
          as well as the current crops and animals. The application also provides the ability to 
          view a time series of major climate variables like mean annual temperature and annual 
          precipitation for past and future climate. This allows you to see how projected changes 
          in climate compare to past experiences of the farms. The century farmers highlighted in 
          yellow participated in interviews for a thesis project examining how century farmers within 
          the Willamette Valley have thrived or survived. This study aimed to identify the primary 
          motivating factors in farmer decision-making and explore the potential impacts of climate 
          change on farming practices. 
        </Typography>
        <Typography id="about-modal-source-title" variant="h3" component="h3">
          Data Sources
        </Typography>
        <Typography id="about-modal-sources" variant="body1" component="p" paragraph={true}>
            The app sources its data from the Oregon Century Farm and Ranch Program’s database and Tongli Wang's climate data website, ClimateNA.
        </Typography>
        <Typography id="about-modal-links" variant="body1" component="p" paragraph={true}>
            Oregon Century Farm and Ranch Program: <a href="https://centuryfarm.oregonfb.org/">Website</a>
            , <a href="https://ocfrp.library.oregonstate.edu/public/farms">Database</a>
            <br/>
            ClimateNA: <a href="https://climatena.ca/">About</a>, <a href="https://climatena.ca/mapVersion">Web App</a>
        </Typography>
        <Button onClick={closeModal} variant="contained">Close</Button>
      </Box>
    </Modal>
  );
}