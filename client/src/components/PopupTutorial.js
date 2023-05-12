import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

export default function PopupTutorial(props) {
  const {isModalOpen, setIsModalOpen} = props;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Tutorial"
      id="tutorial-modal"
    >
      <h2>How to Use This Website</h2>
      <p>Welcome to our website! Here are some instructions on how to use it:</p>
      <ol>
        <li>Search for farms by entering a keyword in the search bar.</li>
        <li>Use the Crop and Livestock filters to narrow down your search results.</li>
        <li>Click on a farm listing to view more details about the farm.</li>
        <li>Click on a farm marker on the map to view a popup with basic information about the farm.</li>
      </ol>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}
