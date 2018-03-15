require("dotenv").config();
const request = require("request");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const fs = require("fs");
const inquirer = require('inquirer');
const args = process.argv;
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const movieKey = keys.omdb;
let command = args[2];
let input = args[3];
let inputString = "";
let queryUrl;
let movieResponse;
let ranNum;


const getRanEvNum = (arr) => {
	return Math.floor(Math.random() * arr.length) & 0xFE;
}
//Show last 20 tweets and when they were created, searches for user inputString 
// If no tweet input, default to realDonaldTrump
const tweets = () => {
	if (inputString.length === 0) {
		inputString = "@realDonaldTrump"
	};
	client.get('search/tweets', {
		q: inputString
	}, function (error, tweets, response) {
		for (i = 0; i < 10; i++) {
			console.log(`${i+1}) ` + tweets.statuses[i].created_at + `->` + tweets.statuses[i].text)
		};
	});
};

// Display Artist(s), Song Name, Album, and Spotify Preview Link
// If no song input, default to The Sign by Ace of Base  
const spotifyThisSong = () => {
	if (inputString.length === 0) {
		inputString = "The Sign Ace of Base"
	}
	spotify.search({
			type: 'track',
			limit: 5,
			query: inputString
		},
		function (err, data) {
			if (err) {
				return console.log("Error occurred: " + err);
			}
			console.log("Top 5 Results")
			console.log("----------------------------------------")

			for (i = 0; i < 5; i++) {
				console.log("Track Name: " + data.tracks.items[i].name);
				console.log("Album Name: " + data.tracks.items[i].album.name);
				console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
				console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
				console.log("----------------------------------------")
			}
		})
};

// Display title, release year, IMDB rating, Rotten Tomatoes rating, Country of production, Language, Plot, Actors in the movie        
// If no movie input, default to 'Mr. Nobody'. 
const movieThis = () => {
	queryUrl = "http://www.omdbapi.com/?apikey=" + movieKey.apiKey + "&y=&plot=short&t=";
	if (inputString.length === 0) {
		queryUrl = queryUrl + "Mr+Nobody";
	} else {
		queryUrl = queryUrl + inputString;
	};
	request(queryUrl, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			movieResponse = JSON.parse(body);
			console.log(
				"Title: " + movieResponse.Title + " | " + " Year Released: " + movieResponse.Year + " | " + " Language: " +
				movieResponse.Language + " | " + " Produced in: " + movieResponse.Country + " | " + " Cast: " +
				movieResponse.Actors + " | " + " Plot: " + movieResponse.Plot + " | " + " Ratings: IMDB: " +
				movieResponse.Ratings[0].Value + " | " + " Rotten Tomatoes: " + movieResponse.Ratings[1].Value);
		};
	});
}

// use fs.readfile to use random.txt to call a command
const doWhatItSays = () => {
	fs.readFile("random.csv", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		var dataArr = data.split(",");
		ranNum = getRanEvNum(dataArr);
		command = dataArr[ranNum];
		inputString = dataArr[ranNum + 1];
		console.log(command + " | " + inputString)
		switch (command) {
			case "tweets":
				tweets();
				break;
			case "spotify-this-song":
				spotifyThisSong();
				break;
			case "movie-this":
				movieThis();
				break;
			case "do-what-it-says":
				doWhatItSays();
				break;
			case "add-command":
				addRandom();
				break
			default:
				console.log("Invalid Request");
		};
	});
};

// use fs.writefile to add additional commands to random.txt
const addRandom = () => {
	inquirer.prompt([

		{
			type: "list",
			name: "newCommand",
			message: "What command do you want to add?",
			choices: ["tweets", "spotify-this-song", "movie-this"]
		},
		{
			type: "input",
			name: "newQuery",
			message: "What do you want to search?"
		}

	]).then((added) => {
		fs.appendFile("random.csv", ',' + added.newCommand + ',' + '"' + added.newQuery + '"', function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log("Command Added!");
			}

		});
	})
}

const askQuery = (callback) => {
	inquirer.prompt([{
		type: "input",
		name: "query",
		message: "What do you want to search?"
	}]).then((input) => {
		inputString = input.query;
		callback();
	})
}

module.exports = {
	askQuery,
	tweets,
	spotifyThisSong,
	movieThis,
	doWhatItSays,
	addRandom,
	getRanEvNum
};