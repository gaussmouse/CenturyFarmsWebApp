# Century Farms Web App

The Century Farms Web App is a web-based application that allows users to explore and learn about century farms in the Willamette Valley of Oregon. Century farms are farms that have been owned and operated by the same family for 100 years or more, representing a significant part of agricultural history and heritage. This project was a Senior Capstone project for Oregon State University and was built by two undergraduate Computer Science students in cooperation with a graduate student and her mentor.

## Features

- **Farm Search:** Users can search for century farms in Oregon's Willamette Valley by entering a name.
- **Farm Filter:** Users can filter listed century farms by their current crops and livestock.
- **Farm Details:** Users can view detailed information about each century farm, including its history, family stories, and any historical images.
- **Interactive Map:** The app provides an interactive map that displays the locations of century farms, allowing users to visualize their distribution in the region.
- **Climate Data:** Users can view precipitation and temperature time-series graphs for any farm to learn about their long-term climate experience.

## Live Demo

Visit the webpage for a live demonstration: https://century-farms.netlify.app/

## Installation

To set up the Century Farms Web App locally, follow these steps:

1. Clone the repository:
    `git clone https://github.com/gaussmauss/CenturyFarmsWebApp.git`
2. Navigate to the project directory:
    `cd CenturyFarmsWebApp`
3. Install the dependencies:
    `cd client && npm install`
    `cd server && npm install`
4. Create a Mapbox token:
    - Visit the [Mapbox website](https://www.mapbox.com/) and sign up for an account.
    - Once signed in, navigate to the [Account Dashboard](https://account.mapbox.com/).
    - Create a new access token and make sure it has the necessary permissions for using Mapbox GL JS.
    - Copy the access token.
    - Add token at the top of FarmsMap.js file, or store more securely via environmental variable.
5. Start the development server:
    `cd server && node server.js`
    `cd client && npm start`
6. Open your web browser and visit http://localhost:3000 to access the app.

## Technologies Used

The Century Farms Web App is built using the following technologies:

- **Frontend:** React, Mapbox GL JS, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## License

The Century Farms Web App is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions, suggestions, or feedback, please contact the project maintainer at anderels@oregonstate(dot)edu.



