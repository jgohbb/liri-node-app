# liri-node-app
This is a Language Interpretation and Recognition Interface (LIRI) app similar to the Speech Interpretation and Recognition Interface (SIRI) used in iPhones. While SIRI uses speech, LIRI utilizes command line node that takes in parameters and gives back data. This particular app searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## Overview
This app uses the command line ib the CLI to generate a response from the functions in the application. To retrieve the data that will power this app, users will require:
(1) node.js
(2) node modules for relevant npm - axios, moment
(3) Spotify API client id and client secret

## Instructions
User will require to input the command for the selected options in the terminal:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
Example:
![concert](images/concert-this.png)




## Further improvements in the pipeline
-[] Incorporate inquirer to make selection for options.
-[] Introduce other api (cinemas) to expand scope of the app.
