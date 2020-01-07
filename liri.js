require("dotenv").config();

// Global variables - packages, spotify keys
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");
var combineArgument = process.argv;
var request = process.argv[2];
var searchInfo = "";

// user input calling on selected functions
for (var i = 3; i < combineArgument.length; i++) {
    if (i > 3 && i < combineArgument.length) {
      searchInfo = searchInfo + "+" + combineArgument[i];
    } else {
      searchInfo += combineArgument[i];
    }
}

if (request === "concert-this") {
    concertInfo();
} else if (request === "spotify-this-song") {
    spotifyInfo();
} else if (request === "movie-this") {
    movieInfo();
} else if (request === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }

        var dataArr =  data.split(",");
        request = dataArr[0];
        searchInfo = dataArr[1];
        
        if (request === "concert-this") {
            ConcertInfo();
        } else if (request === "spotify-this-song") {
            spotifyInfo();
        } else if (request === "movie-this") {
            movieInfo();
        }
    });

} else {
    console.log("No command for search added. Please include 'concert-this', 'movie-this', 'spotify-this-song' or 'do-what-it-says'.");
}

// --------------------------------FUNCTIONS---------------------------------
// Concert search function: (1) no response or undefined band = alert info; (2) defined band = info on venue, location and date
function concertInfo() {
    axios
    .get("https://rest.bandsintown.com/artists/" + searchInfo + "/events?app_id=codingbootcamp")
    .then (function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log("---------------------------------------")
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
            console.log("Event Date: " + moment(response.data[i].datetime).format("dddd, MMMM Do YYYY"));
        }
    })
    .catch(function(error) {
        console.log("---------------------------------------");
        console.log("Nothing found for this request, please try another artist or band.");
    });
}

// Spotify song search function: (1) no response = recommenf 'Ace of Base'; (2) undefined song = alert error info; (3)defined song = all required info
function spotifyInfo() {
    if (searchInfo === "") {
        spotify
        .search({ type: 'track', query: "The Sign Ace of Base" })
        .then(function(response) {
            console.log("Seems like you did not select a song, so here's a great song you might like.");
            console.log("---------------------------------------");
            console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Album Title: " + response.tracks.items[0].album.name);
            console.log("Preview Link: " + response.tracks.items[0].preview_url);
        })
        .catch(function(error) {
            console.log(error);
        });
    } else {
        spotify
        .search({ type: 'track', query: searchInfo })
        .then(function(response) {
            for (var i = 0; i < response.tracks.items.length; i++ ) {
                console.log("---------------------------------------");
                console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Album Title: " + response.tracks.items[i].album.name);
                console.log("Preview Link: " + response.tracks.items[i].preview_url);
            }
        })
        .catch(function(error) {
            console.log("No results found. Try another song");
        });
    }
}

// Movie search function: (1)no response = suggest Mr Nobody; (2)undefined movie = alert error; (3)movie = all relevant info 
function movieInfo() {
    if (searchInfo === "") {
        console.log("If you haven't watched Mr. Nobody then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
        axios
        .get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            var movie = response.data;
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);
        })
        .catch(function(error) {
            console.log(error);
        });
    } else {
        axios
        .get("http://www.omdbapi.com/?t=" + searchInfo + "&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            var movie = response.data;
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);

            var timeStamp = moment().format();
            fs.appendFile("log.txt", "Movie logged stamp: " + timeStamp + " \n" + movie.Title + "\n" + movie.Year +
            " \n" + movie.Ratings[1].Source + " " + movie.Ratings[1].Value +
            " \n" + movie.Country + " \n" + movie.Language +
            " \n" + movie.Plot + " \n" + movie.Actors + " \n---------------------\n" + " \n", function (error) {
                if (error) {
                    console.log(error);
                }
            })
        })
        .catch(function(error) {
            // console.log("---------------------------------------");
            // console.log("No results found. Please try again.");
            console.log(error);
        });
    }
    
}