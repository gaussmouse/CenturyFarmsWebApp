import React, { useState } from 'react';
//import Modal from 'react-modal';
import { Modal, Box, Typography, Button } from '@mui/material';


export default function PopupTutorial(props) {
  const {isModalOpen, setIsModalOpen} = props;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      id="tutorial-modal"
      aria-labelledby="tutorial-modal-title"
      aria-describedby="tutorial-modal-description"
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
        <Typography id="tutorial-modal-title" variant="h2" component="h2">
          How to Use This Website
        </Typography>
        <Typography id="tutorial-modal-description" variant="body1" component="p">
          Welcome to our website! Here are some instructions on how to use it:
        </Typography>
        <ol>
          <li>Search for farms by entering a keyword in the search bar.</li>
          <li>Use the Crop and Livestock filters to narrow down your search results.</li>
          <li>Click on a farm listing to view more details about the farm.</li>
          <li>Click on a farm marker on the map to view a popup with basic information about the farm.</li>
        </ol>
        <Button onClick={closeModal} variant="contained">Close</Button>
      </Box>
    </Modal>
  );
}
