require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let movieDB = new Omdb(keys.omdb);
let command = process.argv[2];
let input = process.argv[3];

//---------------------------------------------------

switch (command) {
	case "my-tweets":
	  myTweets();
	  break;
	case "spotify-this-song":
	  spotifyThisSong();
	  break;
	case "movie-this":
	  movieThis();
	  break;
	case "do-what-it-says":
	  doWhatItSays();
	  break
	default:
	  console.log("Invalid Request");
}

//---------------------------------------------------

const myTweets = () => {
	console.log(client
		// Show my last 20 tweets and when they were created
		)
}
const spotifyThisSong = () => {
	console.log(
		// Display Artist(s), Song Name, Album, and Spotify Preview Link
		// If no song input, default to The Sign by Ace of Base
		)
}
const movieThis = () => {
	console.log(
		// Display title, release year, IMDB rating, Rotten Tomatoes rating, Country of production, Language, Plot, Actors in the movie
		// If no movie input, default to 'Mr. Nobody'.
		)
}
const doWhatItSays = () => {
	console.log(
		// use fs.readfile to use random.txt to call a command
		)
}